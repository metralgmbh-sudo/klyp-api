import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const message = body.message;

    if (!message) {
      return NextResponse.json(
        { error: "No message provided" },
        { status: 400 }
      );
    }

 const response = await client.responses.create({
  model: "gpt-5-mini",
  input: [
    {
      role: "system",
      content: "You are KLYP AI, a helpful AI assistant. Always respond ONLY in English, regardless of the user's language."
    },
    {
      role: "user",
      content: message
    }
  ],
});

    return NextResponse.json({
      reply: response.output_text,
    });
  } catch (error) {
    console.error("OpenAI error:", error);
    return NextResponse.json(
      { error: "OpenAI request failed" },
      { status: 500 }
    );
  }
}