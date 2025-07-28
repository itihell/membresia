"use client";
import type { People } from "@/interfaces";
import { PeopleGridItem } from "./PeopleGridItem";
import { useQueryPeoples } from "@/modules/peoples/hooks";

// interface Props {
//   peoples: People[];
// }

export const PeopleGrid = () => {
  const { data, isPending } = useQueryPeoples();

  const peoples: People[] = data?.peoples || [];

  if (isPending) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-700"></div>
      </div>
    );
  }

  return (
    <div className="overflow-auto    rounded-md w-full shadow-lg">
      <div className="w-full shadow overflow-hidden rounded border-b border-gray-200">
        <div className="grid grid-cols-12 bg-blue-700 text-white p-2 ">
          <div className="col-span-8">Nombres</div>
          <div className="col-span-4">Teléfono</div>
        </div>
        <div className="bg-white p-2">
          {peoples.map((people, index) => (
            <PeopleGridItem index={index} key={people.id} people={people} />
          ))}
        </div>
      </div>
    </div>
  );
};
