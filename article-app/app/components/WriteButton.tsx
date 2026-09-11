"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { LuSquarePlus, LuSquarePen } from "react-icons/lu";
import { IoArrowUndo } from "react-icons/io5";
import { useAuth } from "@/app/providers/AuthProvider";
import { useWriteModal } from "@/app/providers/WriteModalProvider";

interface WriteButtonProps {
  variant?: "desktop" | "mobile";
}

export default function WriteButton({ variant = "desktop" }: WriteButtonProps) {
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

  if (isWritePage) {
    if (variant === "mobile") {
      return (
        <Link
          href="/articles"
          className="border-2 border-black rounded-md p-1.5 flex items-center justify-center text-black hover:bg-zinc-100 transition-colors cursor-pointer"
          title="Back to articles"
          aria-label="Back to articles"
        >
          <IoArrowUndo className="text-2xl md:text-4xl" />
        </Link>
      );
    }

    return (
      <Link
        href="/articles"
        className="w-11 h-11 border-2 border-black rounded-xl flex items-center justify-center text-black hover:bg-zinc-100 transition-colors cursor-pointer"
        title="Back to articles"
        aria-label="Back to articles"
      >
        <IoArrowUndo className="text-2xl" />
      </Link>
    );
  }

  if (variant === "mobile") {
    return (
      <button
        type="button"
        onClick={handleWriteClick}
        className="bg-black rounded-md p-1.5 flex items-center justify-center text-white hover:bg-zinc-800 transition-colors cursor-pointer"
        title="Write an article"
        aria-label="Write an article"
      >
        <LuSquarePen className="text-white text-2xl md:text-4xl" />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleWriteClick}
      className="bg-black rounded-md p-2 flex items-center gap-1 text-white hover:bg-zinc-800 transition-colors cursor-pointer"
      title="Let's write"
      aria-label="Let's write"
    >
      <span className="font-semibold text-lg">{"Let's write"}</span>
      <LuSquarePlus className="text-2xl" />
    </button>
  );
}
