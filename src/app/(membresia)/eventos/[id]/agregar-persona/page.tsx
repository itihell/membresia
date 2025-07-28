import { FormPeople } from "@/app/(membresia)/personas/ui/FormPeople";
import { Loading } from "@/components";
import { BodyPage } from "@/modules/common/components";
import { Suspense } from "react";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function NamePage({ params }: Props) {
  const { id } = await params;
  return (
    <BodyPage title="Agregar Persona">
      <div>
        <div className="bg-gray-50 p-4">
          <Suspense fallback={<Loading />}>
            <FormPeople eventoId={id} />
          </Suspense>
        </div>
      </div>
    </BodyPage>
  );
}
