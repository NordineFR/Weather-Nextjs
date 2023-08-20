import React from 'react'
interface Props{
    message?:string
}
const error = ({message}:Props) => {
  return (
    <div className='flex flex-col justify-center items-center text-center text-black font-extrabold md:text-2xl text-2xl h-full'>{message}</div>
  )
}

export default error