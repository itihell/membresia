import { FormMembresia, Loading, Title } from "@/components";
import { Suspense } from "react";

interface Props {
  params: {
    id: string;
  };
}

const AgregarMiembroPage = ({ params: { id } }: Props) => {
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
