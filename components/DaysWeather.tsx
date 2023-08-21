import Loading from '@/app/loading';
import React, { useEffect, useState } from 'react';


interface Props<T> {
    data: T;
  }

const DaysWeather = ({data}:Props<Record<string, any>>) => {
  const [loading,setLoading] = useState(false);
  function isTomorrow(date: string | number | Date) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      return new Date(date).toDateString() === tomorrow.toDateString();
  }

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
        setLoading(false);
    },1000);
  }, [data]);
  
  if (loading) {
    return <Loading className="px-2 my-2 rounded-lg h-20 w-full " />;
  }
  return (
    <div className='grid grid-cols-3 py-2  px-2 my-2 w-full rounded-lg'>
        <div className='flex flex-col justify-between items-start gap-1 '>
            <h3 className='text-black font-medium text-[18px] capitalize'>{isTomorrow(data?.date) ? 'Tomorrow' : new Date(data?.date).toLocaleDateString('en-US', { weekday: 'long' })}</h3>
            <p className='text-gray-400 text-md'>{new Date(data?.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short' }).split(' ').reverse().join(' ')}</p>
        </div>
        <div className='flex justify-center items-center lg:mr-[-12px]'>
          <h2 className='text-black text-xl font-semibold '>{data?.day?.avgtemp_c}°</h2>
        </div>
        
        <div className='flex justify-end items-center'>
          <img src={data?.day?.condition?.icon} alt={data?.day?.condition?.text} className='mr-[-12px] '/>
        </div>
    </div>
  )
}

export default DaysWeather