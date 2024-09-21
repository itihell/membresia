"use client";

import { People } from "@/interfaces";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaCheck } from "react-icons/fa6";

import { IoCallSharp, IoManSharp, IoWomanSharp } from "react-icons/io5";

interface Props {
  people: People;
  index: number;
}

export const PeopleGridItem = ({ people, index }: Props) => {
  const router = useRouter();
  //const [displayImage, setDisplayImage] = useState(product.images[0]);

  const onSelectedPeople = (id: string) => {
    router.push(`/personas/${id}`);
  };

  return (
    <div
      onClick={(e) => {
        onSelectedPeople(people.id as string);
      }}
      className="grid grid-cols-12 py-2 hover:bg-blue-300 hover:cursor-pointer border-b border-blue-500"
    >
      <div className="col-span-1">{index + 1}</div>
      <div className="col-span-7 flex gap-3">
        <span>
          {people.nombres} {people.apellidos}{" "}
        </span>
        <span>
          {people.membresia && people.membresia.length > 0 && (
            <span className="text-green-500">
              <FaCheck />
            </span>
          )}
        </span>
      </div>
      <div className="col-span-4">{people.telefono}</div>
    </div>
  );
};
