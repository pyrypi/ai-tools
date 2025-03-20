import { NextResponse } from "next/server";
import { getCodeMessages } from "@/lib/api_limits";
import { auth } from "@clerk/nextjs";

export async function GET(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const messages = await getCodeMessages();

    if (!messages) {
      return NextResponse.json([], { status: 200 });
    }

    return NextResponse.json(messages);
  } catch (error) {
    console.error("Error fetching chat messages:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
