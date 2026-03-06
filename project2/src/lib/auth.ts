import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDb } from "./db";
import User from "@/model/userModel";
import bcrypt from "bcryptjs";
import GoogleProvider from "next-auth/providers/google";

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(crendentials, req) {
        const email = crendentials?.email;
        const password = crendentials?.password;

        if (!email || !password) {
          throw new Error("Email and Password are required");
        }

        await connectDb();
        const existUser = await User.findOne({email});
        if (!existUser){
            throw new Error("User not found");
        }
        const isPasswordCorrect = await bcrypt.compare(password, existUser.password);
        if(!isPasswordCorrect){
            throw new Error("Invalid Credentials");
        }
        return {
            id: existUser._id ,
            email: existUser.email,
            name: existUser.name,
            image: existUser.image,
        }
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!, 
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    })
  ],
  callbacks: {

     async signIn({ user, account}){
      if(account?.provider === "google"){
        await connectDb();
        let existUser = await User.findOne({email: user?.email});
        if(!existUser){
              existUser = await User.create({
              email: user.email,
              name: user.name,
            })
        }
        user.id = existUser?._id as string
      }
      return true;
     },

    async jwt({token, user}){
        if(user){
            token.id = user.id;
            token.email = user.email;
            token.name = user.name;
            token.image = user.image;
        }
        return token;
    },

     session({session, token}){

        if(session.user){
            session.user.id = token.id as string
            session.user.email = token.email
            session.user.name = token.name
            session.user.image = token.image as string
        }
        return session;
  }

  },

  session: {
    strategy: 'jwt',
    maxAge: 1 * 24 * 60 * 60, // 1 day
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
export default authOptions;
