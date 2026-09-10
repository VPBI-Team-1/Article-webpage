"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import WriteAuthModal from "@/app/components/WriteAuthModal";

interface WriteModalContextType {
  openWriteModal: () => void;
  closeWriteModal: () => void;
  isWriteModalOpen: boolean;
}

const WriteModalContext = createContext<WriteModalContextType | null>(null);

// Global provider controlling the write-action auth modal across any page
export function WriteModalProvider({ children }: { children: ReactNode }) {
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);

  const openWriteModal = () => setIsWriteModalOpen(true);
  const closeWriteModal = () => setIsWriteModalOpen(false);

  return (
    <WriteModalContext.Provider
      value={{ openWriteModal, closeWriteModal, isWriteModalOpen }}
    >
      {children}
      <WriteAuthModal isOpen={isWriteModalOpen} onClose={closeWriteModal} />
    </WriteModalContext.Provider>
  );
}

export function useWriteModal() {
  const context = useContext(WriteModalContext);
  if (!context) {
    throw new Error("useWriteModal must be used within a WriteModalProvider");
  }
  return context;
}
