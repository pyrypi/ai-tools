import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import { increaseLimit, checkLimit } from '@/lib/api_limits';
import prismadb from '@/lib/prismadatabase';


async function saveChat(messageData:any) {
    try {
        const savedMessage = await prismadb.chatMessages.create({
            data: {
                content: messageData.content,
                role: messageData.role,
                userId: messageData.userId,
                
            },
        });

        return savedMessage;
    } catch (error) {
        console.error('Error saving chat message:', error);
        throw new Error('Failed to save message');
    }
}
 
export async function POST(req: Request) {

try{
    const {userId} = auth();
    const { messages } = await req.json();
    
    if(!userId){
        return new NextResponse("Unauthorized", {status: 401});
    }

    if(!openai){
        return new NextResponse("API key not configured", {status: 500});
    }

    if(!messages){
        return new NextResponse("Message required", {status: 400});
    }
    
    const freeTrial = await checkLimit();

    if (!freeTrial) {
        return new NextResponse("Your Free trial has expired!", { status: 403});
    }

    // Save the user's message to the database
    const userMessage = messages[messages.length - 1]; 
    const userMessageData = {
        content: userMessage.content,
        role: 'user',
        userId: userId,
    };

    await saveChat(userMessageData);
    
    const response = await streamText({
        model: openai('gpt-4o-mini'),
        messages: [
            ...messages,
            userMessage,
        ],
        async onFinish({ text, toolCalls, toolResults, finishReason, usage }) {
            try {
                const botMessage = {
                    content: text,
                    role: 'bot',
                    userId: userId, 
                };

                await saveChat(botMessage);
            } catch (error) {
                console.error('Error saving bot message:', error);
            }
        },
    });
    
    await increaseLimit();
    
    
    
    return response.toDataStreamResponse();

} catch (error) {
    console.log("[CONVERSATION_ERROR]", error);
    return new NextResponse("Internal error", {status: 500});

}
}