import { FormMembresia, Loading, Title } from "@/components";
import { Suspense } from "react";

const AgregarMiembroPage = () => {
  return (
    <div className="mb-5">
      <Title title="Agregando Miembro" className="mb-2" />
      <div>
        <div className="bg-gray-50 p-4">
          <Suspense fallback={<Loading />}>
            <FormMembresia />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default AgregarMiembroPage;
