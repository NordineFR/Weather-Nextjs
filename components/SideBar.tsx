"use client"

import Image from "next/image"
import {links} from '@/assets/constants'
import Link from "next/link"
import {RiCloseLine} from 'react-icons/ri';
import {HiOutlineMenu} from 'react-icons/hi';
import {useState} from 'react';


const NavLinks = ()=>(
    <div className="mt-10 ml-8">
        {
            links.map((link)=>(
                <Link href={link.to} key={link.name} className="flex flex-row justify-start items-center my-8 text-sm text-black hover:text-blue-500 font-semibold">
                    <link.icon className='w-6 h-6 mr-2' />
                    {link.name}
                </Link>
            ))
        }
    </div>
)

const SideBar = ()=> {
    const [mobileMenuOpen,setMobileMenuOpen] = useState(false);
  return (
    <>
        <div className="md:flex hidden flex-col w-[240px] py-10 px-4 bg-white border-r-2">
            <div className="flex flex-row justify-center items-center gap-2">
                <Image src="/images/logo.svg" alt="logo" width={50} height={50} /> 
                <h3 className="font-bold text-xl">Weather</h3>
            </div>
            <NavLinks />
        </div>
    </>
  )
}

export default SideBar