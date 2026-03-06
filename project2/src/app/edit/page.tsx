'use client'
import Image from 'next/image'
import { CgProfile } from "react-icons/cg";
import React, { useContext, useEffect, useRef, useState } from 'react'
import axios from 'axios';
import { userDataContext } from '@/contex/UserContext';

function Page() {
  const data = useContext(userDataContext)
  const [name, setName] = useState("")
  const [frontendImage, setFrontendImage] = useState("")
  const [backendImage, setBackendImage] = useState<File>()
  const imageInput = useRef<HTMLInputElement>(null)
  const [loading, setLoading] = useState(false)

  const hadleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length == 0) return
    const file = files[0]
    setFrontendImage(URL.createObjectURL(file))
    setBackendImage(file)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true)
    e.preventDefault()
    try {
      const formData = new FormData()
      formData.append("name", name)
      if (backendImage) {
        formData.append("file", backendImage)
      }

      const result = await axios.post("/api/edit", formData)
       data?.setUser(result.data)
        setLoading(false)
    } catch (error) {
      console.log("error in handleSubmit:", error)
      setLoading(false)
    }
  }

  useEffect(() => {
    if (data) {
      setName(data?.user?.name ?? "")
      setFrontendImage(data?.user?.image ?? "")
    }
  }, [data])

  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-black text-white px-4'>
      <div className='w-full max-w-md border-2 border-white rounded-2xl p-8 shadow-lg'>
        <h1 className='text-2xl font-semibold text-center mb-2'>Edit Profile</h1>
        <form className='space-y-2 flex flex-col w-full items-center'
          onSubmit={handleSubmit}
        >
          <div className='w-[100px] h-[100px] rounded-full border-2 flex justify-center items-center border-white transition-all hover:border-blue-500 text-white hover:text-blue-500 cursor-pointer overflow-hidden relative'
            onClick={() => imageInput.current?.click()}
          >

            <input type='file' accept='/*' hidden ref={imageInput} onChange={hadleImage} />
            {frontendImage ? <Image src={frontendImage} fill sizes="100px" loading="eager" alt='userImage' /> : <CgProfile size={50} color='white' />}
          </div>

          <div className='w-full'>
            <label className='block mb-2 text-sm font-medium'>Name</label>
            <input type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="Enter your name"
              className='w-full border-b border-white  py-2 px-1 bg-black text-white outline-none placeholder-gray-500'
            />
          </div>
          <button className='w-full py-2 px-4 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-colors cursor-pointer' disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </button>
        </form>

      </div>
    </div>
  )
}

export default Page