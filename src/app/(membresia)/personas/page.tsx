import { PeopleGrid, Title } from "@/components";

import { getPaginatedPeoples } from "@/actions";
import Link from "next/link";
import { FaUserPlus } from "react-icons/fa6";

export default async function PeoplePage() {
  const { currentPage, totalPages, peoples } = await getPaginatedPeoples({
    page: 1,
  });

  return (
    <div className="mb-5">
      <Title title="Personas" className="mb-2" />
      <div>
        <PeopleGrid peoples={peoples} />
        <div className="fixed right-8 bottom-8">
          <Link
            href={`/personas/add`}
            className="p-3 btn-primary rounded-md flex gap-1 justify-center items-center"
          >
            <FaUserPlus />
            Agregar
          </Link>
        </div>
      </div>
    </div>
  );
}
