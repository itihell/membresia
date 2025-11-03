import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Autenticación - FIEMCA",
  description: "Aplicación de membresía de FIEMCA - Inicio de Sesión",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-md">{children}</div>
    </main>
  );
}
