import { FormMiembroHasFamilia, Title } from "@/components";

interface Props {
  params: {
    familiaId: string;
  };
}

export default function FamiliaHasPersonaPage({
  params: { familiaId },
}: Props) {
  return (
    <div className="mb-5">
      <Title title="Agregar miembro a la familia" className="mb-2" />
      <div className="bg-gray-50 p-4">
        <FormMiembroHasFamilia familiaId={familiaId} />
      </div>
    </div>
  );
}
