"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { LuMenu, LuCircleUser, LuSquarePen } from "react-icons/lu";
import { navigationItems } from "./navigationItems";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className='w-full flex items-center justify-between p-5 md:p-10'>
      <div className='z-30 flex items-center justify-center gap-3'>
        <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <LuMenu className='text-3xl md:text-5xl leading-none' />
        </button>
        <h1 className='text-3xl md:text-5xl font-bold leading-none'>Archive</h1>
      </div>

      {/* menu open */}
      <div
        className={`fixed left-0 top-0 bg-white z-20 h-screen w-1/2 transition-transform duration-300 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"} shadow-xl pt-20 md:pt-32`}>
        <div className='flex flex-col gap-4 md:gap-6'>
          {navigationItems.map((items) => (
            <Link
              key={items.label}
              href={items.href}
              className={`flex items-center gap-2 md:gap-4 px-5 md:px-10 py-2 ${
                pathname === items.href || pathname.startsWith(`${items.href}/`)
                  ? "font-bold bg-tertiary"
                  : ""
              } text-2xl md:text-4xl`}>
              {items.icon}
              <span className='text-lg md:text-2xl'>{items.label}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className='flex items-center gap-2'>
        <div className='bg-black rounded-md p-1.5'>
          <LuSquarePen className='text-white text-2xl md:text-4xl' />
        </div>

        <Link href='/profil'>
          <LuCircleUser className='text-4xl md:text-6xl' />
        </Link>
      </div>
    </nav>
  );
}
