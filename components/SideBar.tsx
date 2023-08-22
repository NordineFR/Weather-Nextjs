"use client"

import Image from "next/image";
import {links} from '@/assets/constants';
import Link from "next/link";
import {useState} from 'react';


const NavLinks = ()=>(
    <div className="mt-10 md:ml-8 ml-0">
        {
            links.map((link)=>(
                <Link href={link.to} key={link.name} className="flex flex-nowrap overflow-x-hidden md:justify-start justify-center items-center my-8 text-md text-black hover:text-blue-500 font-semibold" >
                    <link.icon className='w-6 h-6 md:mr-2 block' title={link.name} />
                    <span className="hidden md:inline whitespace-nowrap">{link.name}</span>
                </Link>
            ))
        }
    </div>
)

const SideBar = ()=> {
    const [mobileMenuOpen,setMobileMenuOpen] = useState(false);
  return (
    <>
        <div className="flex flex-col md:w-[240px]  w-[70px] py-6 md:px-4 px-1 bg-white border-r-2 transition-all fixed h-full">
            <div className="flex flex-row justify-center items-center gap-2">
                <Image src="/images/logo.svg" alt="logo" className="h-14 object-contain" width={50} height={50} /> 
                <h3 className="font-bold text-xl hidden md:inline">Weather</h3>
            </div>
            <NavLinks />
        </div>
    </>
  )
}

export default SideBar