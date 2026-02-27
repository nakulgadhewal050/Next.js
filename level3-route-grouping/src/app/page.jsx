import React from 'react'

async function page() {
  await new Promise((resolve) => setTimeout(resolve, 2000))
  return (
    <div>
      page
    </div>
  )
}

export default page