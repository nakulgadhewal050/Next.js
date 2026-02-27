import React from 'react'

async function page({params}) {
    const {shop} = await params
    console.log(shop)
  return (
    <div>shopname: {shop}</div>
  )
}

export default page