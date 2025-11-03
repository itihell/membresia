import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          // BASE: Ancho completo, altura cómoda (h-10) y texto base
          "flex w-full h-10 px-4 py-2 text-base md:text-md",

          // ESTILO: Bordes redondeados y fondo blanco
          "rounded-lg border border-blue-400 bg-white",

          // TRANSICIÓN: Suave para el focus/hover
          "transition-all duration-300 ease-in-out",

          // FOCUS/INTERACCIÓN: El cambio clave al color primario (blue-600)
          // El borde se vuelve azul y el anillo de sombra es el blue-100 (más suave)
          "focus:border-blue-600 focus:ring-4 focus:ring-blue-100 focus-visible:outline-none", // <-- Colores azules aplicados

          // PLACEHOLDER
          "placeholder:text-gray-400",

          // ESTADOS DESHABILITADOS
          "disabled:cursor-not-allowed disabled:opacity-60 disabled:bg-gray-100",

          // Sobreescribe con clases personalizadas
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
