'use client'
import React, { useRef } from 'react'

function Page() {
  const input = useRef<HTMLInputElement>(null)
  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    console.log(input.current?.value)
  } 

  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <input type="text" ref={input} />
        <button onClick={handleClick}>click</button>
      </form>
    </div>
  )
}

export default Page
