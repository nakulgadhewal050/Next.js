import React from 'react'

async function page() {
  await new Promise((res => setTimeout(res, 2000)))
  return (
    <div>this is parellel route</div>
  )
}

export default page