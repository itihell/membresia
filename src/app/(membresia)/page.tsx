export const revalidate = 60;

import { GridMenu, Title } from "@/components";

export default async function Home() {
  return (
    <>
      <Title title="Home" subtitle="Operaciones" className="mb-2" />
      <div className="mb-5">
        <GridMenu />
      </div>
    </>
  );
}
