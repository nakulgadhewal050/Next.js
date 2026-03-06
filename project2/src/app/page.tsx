'use client'
import { userDataContext } from '@/contex/UserContext';
import { signOut } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import { useContext, useState } from 'react'
import { FaPencil } from "react-icons/fa6";

function Page() {
  const data = useContext(userDataContext)
  const [loading, setLoading] = useState(false)
  const router = useRouter();
  const handleSignout = async () => {
    setLoading(true)
    try {
      await signOut({ callbackUrl: "/login" })
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log("error in handlesignout:", error)
    }
  }

  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-black text-white px-4'>
      {!data && <div className='text-white text-2xl'>Loading...</div>}
      {data && <div className='w-full max-w-md border-2 border-white rounded-2xl p-8 shadow-lg text-center relative flex flex-col items-center'>
        <FaPencil size={22} color='white' className='absolute right-[20px] top-[20px] cursor-pointer'
          onClick={() => router.push("/edit")}
        />
        {data.user?.image && <div className='relative w-[200px] h-[200px] border-white border-2 rounded-full overflow-hidden'>
          <Image src={data?.user?.image} fill alt='userImage' />
        </div>}
        <h1 className='text-2xl font-semibold my-4'>
          Welcome,  {data?.user?.name}
        </h1>
        <button className='w-ful py-2 px-4 bg-white text-black font-semibold hover:bg-gray-200 transition-colors rounded-lg cursor-pointer'
          onClick={handleSignout}
        >Sign Out</button>
      </div>}
    </div>
  )
}

export default Page

