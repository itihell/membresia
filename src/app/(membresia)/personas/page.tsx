export const revalidate = 0;
export const dynamic = "force-dynamic";
import { Loading, PeopleGrid } from "@/components";
import { BodyPage } from "@/modules/common/components";

import Link from "next/link";
import { Suspense } from "react";
import { FaUserPlus } from "react-icons/fa6";

export default async function PeoplePage() {
  return (
    <BodyPage title="Personas">
      <div>
        <Suspense fallback={<Loading />}>
          <PeopleGrid />
        </Suspense>

        <div className="fixed right-8 bottom-8">
          <Link
            href={`/personas/add`}
            className="p-3 btn-primary rounded-md flex gap-1 justify-center items-center"
          >
            <FaUserPlus />
            <span className="md:block hidden">Agregar</span>
          </Link>
        </div>
      </div>
    </BodyPage>
  );
}
