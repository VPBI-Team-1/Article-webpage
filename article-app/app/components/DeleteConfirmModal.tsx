"use client";

import { LuLoader, LuTrash2 } from "react-icons/lu";
import Modal from "./Modal";

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void> | void;
  isDeleting?: boolean;
  title?: string;
  description?: string;
}

export default function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  isDeleting = false,
  title = "Delete Article?",
  description = "Are you sure you want to delete this article? This action cannot be undone.",
}: DeleteConfirmModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={isDeleting ? () => {} : onClose} title={title}>
      <p className="text-secondary text-sm md:text-base leading-relaxed mb-6">
        {description}
      </p>

      <div className="flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={onClose}
          disabled={isDeleting}
          className="px-5 py-2 text-sm md:text-base font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
        >
          Cancel
        </button>

        <button
          type="button"
          onClick={onConfirm}
          disabled={isDeleting}
          className="flex items-center justify-center gap-2 px-6 py-2 text-sm md:text-base font-semibold text-white bg-red-600 hover:bg-red-700 rounded-xl transition-colors shadow-xs disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
        >
          {isDeleting ? (
            <>
              <LuLoader className="w-4 h-4 animate-spin" />
              <span>Deleting...</span>
            </>
          ) : (
            <>
              <LuTrash2 className="w-4 h-4" />
              <span>Yes, Delete</span>
            </>
          )}
        </button>
      </div>
    </Modal>
  );
}
