import { NextResponse } from "next/server";
import { getCodeMessages } from "@/lib/api_limits";

export async function GET(req: Request) {
  try {
    const messages = await getCodeMessages();

    return NextResponse.json(messages);
  } catch (error) {
    console.error("Error fetching chat messages:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
