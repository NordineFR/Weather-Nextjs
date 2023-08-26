import React from 'react'

interface Props{
  className?:string
}
const loading = ({className}:Props) => {
  return (
    <>
      {
        className ? (
          <div className={`animate-pulse bg-gray-200 rounded flex flex-col justify-center items-center w-full ${className}`}>
            Loading...
          </div>
        ) : (
          <div className={`animate-pulse rounded flex flex-col justify-center items-center w-full`}>
            Loading...
          </div>
        )
      }
    </>
  )
}

export default loading