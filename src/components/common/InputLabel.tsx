"use client"; // Este componente será un Client Component

import * as React from "react";
import { cn } from "@/lib/utils";
import { Input } from "../ui";

interface Props extends React.ComponentPropsWithoutRef<"input"> {
  label: string; // Propiedad para el texto de la etiqueta
}

const InputLabel = React.forwardRef<HTMLInputElement, Props>(
  ({ className, type, label, ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false);
    const hasValue =
      props.value !== undefined && props.value !== null && props.value !== "";

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    return (
      <div className="relative w-full">
        <Input
          type={type}
          className={cn(
            "w-full pt-6 pb-2 px-4 h-14", // Ajusta el padding y altura para la etiqueta flotante
            "peer", // Clase para seleccionar el label cuando el input está activo
            className // Clases personalizadas de la instancia
          )}
          onFocus={handleFocus}
          onBlur={handleBlur}
          ref={ref}
          {...props}
          // IMPORTANTE: NO PASES 'placeholder' aquí si quieres que la etiqueta lo reemplace
          placeholder="" // Asegúrate de que no haya placeholder visible
        />
        <label
          htmlFor={props.id} // Enlaza el label al input por ID
          className={cn(
            "absolute left-4 cursor-text text-gray-400 pointer-events-none transition-all duration-200",
            "transform origin-top-left",
            // Estado inicial: Abajo, tamaño normal
            "top-1/2 -translate-y-1/2 text-base",
            // Cuando el input está enfocado O tiene valor:
            // Sube, se encoge, cambia de color
            (isFocused || hasValue) &&
              "top-2 scale-75 -translate-y-0 text-blue-600 font-medium", // Estilo flotante

            // Estilo del borde cuando la etiqueta está flotando (simula el corte en el borde)
            (isFocused || hasValue) &&
              "peer-focus:before:absolute peer-focus:before:inset-y-0 peer-focus:before:left-0 peer-focus:before:h-px peer-focus:before:w-2 peer-focus:before:bg-white peer-focus:before:z-10" // Simulación de corte
          )}
        >
          {label}
        </label>
      </div>
    );
  }
);

InputLabel.displayName = "FloatingLabelInput";

export { InputLabel };
