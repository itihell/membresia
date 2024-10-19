import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    //focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full  rounded-sm text-blue-800 border border-blue-300 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground  focus:outline-none focus:ring-1 focus:bg-blue-50 focus:ring-blue-500 focus:border-blue-300 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
