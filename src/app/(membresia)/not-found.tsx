import Link from "next/link";
import { headers } from "next/headers";

export default async function NotFound() {
  const headersList = await headers();
  const domain = headersList.get("host");

  return (
    <div className="grid grid-cols-1 gap-4 place-items-center min-h-screen">
      <div className="container shadow-lg p-10 rounded-lg bg-green-100 border border-green-500">
        <h2 className="text-3xl">Not Found 😰</h2>
        <p>No se encontro el resgistro</p>
        <p className="mt-10">
          <Link href="/">Regrear</Link>
        </p>
      </div>
    </div>
  );
}
