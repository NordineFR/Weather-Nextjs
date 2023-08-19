"use client"

import Image from 'next/image'
import SideBar from '@/components/SideBar'
import WeatherDetails from '@/components/WeatherDetails'
import SearchBar from '@/components/SearchBar'
import GeneralWeatherCard from '@/components/GeneralWeatherCard' 
import WindCard from '@/components/WindCard'


export default function Home() {
  return (
    <main className="flex-1 flex flex-col xl:flex-row bg-gradient-to-br bg-white overflow-y-auto">
      <div className='flex-1 h-full p-6 '>
        <SearchBar />
        <GeneralWeatherCard />
        <div className='grid gap-6 md:grid-cols-2 grid-cols-1'>
          <WindCard windDirection={45} title="Wind"  desc="Today wind speed" value="12km/h" type="wind"/>
          <WindCard title="Rain Chanse"  desc="Today rain chanse" value="24%" type="rain"/>
          <WindCard title="Pressure"  desc="Today Pressure" value="720 hpa" type="pressure"/>
          <WindCard  title="UV Index"  desc="Today UV Index" value="10" type="uvi"/>
        </div>
      </div>
      <WeatherDetails/>
    </main>
  )
}
