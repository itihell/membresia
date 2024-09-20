import { FormFamilia, Title } from "@/components";
interface Props {
  params: {
    id: string;
  };
}
export default function EditarFamiliaPage({ params: { id } }: Props) {
  return (
    <div className="mb-5">
      <Title title="Editar Familia" className="mb-2" />
      <div className="bg-gray-50 p-4">
        <FormFamilia id={id} />
      </div>
    </div>
  );
}
