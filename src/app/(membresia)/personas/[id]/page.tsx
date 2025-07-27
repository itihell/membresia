export const revalidate = 0;
import { Loading } from "@/components";
import { ContainerPersona } from "../ui/ContainerPersona";
import Link from "next/link";
import { FaPencil, FaPeopleGroup } from "react-icons/fa6";
import { Suspense } from "react";
import { BodyPage } from "@/modules/common/components";

interface Props {
  params: Promise<{
    id: string;
  }>;
}
const ShowPersonaPage = async (props: Props) => {
  const params = await props.params;

  const { id } = params;

  return (
    <BodyPage title="Datos de la persona">
      <div>
        <div className="bg-gray-50 p-3 border border-blue-300">
          <Suspense fallback={<Loading />}>
            <ContainerPersona id={id} />
          </Suspense>
        </div>
      </div>
      <div className="right-8 bottom-8 fixed ">
        <div className="flex">
          <Link
            href={`/personas`}
            className="btn-primary !rounded-r-none p-2 rounded-md flex gap-1"
          >
            <FaPeopleGroup size={25} />
            <span className="3sm:hidden md:block">Personas</span>
          </Link>
          <Link
            href={`/personas/edit/${id}`}
            className="btn-primary p-2 rounded-l-none rounded-md flex gap-1"
          >
            <FaPencil size={25} />
            <span className="3sm:hidden md:block">Editar</span>
          </Link>
        </div>
      </div>
    </BodyPage>
  );
};

export default ShowPersonaPage;
