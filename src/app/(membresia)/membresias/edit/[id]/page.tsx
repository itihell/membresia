import { FormMembresia, Loading, Title } from "@/components";
import { Suspense } from "react";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

const AgregarMiembroPage = async (props: Props) => {
  const params = await props.params;

  const {
    id
  } = params;

  return (
    <div className="mb-5">
      <Title title="Editar Membresia" className="mb-2" />
      <div>
        <div className="bg-gray-50 p-4">
          <Suspense fallback={<Loading />}>
            <FormMembresia id={id} />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default AgregarMiembroPage;
