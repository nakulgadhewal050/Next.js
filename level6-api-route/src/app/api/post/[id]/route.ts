import { NextRequest, NextResponse } from "next/server";

interface paramsType {
    params: {
        id: number
    }
}

export async function GET(req: NextRequest, {params}: paramsType ) {
    const {id} = await params;
    return NextResponse.json({
        postId: id
    })
}