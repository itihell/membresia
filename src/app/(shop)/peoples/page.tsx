export const revalidate = 60;

import { PeopleGrid, Title } from "@/components";

import { getPaginatedPeoples } from "@/actions";

export default async function PeoplePage() {
  const { currentPage, totalPages, peoples } = await getPaginatedPeoples({
    page: 1,
  });

  return (
    <>
      <Title
        title="Personas"
        subtitle="Catalogo de personas dentro de Membershiping"
        className="mb-2"
      />

      <h1>Pagina de personas</h1>
      <PeopleGrid peoples={peoples} />
    </>
  );
}
