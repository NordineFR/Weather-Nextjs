"use client"

import Image from 'next/image'
import SideBar from '@/components/SideBar'
import WeatherDetails from '@/components/WeatherDetails'
import SearchBar from '@/components/SearchBar'
import GeneralWeatherCard from '@/components/GeneralWeatherCard' 
import WindCard from '@/components/WindCard'
import { useEffect, useState } from 'react';

import { useSearchParams,usePathname } from 'next/navigation';
import Loading from './loading'
import ErrorHandler from '../components/error'

export default function Home() {
  const [data,setData] = useState({});
  const searchParams = useSearchParams().get('search');
  const [location,setLocation] = useState(searchParams || "");
  const [loading, setLoading] = useState(false);
  const [error,setError] = useState("");

  
  // useEffect(() => {

  //   setData({});
  //   // setLocation(searchParams || "");
  //   if (location) {
  //     setLoading(true);
  //     setError('');
  //     fetchWeatherData();
  //   }
  // }, [])

  const url = `https://api.weatherapi.com/v1/forecast.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=${location}&days=8&aqi=yes&alerts=yes`;
  const handleSearch = async (e: { key: string; preventDefault: () => void }) => {
        if(e.key === "Enter"){
          e.preventDefault();
          setLoading(true);
          try{
            const response = await fetch(url)
            if(!response.ok){
              throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            setData(data);
            // setLocation("");
            setError("");
            setLoading(false);
          }catch(error){
            setError("City not found");
            setData({});
            setLoading(false);
          }
        } 
  }
  
  // const fetchWeatherData = () => {
    
  //   fetch(url)
  //     .then((response) => {
  //       if (!response.ok) {
  //         setData({});
  //         throw new Error('Failed to fetch data');
  //       }
  //       return response.json();
  //     })
  //     .then((jsonData) => {
  //       setData(jsonData);
  //       setError('');
  //       setLocation('');
  //     })
  //     .catch(() => {
  //       setError('City not found');
  //       setData({});
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // };
  
  return (
    <main className="flex-1 flex flex-col xl:flex-row bg-gradient-to-br bg-white overflow-y-auto w-full h-full">
    <div className='flex-1 h-full md:p-6 p-3'>
      <SearchBar  setLocation={setLocation} handleSearch={handleSearch} setError={setError}/>
      {loading ? (
        <Loading />
      ) : (
        Object.keys(data).length > 0 ? (
          <div>
            <GeneralWeatherCard data={data}/>
            <div className='grid gap-6 md:grid-cols-2 grid-cols-1'>
              <WindCard windDirection={(data as any)?.current?.wind_degree} title='Wind' desc='Today wind speed' value={`${(data as any)?.current?.wind_kph}km/h`} type='wind' />
              <WindCard title='Rain Chance' desc='Today rain chance' value={`${(data as any)?.forecast?.forecastday[0]?.day.daily_chance_of_rain}%`} type='rain' />
              <WindCard title='Pressure' desc='Today Pressure' value={`${(data as any)?.current?.pressure_mb} hpa`} type='pressure' />
              <WindCard title='UV Index' desc='Today UV Index' value={(data as any)?.current?.uv} type='uvi' />
            </div>
          </div>
        ) : (error ? (
          <ErrorHandler message={error} />
        ) : (
          <div className={`flex flex-col h-[calc(100%-120px)] justify-center items-center text-center text-black`}>
            <h1 className='font-extrabold md:text-4xl text-2xl'>Welcome to the weather app ⛅</h1> 
            <p className='p-2 md:text-xl text-sm font-semibold'>Enter a city name to get the weather forecast</p> 
          </div>
        ))
      )}
    </div>
    {Object.keys(data).length > 0 && (
      <WeatherDetails data={data} />
    )}
  </main>
  )
}
