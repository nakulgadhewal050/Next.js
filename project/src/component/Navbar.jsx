'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'


function Navbar() {
    const pathName = usePathname()
  return (
    <div className='h-[100px] w-full bg-white text-black flex items-center justify-between px-10'> 
      <div className='flex items-center'>
        <Image src="/logo.jpg" width={100} height={100} alt="Logo" />
      </div>
      <div className='flex items-center'>
        <ul className='flex flex-row gap-4 mr-4 text-lg font-semibold'>
          <Link href="/" className={pathName === '/' ? 'text-blue-500' : 'text-gray-700'}>Home</Link>
          <Link href="/destination" className={pathName === '/destination' ? 'text-blue-500' : 'text-gray-700'}>Destination</Link>
          <Link href="/contact" className={pathName === '/contact' ? 'text-blue-500' : 'text-gray-700'}>Contact</Link>
        </ul>
      </div>
    </div>
  )
}

export default Navbar