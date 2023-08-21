import React from 'react'
import {IoIosArrowBack,IoIosArrowForward} from 'react-icons/io'
import { Swiper,SwiperSlide } from 'swiper/react';
import {GoSun} from 'react-icons/go'

interface Props<T> {
  data: T;
}

const WeatherDetails = ({data}:Props<Record<string, any>>) => {
  return (
    <div className='w-full xl:w-[350px] xl:h-full  h-fit text-center px-4 py-6 xl:border-l-2 border-t-2'>
      <div className='flex flex-row justify-around items-center gap-8 h-[50px]'>
        <IoIosArrowBack className="w-6 h-6" /> <h2 className='font-medium text-xl capitalize'>This Week</h2> <IoIosArrowForward className="w-6 h-6" />
      </div>
      <h3 className='text-[18px] text-black font-medium text-left mt-6 mb-3'>Today</h3>
      <Swiper 
                slidesPerView="auto"
                spaceBetween={0}
                freeMode={true}
                centeredSlides
                centeredSlidesBounds
                className='mt-4 w-full'
                >
                <div className='flex flex-row flex-nowrap justify-between items-center text-center gap-8 w-full'>
                {   
                      (data?.forecast?.forecastday[0]?.hour).map((hourdata,i)=>(
                        <SwiperSlide 
                        key={i}
                        className=''
                        style={{width:'25%',height:'auto'}}
                      >
                          <div className={`text-center rounded-[14px] p-2 w-[85px] ${i === 0 ? 'bg-[#c4e2ff]' : ''}`}>
                            <h5 className='text-sm font-medium capitalize mb-1'>{i === 0 ? 'Now' : new Date(hourdata.time).toLocaleTimeString('en-US', { hour: 'numeric', hour12: true })}</h5>
                            <img src={hourdata.condition.icon} className="text-center w-full h-[50px] object-cover" alt="Weather icon" />
                            <h4 className='font-semibold text-black text-md mt-1'>{hourdata.temp_c}°</h4>
                          </div>
                      </SwiperSlide>
                      ))
                }
                    </div>
                
              </Swiper>
    </div>
  )
}

export default WeatherDetails