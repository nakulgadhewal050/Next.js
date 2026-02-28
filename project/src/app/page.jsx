import Link from 'next/link'
import React from 'react'

function page() {
  return (
    <div>
      <h1 className='text-3xl font-semibold flex justify-center'>Home Page</h1>
      <div className='flex justify-center mt-8'>
        <p className='text-lg font-medium'>Welcome to our travel website! Explore the world with us.</p>
      </div>
      <p className='text-lg font-medium mt-4 flex justify-center'>Choose your destination <Link href="/destination" className='text-blue-500 underline'>here</Link>.</p>
    </div>
  )
}

export default page
