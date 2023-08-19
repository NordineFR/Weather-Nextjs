"use client"

import Image from 'next/image'
import SideBar from '@/components/SideBar'
import WeatherDetails from '@/components/WeatherDetails'
import SearchBar from '@/components/SearchBar'
import GeneralWeatherCard from '@/components/GeneralWeatherCard' 
import WindCard from '@/components/WindCard'


export default function Home() {
  const city = "casa"
  return (
    <main className="flex-1 flex flex-col xl:flex-row bg-gradient-to-br bg-white overflow-y-auto">
      <div className='flex-1 h-full p-6 '>
        <SearchBar />
        <div className={`${city ? "" : "hidden"}`}>
            <GeneralWeatherCard />
            <div className='grid gap-6 md:grid-cols-2 grid-cols-1'>
              <WindCard windDirection={45} title="Wind"  desc="Today wind speed" value="12km/h" type="wind"/>
              <WindCard title="Rain Chanse"  desc="Today rain chanse" value="24%" type="rain"/>
              <WindCard title="Pressure"  desc="Today Pressure" value="720 hpa" type="pressure"/>
              <WindCard  title="UV Index"  desc="Today UV Index" value="7" type="uvi"/>
            </div>
        </div>
        <div className={`flex flex-col h-[calc(100%-120px)] justify-center items-center text-center text-black ${city ? "hidden" : ""}`}>
          <h1 className='font-extrabold md:text-4xl text-2xl'>Welcome to the weathe app ⛅</h1> 
          <p className='p-2 md:text-xl text-sm font-semibold'>Enter a city name to get the weather forecast</p> 
        </div>
      </div>
      <div className={`${city ? "" : "hidden"}`}>
        <WeatherDetails/>
      </div>
    </main>
  )
}
