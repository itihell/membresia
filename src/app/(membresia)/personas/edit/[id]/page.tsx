import { Title } from "@/components";
import { FormPeople } from "../../ui/FormPeople";

interface Prop {
  params: {
    id: string;
  };
}

const EditPeoplePage = ({ params }: Prop) => {
  const { id } = params;
  return (
    <div className="mb-5">
      <Title title="Datos de la persona" className="mb-2" />
      <div>
        <div className="bg-gray-50 p-4">
          <FormPeople id={id} />
        </div>
      </div>
    </div>
  );
};

export default EditPeoplePage;
