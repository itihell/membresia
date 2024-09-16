export const revalidate = 0;
import { Title } from "@/components";
import { ContainerPersona } from "../ui/ContainerPersona";
import Link from "next/link";
import { FaPencil, FaPeopleGroup } from "react-icons/fa6";

interface Props {
  params: {
    id: string;
  };
}
const ShowPersonaPage = async ({ params: { id } }: Props) => {
  return (
    <div className="mb-5">
      <Title title="Datos de la persona" className="mb-2" />
      <div>
        <div className="bg-gray-50 p-4">
          <ContainerPersona id={id} />
        </div>
      </div>
      <div className="right-8 bottom-8 fixed ">
        <div className="flex">
          <Link
            href={`/personas`}
            className="btn-primary !rounded-r-none p-2 rounded-md flex gap-1"
          >
            <FaPeopleGroup size={25} />
            <span>Personas</span>
          </Link>
          <Link
            href={`/personas/edit/${id}`}
            className="btn-primary p-2 rounded-l-none rounded-md flex gap-1"
          >
            <FaPencil size={25} />
            <span>Editar</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ShowPersonaPage;
