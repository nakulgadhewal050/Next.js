import React from 'react'

type buttonProps = {
    data: string
    action:()=> void
}

const Button = ({data,action}: buttonProps) => {
  return (
    <div>Button with data: {data}</div>
  )
}

export default Button