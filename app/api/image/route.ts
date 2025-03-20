import { OpenAI } from "openai";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import { increaseLimit, checkLimit } from "@/lib/api_limits";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { prompt, amount = 1, resolution = "512x512" } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!client.apiKey) {
      return new NextResponse("API key not configured", { status: 500 });
    }

    if (!prompt) {
      return new NextResponse("Message required", { status: 400 });
    }
    if (!amount) {
      return new NextResponse("Amount is required", { status: 400 });
    }

    if (!resolution) {
      return new NextResponse("Resolution is required", { status: 400 });
    }

    const freeTrial = await checkLimit();

    if (!freeTrial) {
      return new NextResponse("Your Free trial has expired!", { status: 403 });
    }

    // Ask OpenAI for a streaming chat completion given the prompt
    const response = await client.images.generate({
      model: "dall-e-2",
      prompt,
      n: parseInt(amount, 10),
      size: resolution,
    });

    await increaseLimit();

    return NextResponse.json(response.data);
  } catch (error) {
    console.log("[IMAGE_ERROR]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
