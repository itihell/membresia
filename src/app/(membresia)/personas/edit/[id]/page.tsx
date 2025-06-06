import { Loading, Title } from "@/components";
import { FormPeople } from "../../ui/FormPeople";
import { Suspense } from "react";

interface Prop {
  params: Promise<{
    id: string;
  }>;
}

const EditPeoplePage = async (props: Prop) => {
  const params = await props.params;
  const { id } = params;
  return (
    <div className="mb-5">
      <Title title="Datos de la persona" className="mb-2" />
      <div>
        <div className="bg-gray-50 p-4">
          <Suspense fallback={<Loading />}>
            <FormPeople id={id} />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default EditPeoplePage;
