"use client";

import { cn } from "@/lib/utils";
interface Props {
  children: React.ReactNode; // 'children' es de tipo ReactNode, lo que permite cualquier elemento React válido
  className?: string; // 'className' es opcional y de tipo string
}
export function ContainerPage({ children, className }: Props) {
  return <div className={cn("min-h-screen px-3", className)}>{children}</div>;
}
