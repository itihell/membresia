"use client";

import { Title } from "@/components";
import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
}
export function BodyPage({ children, title, subtitle, className }: Props) {
  return (
    <div className={cn("p-1", className)}>
      {title && <Title title={title} subtitle={subtitle} className="mb-2" />}
      <div className="p-1 border border-blue-300 rounded-sm ">{children}</div>
    </div>
  );
}
