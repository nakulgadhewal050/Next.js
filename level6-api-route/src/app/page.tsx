import React from 'react'

async function page() {


  // For SSR
  // const response = await fetch("http://localhost:3000/api/user", {
  //   cache: "no-store"
  // })

  // For SSG
  // const response = await fetch("http://localhost:3000/api/user", {
  //   cache: "force-cache"
  // })

  //For ISR
  const response = await fetch("http://localhost:3000/api/user", {
    next: { revalidate: 5}
  })


  const data = await response.json();
  console.log(data)

  return (
    <div>
      <h1>API Route Example</h1>
    </div>
  )
}

export default page