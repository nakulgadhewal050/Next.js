import React from 'react'
import Link from 'next/link'

function page() {
  return (
    <div className='min-h-screen w-full p-6'>
        <h1 className='text-3xl font-semibold flex justify-center'>Destination Page</h1>
        <div>
            <p className='flex justify-center font-semibold mt-10'>Select your destination</p>
            <div className='flex gap-8 mt-8 justify-center flex-row text-lg font-medium'>
                <Link href="/destination/dubai" className='bg-blue-500 text-white px-4 py-2 rounded-lg'>Dubai</Link>
                <Link href="/destination/london" className='bg-blue-500 text-white px-4 py-2 rounded-lg'>London</Link>
                <Link href="/destination/india" className='bg-blue-500 text-white px-4 py-2 rounded-lg'>India</Link>
            </div>
        </div>
    </div>
  )
}

export default page