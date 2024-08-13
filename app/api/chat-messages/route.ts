import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { getChatMessages } from '@/lib/api_limits';

const prisma = new PrismaClient();


export async function GET(req: Request) {
  try {
      // Call the getChatMessages function to retrieve messages
      const messages = await getChatMessages();

      return NextResponse.json(messages);
  } catch (error) {
      console.error('Error fetching chat messages:', error);
      return new NextResponse("Internal server error", { status: 500 });
  }
}


