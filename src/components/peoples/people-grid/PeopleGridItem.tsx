"use client";

import { People } from "@/interfaces";

import Link from "next/link";
import { IoCallSharp, IoManSharp, IoWomanSharp } from "react-icons/io5";

interface Props {
  people: People;
}

export const PeopleGridItem = ({ people }: Props) => {
  //const [displayImage, setDisplayImage] = useState(product.images[0]);

  return (
    <tr>
      <td className="w-1/3 text-left py-3 px-4">
        <Link className="hover:text-blue-700" href={`/peoples/${people.id}`}>
          {people.nombres} {people.apellidos}
        </Link>
      </td>
      <td className="w-1/3 text-left py-3 px-4">
        {people.sexo.name === "Femenino" ? (
          <IoWomanSharp size={30} />
        ) : (
          <IoManSharp size={30} />
        )}
      </td>
      <td className="text-left py-3 px-4">{people.cedula}</td>
      <td className="text-left py-3 px-4">
        <a
          className="hover:text-blue-500 flex items-center "
          href="tel:622322662"
        >
          <IoCallSharp />
          <span className="ml-2">{people.telefono}</span>
        </a>
      </td>
      <td className="text-left py-3 px-4">
        <a className="hover:text-blue-500" href="mailto:jonsmith@mail.com">
          {people.estadoCivil.estadoCivil}
        </a>
      </td>
    </tr>
  );
};
