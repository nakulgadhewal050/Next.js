'use client'

import React from 'react'
import { useState } from 'react'

  function Home() {
const [name, setName] = useState("nakul")
  return (
    <div>
      page
      {name}
    </div>
  )
}

export default Home