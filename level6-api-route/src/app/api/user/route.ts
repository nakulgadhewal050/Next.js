import { NextRequest, NextResponse } from "next/server";

export async function GET() {
      return NextResponse.json({ 
        name: "Jone-Don",
        email: "jone2@example.com"
      })
}

export async function POST(req: NextRequest){
    const data = await req.json();
    return NextResponse.json({
        message: `Data received: ${data.name}, ${data.email}`
    })
}