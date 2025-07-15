import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  // Añade una propiedad propia aquí, incluso si es opcional y no la usas aún.
  // Por ejemplo, para futuras extensiones o para satisfacer el linter.
  // Si no tienes una propiedad específica, puedes usar una dummy como 'customProp?'.
  // customProp?: string; // Ejemplo de una propiedad personalizada futura

  // O una propiedad que Shadcn usa a veces para componentes componibles
  asChild?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
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
