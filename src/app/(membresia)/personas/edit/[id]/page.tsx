import { Loading } from "@/components";
import { FormPeople } from "../../ui/FormPeople";
import { Suspense } from "react";
import { BodyPage } from "@/modules/common/components";

interface Prop {
  params: Promise<{
    id: string;
  }>;
}

const EditPeoplePage = async (props: Prop) => {
  const params = await props.params;
  const { id } = params;
  return (
    <BodyPage title="Datos de la persona">
      <div>
        <div className="bg-gray-50 p-4">
          <Suspense fallback={<Loading />}>
            <FormPeople id={id} />
          </Suspense>
        </div>
      </div>
    </BodyPage>
  );
};

export default EditPeoplePage;
