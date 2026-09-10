"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { LuSquarePlus } from "react-icons/lu";
import { IoArrowUndo } from "react-icons/io5";
import { useAuth } from "@/app/providers/AuthProvider";
import { useWriteModal } from "@/app/providers/WriteModalProvider";
import UserDropdown from "./UserDropdown";

export default function DesktopTopbar() {
  const { user } = useAuth();
  const { openWriteModal } = useWriteModal();
  const router = useRouter();
  const pathname = usePathname();

  const isWritePage = pathname?.startsWith("/articles/write");

  // Guard write action: prompt login modal if guest, otherwise navigate
  const handleWriteClick = () => {
    if (!user) {
      openWriteModal();
      return;
    }
    router.push("/articles/write");
  };

  return (
    <div className="w-full flex justify-end items-center p-8 gap-4">
      {isWritePage ? (
        <Link
          href="/articles"
          className="w-11 h-11 border-2 border-black rounded-xl flex items-center justify-center text-black hover:bg-zinc-100 transition-colors cursor-pointer"
          title="Back to articles"
          aria-label="Back to articles"
        >
          <IoArrowUndo className="text-2xl" />
        </Link>
      ) : (
        <button
          type="button"
          onClick={handleWriteClick}
          className="bg-black rounded-md p-2 flex items-center gap-1 text-white hover:bg-zinc-800 transition-colors cursor-pointer"
        >
          <span className="font-semibold text-lg">{"Let's write"}</span>
          <LuSquarePlus className="text-2xl" />
        </button>
      )}

      <UserDropdown />
    </div>
  );
}
