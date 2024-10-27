import { FormEvents, Loading, Title } from "@/components";
import { Suspense } from "react";

export default function AddEventPage() {
  return (
    <div className="mb-5">
      <Title title="Agrega nuevo evento" className="mb-2" />
      <div>
        <div className="bg-gray-50 p-4 border border-blue-200">
          <Suspense fallback={<Loading />}>
            <FormEvents />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
