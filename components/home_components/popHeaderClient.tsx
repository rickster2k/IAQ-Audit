// components/conditionalPopUpHeader.tsx
"use client";
import { usePathname } from "next/navigation";
import PopUpHeader from "./popUpHeader";

export default function ConditionalPopUpHeader() {
  const pathname = usePathname();
  if (pathname !== "/") return null;
  return <PopUpHeader />;
}
