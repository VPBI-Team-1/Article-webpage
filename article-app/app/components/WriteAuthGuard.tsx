"use client";

import Link from "next/link";

export default function WriteAuthGuard() {
  return (
    <div className="flex min-h-[60vh] w-full items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-xl border border-gray-100">
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mb-3">
          Ready to Share Your Story?
        </h2>
        <p className="text-secondary text-sm md:text-base leading-relaxed mb-8">
          Please sign in to start writing and manage your article
        </p>
        <Link
          href="/login"
          className="inline-block bg-tertiary border border-black font-medium rounded-2xl py-1.5 px-8 text-base shadow-tactile hover:translate-x-px hover:translate-y-px hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all duration-150 cursor-pointer text-gray-900"
        >
          Login
        </Link>
      </div>
    </div>
  );
}
