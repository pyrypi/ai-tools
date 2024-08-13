"use client";

import { useChat } from 'ai/react';

import { MessageSquare, Send } from "lucide-react";
import Heading from "@/components/heading";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Empty } from "@/components/empty";
import { Loader } from "@/components/loader";
import { UserAvatar } from "@/components/user-avatar";
import { BotAvatar } from "@/components/bot-avatar";

import { useRouter } from "next/navigation";
import Link from "next/link";


const ChatPage = () => {

  const router = useRouter();

  const { messages, input, handleInputChange, handleSubmit, isLoading} = 
  useChat({
    api: '/api/chat',
    onFinish({}) {
      router.refresh();
    },
  });

  return (
    <div>
        <Heading 
            title="Chat"
            description="You can ask anything!"
            icon={MessageSquare}
            iconColor="text-violet-500"
            bgColor="bg-violet-500/10"
        />
        <div className="px-4 lg:px-8 mb-40" >
          <Link href={"./chat/history"}>
            <Button variant="link" className="bg-black/40">
              Chat history
            </Button>
          </Link>
          <div className="space-y-4 mt-4">

            {messages.length === 0 && !isLoading && (
              <Empty 
              label="No conversation started"
              />
            )}
          <div className="flex flex-col gap-y-4">
            {messages.map((m: { id: string; role: string; content: string; }) => (
              <div 
                key={m.id}
                className="p-8 w-full flex items-start 
                gap-x-8 rounded-lg border bg-gray-700 bg-opacity-60"
              >
                {m.role === 'user' ? <UserAvatar/> : <BotAvatar />}
                <p className="text-sm">
                  {m.content}
                </p>
              </div>
            ))}
          </div>
            {isLoading && (
              <div className="p-20">
                <Loader />
              </div>
            )}
          </div>

          <div className="fixed bottom-0 left-0 md:left-72 right-0 z-50">
            <form 
              onSubmit={handleSubmit}
              className="
                  bg-[#03080f]
                    bg-opacity-70
                    w-full
                    p-5
                    px-3
                    md:px-6
                    focus-within:shadow-sm
                    grid
                    grid-cols-12
                    gap-2
                  "
            >
              
                <Input 
                  disabled={isLoading} 
                  value={input} 
                  placeholder="Give a prompt..."
                  onChange={handleInputChange} 
                  className="border-0 outline-none focus-visible:ring-0
                  focus-visible:ring-transparent col-span-12 lg:col-span-10 text-black"
                />
              <Button disabled={isLoading} type="submit" className="col-span-12 lg:col-span-2 w-full" >
                  <Send color="black" size={20}/>
              </Button>
            </form>
          </div>
            
        </div>
    </div>
  )
}

export default ChatPage;