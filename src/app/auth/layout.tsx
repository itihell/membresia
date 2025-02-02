import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Autenticación',
  description: 'Aplicacion de membresia de FIEMCA'
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex justify-center">
      <div className="w-full">{children}</div>
    </main>
  );
}
