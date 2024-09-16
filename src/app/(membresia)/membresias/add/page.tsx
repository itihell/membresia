import { FormMembresia, Title } from "@/components";

const AgregarMiembroPage = () => {
  return (
    <div className="mb-5">
      <Title title="Agregando Miembro" className="mb-2" />
      <div>
        <div className="bg-gray-50 p-4">
          <FormMembresia />
        </div>
      </div>
    </div>
  );
};

export default AgregarMiembroPage;
