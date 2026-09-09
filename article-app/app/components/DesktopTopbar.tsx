import { LuSquarePen, LuCircleUser } from "react-icons/lu";

export default function DesktopTopbar() {
  return (
    <div className='w-full flex justify-end items-center p-8 gap-4'>
      <button className='bg-black rounded-md p-2 flex items-center gap-1 text-white cursor-pointer'>
        <span className='font-semibold text-lg'>{"Let's write"}</span>
        <LuSquarePen className='text-2xl' />
      </button>

      <button>
        <LuCircleUser className='text-5xl' />
      </button>
    </div>
  );
}
