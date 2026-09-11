"use client";

import { useEffect, ReactNode } from "react";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children?: ReactNode;
  maxWidthClassName?: string;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  maxWidthClassName = "max-w-sm md:max-w-md",
}: ModalProps) {
  // Close modal when pressing the Escape key
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

  // Guard clause: do not render if modal is not open
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 transition-opacity duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className={`relative w-full ${maxWidthClassName} rounded-2xl bg-white p-6 md:p-8 text-center shadow-2xl border border-gray-100 animate-in fade-in zoom-in-95 duration-200`}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mb-3 mt-1">
            {title}
          </h2>
        )}

        {children}
      </div>
    </div>
  );
}
