import { Loading } from "@/components";
import { FormPeople } from "../ui/FormPeople";
import { Suspense } from "react";
import { BodyPage } from "@/modules/common/components";

const AddPersonaPage = () => {
  return (
    <BodyPage title="Agregar Persona">
      <div>
        <div className="bg-gray-50 p-4">
          <Suspense fallback={<Loading />}>
            <FormPeople />
          </Suspense>
        </div>
      </div>
    </BodyPage>
  );
};

export default AddPersonaPage;
