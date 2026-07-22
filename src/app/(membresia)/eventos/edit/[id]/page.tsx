import { FormEvents, Title } from "@/components";
import { Suspense } from "react";
import { Loading } from "@/components";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditEventPage(props: Props) {
  const params = await props.params;

  const { id } = params;

  return (
    <div className="mb-5">
      <Title title="Editar evento" className="mb-2" />
      <div>
        <div className="bg-gray-50 p-4 border border-blue-200">
          <Suspense fallback={<Loading />}>
            <FormEvents id={id} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
