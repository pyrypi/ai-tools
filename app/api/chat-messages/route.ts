import { NextResponse } from "next/server";
import { getChatMessages } from "@/lib/api_limits";
import { auth } from "@clerk/nextjs";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const messages = await getChatMessages();

    if (!messages) {
      return NextResponse.json([], { status: 200 });
    }

    return NextResponse.json(messages);
  } catch (error) {
    console.error("[CHAT_MESSAGES_ERROR]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
