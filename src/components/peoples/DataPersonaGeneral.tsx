import { inter, titleFont } from "@/config/fonts";
import { People } from "@/interfaces";
import { format } from "date-fns";

interface Props {
  persona: People;
}

interface RowsProps {
  title: string;
  value: string;
}

interface TitleSeparadorProps {
  title: string;
}

const safeValue = (value: string) => {
  const isDate = new Date(value);
  if (!isNaN(isDate.getTime())) {
    return format(isDate, "dd - MM -yyyy");
  }
  //console.log({ fecha });

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
      <div className="grid md:grid-cols-2 gap-3">
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
      </div>
      <TitleSeparator title="Fechas" />
      <div className="grid md:grid-cols-2 gap-3">
        <RowsPersona
          title="Fecha de Nacimiento"
          value={`${persona.fecha_nacimiento}`}
        />
        <RowsPersona title="Fecha de Fe" value={`${persona.fecha_fe}`} />
        <RowsPersona
          title="Fecha de Bautismo"
          value={`${persona.fecha_bautizo}`}
        />
      </div>
      <TitleSeparator title="Ubicación" />
      <div className="grid md:grid-cols-2 gap-3">
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
        <RowsPersona title="Barrio" value={`${persona.barrio?.name}`} />
        <RowsPersona title="Dirección" value={`${persona.direccion}`} />
      </div>

      <TitleSeparator title="Contacto" />
      <div className="grid md:grid-cols-2 gap-3">
        <RowsPersona title="Teléfono" value={`${persona.telefono}`} />
        <RowsPersona title="Correo" value={`${persona.email}`} />
      </div>
    </div>
  );
};

const RowsPersona = ({ title, value }: RowsProps) => {
  return (
    <div className="flex gap-5">
      <div className="font-bold">{title}:</div>
      <div className="text-gray-600">{safeValue(value)}</div>
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
