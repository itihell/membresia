export const revalidate = 60;

import { GridMenu, Title } from "@/components";

interface Props {
  searchParams: {
    page?: string;
  };
}

export default async function Home({ searchParams }: Props) {
  return (
    <>
      <Title title="Home" subtitle="Operaciones" className="mb-2" />
      <div className="mb-5">
        <GridMenu />
      </div>
    </>
  );
}
