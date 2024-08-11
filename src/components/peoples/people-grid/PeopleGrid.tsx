import { People } from "@/interfaces";
import { PeopleGridItem } from "./PeopleGridItem";

interface Props {
  peoples: People[];
}

export const PeopleGrid = ({ peoples }: Props) => {
  return (
    <div className="overflow-auto p-2  bg-gray-500 rounded-md  w-full">
      <div className="w-full shadow overflow-hidden rounded border-b border-gray-200">
        <table className=" table-auto min-w-full bg-white">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">
                Persona
              </th>
              <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">
                Sexo
              </th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                Cédula
              </th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                Teléfono
              </th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                Estado Civil
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {peoples.map((people, i) => (
              <PeopleGridItem key={i} people={people} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
