import { titleFont } from "@/config/fonts";
import type { People } from "@/interfaces";
import { format } from "date-fns";

import React from "react";

interface Props {
  persona: People;
}

interface RowsProps {
  title: string;
  value: string;
  isDate?: boolean;
}

interface TitleSeparadorProps {
  title: string;
}

const safeValue = (value: string) => {
  const isDate = new Date(value);

  if (!isNaN(isDate.getDate()) && isDate instanceof Date) {
    return format(isDate, "dd - MM -yyyy");
  }

  if (value === null || value === undefined) {
    return "";
  } else if (value === "null" || value === "undefined") {
    return "";
  }
  return value;
};

const DataPersonaGeneral = ({ persona }: Props) => {
  return (
    <div className="">
      <GroupRowsPersona>
        <RowsPersona
          title="Nombre"
          value={`${persona.nombres} ${persona.apellidos}`}
        />
        <RowsPersona title="Identidad" value={`${persona.cedula}`} />
        <RowsPersona title="Sexo" value={`${persona.sexo?.name}`} />

        <RowsPersona
          title="Estado Civil"
          value={`${persona.estadoCivil?.estado_civil}`}
        />
      </GroupRowsPersona>
      <TitleSeparator title="Fechas" />
      <GroupRowsPersona>
        <RowsPersona
          title="Fecha de Nacimiento"
          isDate
          value={`${persona.fecha_nacimiento}`}
        />
        <RowsPersona title="Fecha de Fe" isDate value={`${persona.fecha_fe}`} />
        <RowsPersona
          title="Fecha de Bautismo"
          isDate
          value={`${persona.fecha_bautizo}`}
        />
      </GroupRowsPersona>
      <TitleSeparator title="Ubicación" />
      <GroupRowsPersona>
        <RowsPersona
          title="Pais"
          value={`${persona.barrio?.municipio?.departamento?.pais?.name}`}
        />
        <RowsPersona
          title="Departamento"
          value={`${persona.barrio?.municipio?.departamento?.name}`}
        />
        <RowsPersona
          title="Municipio"
          value={`${persona.barrio?.municipio?.name}`}
        />
        <RowsPersona
          title="Área"
          value={`${persona.barrio?.zonaGeografica?.name}`}
        />
        <RowsPersona title="Barrio" value={`${persona.barrio?.name} `} />
        <RowsPersona title="Dirección" value={`${persona.direccion}`} />
      </GroupRowsPersona>

      <TitleSeparator title="Contacto" />
      <GroupRowsPersona>
        <RowsPersona title="Teléfono" value={`${persona.telefono}`} />
        <RowsPersona title="Correo" value={`${persona.email}`} />
      </GroupRowsPersona>
    </div>
  );
};

interface PropGroupPerson {
  children: React.ReactNode;
}
const GroupRowsPersona = ({ children }: PropGroupPerson) => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-y-1 gap-x-5">
      {children}
    </div>
  );
};

const RowsPersona = ({ title, value, isDate }: RowsProps) => {
  return (
    <div className="grid grid-cols-2 gap-x-6 ">
      <div className="font-bold">{title}:</div>
      <div className="text-gray-600 ">{isDate ? safeValue(value) : value}</div>
    </div>
  );
};

const TitleSeparator = ({ title }: TitleSeparadorProps) => {
  return (
    <div
      className={`${titleFont.className} font-bold border-b  mt-6 mb-3 text-blue-600 border-b-blue-700`}
    >
      {title}
    </div>
  );
};

export { DataPersonaGeneral };
