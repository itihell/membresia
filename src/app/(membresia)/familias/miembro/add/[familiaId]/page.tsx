import { FormMiembroHasFamilia, Loading, Title } from "@/components";
import { Suspense } from "react";

interface Props {
  params: Promise<{
    familiaId: string;
  }>;
}

export default async function FamiliaHasPersonaPage(props: Props) {
  const params = await props.params;

  const {
    familiaId
  } = params;

  return (
    <div className="mb-5">
      <Title title="Agregar miembro a la familia" className="mb-2" />
      <div className="bg-gray-50 p-4">
        <Suspense fallback={<Loading />}>
          <FormMiembroHasFamilia familiaId={familiaId} />
        </Suspense>
      </div>
    </div>
  );
}
