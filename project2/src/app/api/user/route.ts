import authOptions from "@/lib/auth";
import { connectDb } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import User from "@/model/userModel";

export async function GET(req: NextRequest) {
  try {
    await connectDb();
    const session = await getServerSession(authOptions);
    if (!session || !session.user.email || !session.user.id) {
      return NextResponse.json(
        { message: "User does not have session" },
        { status: 401 },
      );
    }
    const user = await User.findById(session.user.id).select("-password");
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error in getting user", error },
      { status: 500 },
    );
  }
}
