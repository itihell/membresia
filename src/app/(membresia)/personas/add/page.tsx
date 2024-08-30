import { Title } from "@/components";
import { FormPeople } from "../ui/FormPeople";

const AddPersonaPage = () => {
  return (
    <div className="mb-5">
      <Title title="Datos de la persona" className="mb-2" />
      <div>
        <div className="bg-gray-50 p-4">
          <FormPeople />
        </div>
      </div>
    </div>
  );
};

export default AddPersonaPage;
