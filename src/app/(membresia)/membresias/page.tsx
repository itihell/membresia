import { GridMembresia, Loading } from "@/components";
import { BodyPage } from "@/modules/common/components";
import Link from "next/link";
import { Suspense } from "react";
import { FaUserPlus } from "react-icons/fa6";

export default function AdminPage() {
  return (
    <BodyPage title="Membresia">
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
    </BodyPage>
  );
}
