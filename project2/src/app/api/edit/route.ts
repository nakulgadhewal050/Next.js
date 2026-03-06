import authOptions from "@/lib/auth";
import uploadImageOnCloudinary from "@/lib/cloudinary";
import { connectDb } from "@/lib/db";
import User from "@/model/userModel";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";



export async function POST(req: NextRequest) {
    try {
       await connectDb()
       const session = await getServerSession(authOptions)
       if(!session || !session.user.email || !session.user.id){
         return NextResponse.json(
            {message: "User does not have session"},
            {status: 401}
         )
       }
       
       const formData = await req.formData()
       const name = formData.get("name") as string
       const file = formData.get("file") as Blob | null

       let imageUrl;

       if(file){
        imageUrl = await uploadImageOnCloudinary(file)
       }

       const user = await User.findByIdAndUpdate(session.user.id, {
        name, image: imageUrl
       })

       if(!user){
        return NextResponse.json(
                {message: "User not found"},
                {status: 404}
        )
       }

       return NextResponse.json(
              user,
              {status: 200}
       )
       

    } catch (error) {
        return NextResponse.json(
            {message: "Error in updating user", error},
            {status: 500}
        )
    }
}