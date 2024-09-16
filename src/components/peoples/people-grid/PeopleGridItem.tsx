"use client";

import { People } from "@/interfaces";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { IoCallSharp, IoManSharp, IoWomanSharp } from "react-icons/io5";

interface Props {
  people: People;
}

export const PeopleGridItem = ({ people }: Props) => {
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
      <div className="col-span-8">
        {people.nombres} {people.apellidos}
      </div>
      <div className="col-span-4">{people.telefono}</div>
    </div>
  );
};
