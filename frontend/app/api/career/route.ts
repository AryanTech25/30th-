import { NextRequest, NextResponse } from "next/server";
import { careerBot } from "@/components/chat/chatbot"; // Adjust path if needed

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const question = body?.question;

    // Validate input
    if (!question || typeof question !== "string") {
      return NextResponse.json(
        { answer: "❌ Invalid request: 'question' is required." },
        { status: 400 }
      );
    }

    // Call the chatbot
    const answer = await careerBot(question);

    return NextResponse.json({ answer });
  } catch (error) {
    console.error("Groq API error:", error instanceof Error ? error.message : error);
    return NextResponse.json(
      { answer: "⚠️ Sorry, the AI service is currently unavailable." },
      { status: 500 }
    );
  }
}
