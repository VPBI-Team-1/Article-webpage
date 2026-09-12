"use client";

import { useState } from "react";

export default function useToggle(
  initialState: boolean = false,
): [boolean, () => void] {
  const [value, setValue] = useState(initialState);

  const toggle = () => {
    setValue((prev) => !prev);
  };

  return [value, toggle];
}
