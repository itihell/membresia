import { FormMiembroHasFamilia, Title } from "@/components";

export default function FamiliaHasPersonaPage() {
  return (
    <div className="mb-5">
      <Title title="Agregar miembro a la familia" className="mb-2" />
      <div className="bg-gray-50 p-4">
        <FormMiembroHasFamilia />
      </div>
    </div>
  );
}
