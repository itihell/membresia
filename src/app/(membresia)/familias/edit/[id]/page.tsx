import { FormFamilia, Loading, Title } from "@/components";
import { Suspense } from "react";
interface Props {
  params: Promise<{
    id: string;
  }>;
}
export default async function EditarFamiliaPage(props: Props) {
  const params = await props.params;

  const {
    id
  } = params;

  return (
    <div className="mb-5">
      <Title title="Editar Familia" className="mb-2" />
      <div className="bg-gray-50 p-4">
        <Suspense fallback={<Loading />}>
          <FormFamilia id={id} />
        </Suspense>
      </div>
    </div>
  );
}
