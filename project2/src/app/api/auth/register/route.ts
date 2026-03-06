import { connectDb } from "@/lib/db";
import User from "@/model/userModel";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();
    await connectDb();

    const existUser = await User.findOne({ email });
    if (existUser) {
      return NextResponse.json({ message: "User already exist" }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json(
        { message: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    const hashPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      name,
      email,
      password: hashPassword,
    });

    return NextResponse.json({ message: "User created successfully", user }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error creating user", error },
      { status: 500 }
    );
  }
}
