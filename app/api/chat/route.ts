import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const message = body?.message ?? "";

    return NextResponse.json({
      reply: `✅ KLYP AI este activ. Mesaj primit: ${message}`,
    });
  } catch (e) {
    return NextResponse.json(
      { error: "Eroare server" },
      { status: 500 }
    );
  }
}