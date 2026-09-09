"use client";

import { LuSquarePen, LuCircleUser } from "react-icons/lu";
import { useRouter } from "next/navigation";

export default function DesktopTopbar() {
  const router = useRouter();
  const handleLogout = async () => {
    router.replace("/login");
  };
  return (
    <div className="w-full flex justify-end items-center p-8 gap-4">
      <button className="bg-black rounded-md p-2 flex items-center gap-1 text-white">
        <span className="font-semibold text-lg">{"Let's write"}</span>
        <LuSquarePen className="text-2xl" />
      </button>

      <div className="relative group">
        <button>
          <LuCircleUser className="text-5xl" />
        </button>

        <div className="absolute right-0 top-full hidden group-hover:block">
          <div className="mt-2 w-32 rounded-lg border bg-white p-2 shadow-lg">
            <button
              onClick={handleLogout}
              className="w-full rounded-md px-3 py-2 text-left text-sm hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
