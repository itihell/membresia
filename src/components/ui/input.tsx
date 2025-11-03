import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex w-full h-10 px-4 py-2 text-base md:text-md",

          "rounded-lg border-2 border-gray-200 bg-white",

          "transition-all duration-300 ease-in-out",

          "focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus-visible:outline-none",

          "placeholder:text-gray-400",

          "disabled:cursor-not-allowed disabled:opacity-60 disabled:bg-gray-100",

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
