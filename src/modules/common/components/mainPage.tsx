"use client";

import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
  className?: string;
}
export function MainPage({ children, className }: Props) {
  return <div className={cn("min-h-screen", className)}>{children}</div>;
}
