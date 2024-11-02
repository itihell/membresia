import { GridEventos, Loading, Title } from "@/components";
import Link from "next/link";
import { Suspense } from "react";
import { FaUserPlus } from "react-icons/fa6";

const EventosPages = () => {
  return (
    <div className="mb-5">
      <Title title="Eventos" className="mb-2" />
      <div>
        <div className="bg-gray-50 p-4 border border-blue-200">
          <Suspense fallback={<Loading />}>
            <GridEventos />
          </Suspense>
        </div>
      </div>
      <div className="fixed right-8 bottom-8">
        <Link
          href={`/eventos/add`}
          className="p-3 btn-primary rounded-md flex gap-1 justify-center items-center"
        >
          <FaUserPlus />
          <span className="md:block hidden">Agregar</span>
        </Link>
      </div>
    </div>
  );
};

export default EventosPages;
