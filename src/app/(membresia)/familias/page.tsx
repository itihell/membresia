export const revalidate = 0;
import { getFamilias } from "@/actions";
import { GridFamilias, Loading, Title } from "@/components";
import Link from "next/link";
import { Suspense } from "react";
import { FaUserPlus } from "react-icons/fa6";

export default async function FamiliaPage() {
  const familias = await getFamilias();
  return (
    <div className="mb-5">
      <Title title="Familias" className="mb-2" />
      <div>
        <Suspense fallback={<Loading />}>
          <GridFamilias familias={familias} />
        </Suspense>
        <div className="fixed right-8 bottom-8">
          <Link
            href={`/familias/add`}
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
