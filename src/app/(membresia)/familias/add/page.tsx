import { FormFamilia, Title } from "@/components";

export default function AddFamiliaPage() {
  return (
    <div className="mb-5">
      <Title title="Nombre de la familia" className="mb-2" />
      <div className="bg-gray-50 p-4">
        <FormFamilia />
      </div>
    </div>
  );
}
