"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Footer from "./Footer";
import { navigationItems } from "./navigationItems";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className='flex h-full flex-col border-r'>
      <div className='flex-1'>
        <h1 className='font-merriweather text-3xl font-bold text-center px-5 py-8'>
          Archive
        </h1>

        <div className='flex flex-col gap-4 md:gap-6'>
          {navigationItems.map((items) => (
            <Link
              key={items.label}
              href={items.href}
              className={`flex items-center gap-2 md:gap-4  ${
                pathname === items.href || pathname.startsWith(`${items.href}/`)
                  ? "font-bold bg-tertiary py-2 "
                  : ""
              } px-5 text-2xl`}>
              {items.icon}
              <span className='md:text-xl'>{items.label}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className='mt-auto'>
        <Footer />
      </div>
    </aside>
  );
}
