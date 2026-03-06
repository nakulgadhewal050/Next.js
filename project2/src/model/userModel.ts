import mongoose from "mongoose";

interface userschema{
    _id?:mongoose.Types.ObjectId,
    name:string,
    image?:string,
    email:string,
    password?:string,
    createdAt?:Date,
    updatedAt?:Date
}

const userSchema = new mongoose.Schema<userschema>({
    name: {type:String,required:true},
    image: {type:String},
    email: {type:String,required:true},
    password: {type:String,required:false}

},{timestamps:true})

const User = mongoose.models?.User || mongoose.model("User", userSchema)

export default User
