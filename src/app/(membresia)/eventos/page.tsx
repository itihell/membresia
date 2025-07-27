import { GridEventos, Loading } from "@/components";
import { BodyPage } from "@/modules/common/components";
import Link from "next/link";
import { Suspense } from "react";
import { FaUserPlus } from "react-icons/fa6";

const EventosPages = () => {
  return (
    <BodyPage title="Eventos">
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
    </BodyPage>
  );
};

export default EventosPages;
