import { Loading, Title } from "@/components";
import { FormPeople } from "../ui/FormPeople";
import { Suspense } from "react";

const AddPersonaPage = () => {
  return (
    <div className="mb-5">
      <Title title="Datos de la persona" className="mb-2" />
      <div>
        <div className="bg-gray-50 p-4">
          <Suspense fallback={<Loading />}>
            <FormPeople />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default AddPersonaPage;
