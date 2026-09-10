"use client";

import { LuSquarePlus } from "react-icons/lu";
import UserDropdown from "./UserDropdown";

export default function DesktopTopbar() {
  return (
    <div className="w-full flex justify-end items-center p-8 gap-4">
      <button className="bg-black rounded-md p-2 flex items-center gap-1 text-white hover:bg-zinc-800 transition-colors">
        <span className="font-semibold text-lg">{"Let's write"}</span>
        <LuSquarePlus className="text-2xl" />
      </button>

      <UserDropdown />
    </div>
  );
}
