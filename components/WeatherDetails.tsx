import React, { useEffect, useState } from 'react';
import {IoIosArrowBack,IoIosArrowForward} from 'react-icons/io';
import DaysWeather from './DaysWeather';
import WeatherSlider from './WeatherSlider';

interface Props<T> {
  data: T;
}

const WeatherDetails = ({data}:Props<Record<string, any>>) => {

  return (
    <div className='w-full xl:w-[350px] xl:h-full  h-fit text-center px-4 py-6 xl:border-l-2 border-t-2'>
      <div className='flex flex-row justify-around items-center gap-8 h-[50px]'>
        <IoIosArrowBack className="w-6 h-6 text-gray-400" /> <h2 className='font-medium text-xl capitalize'>This Week</h2> <IoIosArrowForward className="text-gray-400 w-6 h-6" />
      </div>
      <h3 className='text-[18px] text-black font-medium text-left mt-6 mb-3'>Today</h3>
              <WeatherSlider data={data} /> 
          <div className='flex flex-col items-center py-5'>
            {
              (data?.forecast?.forecastday).map((dayWeather: Record<string, any>,i: React.Key | null | undefined)=>{

                  if(i != 0){
                    return (
                    <DaysWeather key={i} data={dayWeather} />
                    )
                  }
                  
                })
            } 
          </div>      

    </div>
  )
}

export default WeatherDetails