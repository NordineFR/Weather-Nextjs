import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import SideBar from '@/components/SideBar'
import Loading from "@/app/loading";
import { Suspense } from "react";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Weather App',
  description: 'Enter a city name to get the weather forecast',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className='flex flex-row min-h-screen'>
          <SideBar />
          <Suspense fallback={<Loading className='h-fit p-8'/>}>{children}</Suspense>
        </div>
      </body>
    </html>
  )
}
