export const revalidate = 0;
import { Loading, MiembrosHasFamilia, Title } from "@/components";
import Link from "next/link";
import { Suspense } from "react";
import { FaPencil, FaPeopleGroup, FaUserPlus } from "react-icons/fa6";
interface Props {
  params: Promise<{
    id: string;
  }>;
}
export default async function ShowFamiliaPage(props: Props) {
  const params = await props.params;

  const {
    id
  } = params;

  return (
    <div>
      <Title title={`Datos de la familia`} className="mb-2" />
      <div className="bg-gray-50 p-4">
        <div className="flex gap-5">
          <Suspense fallback={<Loading />}>
            <MiembrosHasFamilia familiaId={id} />
          </Suspense>
        </div>
      </div>
      <div className="fixed right-8 bottom-8 flex flex-row">
        <Link
          href={`/familias?familia=${id}`}
          className="p-1 btn-warning rounded-l-md flex gap-1 justify-center items-center"
        >
          <FaPeopleGroup size={25} />
          Familias
        </Link>

        <Link
          href={`/familias/edit/${id}`}
          className="p-1 btn-primary rounded-r-none flex gap-1 justify-center items-center"
        >
          <FaPencil size={25} />
          Editar
        </Link>
        <Link
          href={`/familias/miembro/add/${id}`}
          className="p-1 btn-success rounded-r-md flex gap-1 justify-center items-center"
        >
          <FaUserPlus size={25} />
          Agregar
        </Link>
      </div>
    </div>
  );
}
