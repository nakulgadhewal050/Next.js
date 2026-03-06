'use client'

import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";

function Register() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const router = useRouter()

    const handleRegister = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const result = await axios.post("/api/auth/register", {
                name, email, password
            })
            router.push("/login")
            console.log("result of handleRegister:", result)
        } catch (error) {
            console.error("Error occurred while registering:", error)
        }
    }

    return (
        <div className='min-h-screen flex items-center justify-center bg-black text-white px-4'>
            <div className='w-full max-w-md border border-gray-700 rounded-2xl p-8 shadow-[0_0_30px_rgba(255,255,255,0.05)] bg-gray-900'>
                <h1 className='text-3xl font-bold text-center mb-8 tracking-tight'>Register</h1>
                <form action="" className='space-y-6' onSubmit={handleRegister} >
                    <div>
                        <label className='block mb-2 text-sm font-medium text-gray-300'>Name</label>
                        <input type="text"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            placeholder="Enter your name"
                            className='w-full border border-gray-600 rounded-lg py-2.5 px-3 bg-gray-800 text-white outline-none placeholder-gray-500 focus:border-white focus:ring-1 focus:ring-white transition-all'
                        />
                    </div>
                    <div>
                        <label className='block mb-2 text-sm font-medium text-gray-300'>Email</label>
                        <input type="email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            placeholder="Enter your email"
                            className='w-full border border-gray-600 rounded-lg py-2.5 px-3 bg-gray-800 text-white outline-none placeholder-gray-500 focus:border-white focus:ring-1 focus:ring-white transition-all'
                        />
                    </div>
                    <div>
                        <label className='block mb-2 text-sm font-medium text-gray-300'>Password</label>
                        <input type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            placeholder="Enter your password"
                            className='w-full border border-gray-600 rounded-lg py-2.5 px-3 bg-gray-800 text-white outline-none placeholder-gray-500 focus:border-white focus:ring-1 focus:ring-white transition-all'
                        />
                    </div>

                    <p className='text-center text-sm text-gray-400 mt-4'>
                        Already have an account? <span onClick={() => router.push("/login")}
                            className='text-blue-500 font-medium hover:underline cursor-pointer'>Login</span>
                    </p>

                    <button
                        className='w-full bg-white text-black font-semibold py-2.5 px-4 rounded-lg hover:bg-gray-200 active:scale-[0.98] transition-all mt-2 cursor-pointer'
                        type="submit"
                    >
                        Register
                    </button>

                </form>

                <div className='flex items-center gap:5px justify-center my-5'>
                    <hr className='grow border-gray-500' />
                    <span>OR</span>
                    <hr className='grow border-gray-500' />
                </div>

                <button className='w-full flex items-center justify-center gap-2 py-2 px-4 border border-b-gray-400 rounded-lg bg-white text-black hover:bg-gray-100 transition-color cursor-pointer'
                    onClick={() => signIn('google', { callbackUrl: '/' })}
                >
                    <FcGoogle size={20} />
                    <span>Signup with Google</span>
                </button>



            </div>
        </div>
    )
}

export default Register