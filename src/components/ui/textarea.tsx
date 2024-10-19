import * as React from "react";

import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    // focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring  focus:outline-none focus:ring-1
    return (
      <textarea
        className={cn(
          "flex min-h-[60px] w-full rounded-md text-blue-800 border border-blue-300 bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground  focus:bg-blue-50 focus:ring-blue-500 focus:border-blue-300disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
