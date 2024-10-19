import { FormFamilia, Loading, Title } from "@/components";
import { Suspense } from "react";

export default function AddFamiliaPage() {
  return (
    <div className="mb-5">
      <Title title="Nombre de la familia" className="mb-2" />
      <div className="bg-gray-50 p-4">
        <Suspense fallback={<Loading />}>
          <FormFamilia />
        </Suspense>
      </div>
    </div>
  );
}
