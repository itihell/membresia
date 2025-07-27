export const revalidate = 60;

import { GridMenu } from "@/components";
import { BodyPage } from "@/modules/common/components";

export default async function Home() {
  return (
    <BodyPage title="Home" className="">
      <GridMenu />
    </BodyPage>
  );
}
