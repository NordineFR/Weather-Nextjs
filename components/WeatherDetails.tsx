import React from 'react'
import {IoIosArrowBack,IoIosArrowForward} from 'react-icons/io'

const WeatherDetails = () => {
  return (
    <div className='w-full xl:w-[350px] xl:h-full  h-fit text-center px-4 py-6 xl:border-l-2 border-t-2'>
    <div className='flex flex-row justify-around items-center gap-8 h-[50px]'>
      <IoIosArrowBack className="w-6 h-6" /> <h2 className='font-medium text-xl capitalize'>This Week</h2> <IoIosArrowForward className="w-6 h-6" />
    </div>
  </div>
  )
}

export default WeatherDetails