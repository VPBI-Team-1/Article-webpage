"use client";

import WriteButton from "./WriteButton";
import UserDropdown from "./UserDropdown";

export default function DesktopTopbar() {
  return (
    <div className="w-full flex justify-end items-center p-8 gap-4">
      <WriteButton variant="desktop" />
      <UserDropdown />
    </div>
  );
}
