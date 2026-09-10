"use client";

import Link from "next/link";
import { useEffect } from "react";
import { LuX } from "react-icons/lu";

interface WriteAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WriteAuthModal({ isOpen, onClose }: WriteAuthModalProps) {
  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 transition-opacity duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-sm md:max-w-md rounded-2xl bg-white p-6 md:p-8 text-center shadow-2xl border border-gray-100 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-1 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
          title="Close"
          type="button"
        >
          <LuX className="w-5 h-5" />
        </button>

        <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mb-3 mt-1">
          Ready to Share Your Story?
        </h2>
        <p className="text-secondary text-sm md:text-base leading-relaxed mb-6">
          Please sign in to start writing and manage your article
        </p>

        <Link
          href="/login"
          onClick={onClose}
          className="inline-block bg-tertiary border border-black font-medium rounded-2xl py-1.5 px-8 text-base shadow-tactile hover:translate-x-px hover:translate-y-px hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all duration-150 cursor-pointer text-gray-900"
        >
          Login
        </Link>
      </div>
    </div>
  );
}
