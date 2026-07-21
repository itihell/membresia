export const revalidate = 0;
export const dynamic = "force-dynamic";

import { IglesiasList } from "@/components";
import { BodyPage } from "@/modules/common/components";
import { getIglesias } from "@/actions";

export default async function IglesiasPage() {
  const iglesias = await getIglesias();

  return (
    <BodyPage title="Iglesias">
      <div>
        <IglesiasList iglesias={iglesias} />
      </div>
    </BodyPage>
  );
}
