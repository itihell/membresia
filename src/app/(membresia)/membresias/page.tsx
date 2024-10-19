import { GridMembresia, Loading, Title } from "@/components";
import Link from "next/link";
import { Suspense } from "react";
import { FaUserPlus } from "react-icons/fa6";

export default function AdminPage() {
  return (
    <div className="mb-5">
      <Title title="Membresia" className="mb-2" />
      <div>
        <Suspense fallback={<Loading />}>
          <GridMembresia />
        </Suspense>
        <div className="fixed right-8 bottom-8">
          <Link
            href={`/membresias/add`}
            className="p-3 btn-primary rounded-md flex gap-1 justify-center items-center"
          >
            <FaUserPlus size={30} />
            Agregar
          </Link>
        </div>
      </div>
    </div>
  );
}
