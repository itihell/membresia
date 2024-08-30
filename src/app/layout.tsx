import type { Metadata } from "next";
import { inter } from "@/config/fonts";

import "./globals.css";
import { Provider } from "@/components";

export const metadata: Metadata = {
  title: "Membresia",
  description: "Registro de miembros de la iglesia",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={`${inter.className} bg-blue-100`}>
        <div>
          <Provider>{children}</Provider>
        </div>
      </body>
    </html>
  );
}
