"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "@/lib/utils";

const Tabs = TabsPrimitive.Root;

// --- TABS LIST (Contenedor de Pestañas) ---
const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      // ESTILOS DE RESPONSIVIDAD: Permite el desplazamiento horizontal en móvil
      "flex w-full overflow-x-auto whitespace-nowrap",

      // Estilo Profesional: Línea indicadora
      "h-10 items-center justify-start rounded-none bg-transparent p-0 text-muted-foreground",
      "border-b border-gray-200 dark:border-gray-800",
      className
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

// --- TABS TRIGGER (Cada Pestaña) ---
const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      // ESTILOS DE RESPONSIVIDAD: Evita que el botón se encoja y ajusta el padding
      "flex-shrink-0 px-4 sm:px-6",

      // Estilos base
      "inline-flex items-center justify-center whitespace-nowrap rounded-none py-2 text-sm font-medium transition-colors",
      "ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      "disabled:pointer-events-none disabled:opacity-50",

      // Estilos para el indicador de línea (Mantenidos)
      "h-full pt-1.5 pb-2.5",
      "hover:text-foreground/80",

      // Estado Activo (Línea Azul Marino)
      "data-[state=active]:bg-transparent",
      "data-[state=active]:text-foreground",
      "data-[state=active]:border-b-2 data-[state=active]:border-primary",

      className
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

// --- TABS CONTENT (Contenido de Pestaña) ---
const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
