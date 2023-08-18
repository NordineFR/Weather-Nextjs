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
        <WindCard width="md:w-1/2"/>
      </div>
      <WeatherDetails/>
    </main>
  )
}
