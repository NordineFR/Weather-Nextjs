import React from 'react'

interface Props{
  className?:string
}
const loading = ({className}:Props) => {
  return (
    <div className={`animate-pulse bg-gray-200 rounded flex flex-col justify-center items-center ${className}`}>Loading...</div>

  )
}

export default loading