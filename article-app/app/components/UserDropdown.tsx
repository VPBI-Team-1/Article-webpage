"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LuCircleUser, LuLogIn, LuLogOut } from "react-icons/lu";
import { useAuth } from "@/app/providers/AuthProvider";

export default function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { user, setUser, isLoading } = useAuth();

  // User is confirmed authenticated only when initial auth check finishes
  const isLoggedIn = !isLoading && !!user;

  // Close dropdown when clicking outside the component boundary
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      const apiBaseUrl =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      await fetch(`${apiBaseUrl}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      // Clear client session and redirect even if backend session invalidation fails
      setUser(null);
      setIsOpen(false);
      router.replace("/login");
    }
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="cursor-pointer focus:outline-none flex items-center justify-center"
        aria-label="User menu"
        aria-expanded={isOpen}
      >
        <LuCircleUser className="text-5xl" />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full pt-3 z-50">
          <div className="w-52 rounded-xl border border-black bg-white shadow-lg overflow-hidden">
            {/* Header */}
            <div className="px-3 py-2 border-b border-black text-center">
              <h3 className="text-lg font-bold text-black truncate leading-snug">
                {isLoggedIn ? `Welcome, ${user.name}` : "Welcome, Guest"}
              </h3>
            </div>

            {/* Menu Items */}
            <div className="p-1.5 flex flex-col gap-0.5">
              <Link
                href="/profile"
                onClick={closeDropdown}
                className="flex items-center gap-2.5 px-3 py-1.5 text-base font-semibold text-black hover:bg-zinc-100 rounded-lg transition-colors"
              >
                <LuCircleUser className="text-2xl shrink-0" />
                <span>Profile</span>
              </Link>

              {/* Conditional options based on auth state */}
              {!isLoggedIn ? (
                <Link
                  href="/login"
                  onClick={closeDropdown}
                  className="flex items-center gap-2.5 px-3 py-1.5 text-base font-semibold text-black hover:bg-zinc-100 rounded-lg transition-colors"
                >
                  <LuLogIn className="text-2xl shrink-0" />
                  <span>Login/register</span>
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex items-center gap-2.5 w-full px-3 py-1.5 text-left text-base font-semibold text-black hover:bg-zinc-100 rounded-lg transition-colors cursor-pointer"
                >
                  <LuLogOut className="text-2xl shrink-0" />
                  <span>Logout</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
