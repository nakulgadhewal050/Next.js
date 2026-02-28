import Image from 'next/image'
import React from 'react'

async function page({params}) {
    const {destination} = await params

  return (
    <div>
       <h1 className='text-3xl font-bold text-center mt-10'> this is destination - {destination[0]}</h1>
       {destination[0] === "dubai" ? <>
         <p className='text-center mt-4 text-lg font-medium'>Dubai is a city in the United Arab Emirates known for its modern architecture, luxury shopping, and vibrant nightlife.</p>
         <div className='flex justify-center mt-4'><Image src="/dubai.avif" alt="Dubai" width={400} height={300}/></div>
       </>
        : destination[0] === "london" ? <>
         <p className='text-center mt-4 text-lg font-medium'>London is the capital city of England and the United Kingdom, known for its rich history, iconic landmarks, and vibrant culture.</p>
         <div className='flex justify-center mt-4'><Image src="/london.avif" alt="London" width={400} height={300}/></div>
       </>
        : destination[0] === "india" ? <>
         <p className='text-center mt-4 text-lg font-medium'>India is a diverse and culturally rich country in South Asia, known for its vibrant traditions, historical landmarks, and diverse cuisine.</p>
         <div className='flex justify-center mt-4'><Image src="/india.jpg" alt="India" width={400} height={300}/></div>
       </>
        : <p className='text-center mt-4 text-lg font-medium'>Please select a valid destination.</p>
       }
    </div>
  )
}

export default page