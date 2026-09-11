"use client";

import Link from "next/link";
import Modal from "./Modal";

interface WriteAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WriteAuthModal({ isOpen, onClose }: WriteAuthModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Ready to Share Your Story?">
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
    </Modal>
  );
}
