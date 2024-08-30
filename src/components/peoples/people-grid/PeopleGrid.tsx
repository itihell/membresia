import { People } from "@/interfaces";
import { PeopleGridItem } from "./PeopleGridItem";

interface Props {
  peoples: People[];
}

export const PeopleGrid = ({ peoples }: Props) => {
  return (
    <div className="overflow-auto    rounded-md w-full shadow-lg">
      <div className="w-full shadow overflow-hidden rounded border-b border-gray-200">
        <div className="grid grid-cols-12 bg-blue-700 text-white p-2 ">
          <div className="col-span-8">Nombres</div>
          <div className="col-span-4">Teléfono</div>
        </div>
        <div className="bg-white p-2">
          {peoples.map((people) => (
            <PeopleGridItem key={people.id} people={people} />
          ))}
        </div>
      </div>
    </div>
  );
};
