import { Title } from "@/components";

interface Props {
  params: {
    id: string;
  };
}
const ShowPersonaPage = ({ params: { id } }: Props) => {
  return (
    <div className="mb-5">
      <Title title="Datos de la persona" className="mb-2" />
      <div>
        <div className="bg-gray-50 p-4">{id}</div>
      </div>
    </div>
  );
};

export default ShowPersonaPage;
