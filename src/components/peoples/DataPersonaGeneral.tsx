"use client";

import type { People } from "@/interfaces";
import { format, isValid } from "date-fns";
import {
  FaRegIdCard,
  FaCalendarDay,
  FaMapLocationDot,
  FaAddressBook,
} from "react-icons/fa6"; // Iconos para dar vida a las secciones

interface Props {
  persona: People;
}

// Función auxiliar para formatear valores y manejar nulos
const formatValue = (value: string | undefined | null, isDate?: boolean) => {
  if (!value || value === "null" || value === "undefined") {
    return <span className="text-slate-300 italic text-sm">No registrado</span>;
  }

  if (isDate) {
    // Intenta parsear la fecha de forma segura
    const date = new Date(value);
    // Verificamos si es una fecha válida
    if (isValid(date)) {
      return (
        <span className="font-mono text-blue-950">
          {format(date, "dd/MM/yyyy")}
        </span>
      );
    }
    return value; // Si no es fecha válida, devuelve el texto original
  }

  return <span className="text-blue-950 font-medium">{value}</span>;
};

export const DataPersonaGeneral = ({ persona }: Props) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* SECCIÓN 1: DATOS PERSONALES */}
      <section>
        <SectionHeader title="Información Personal" icon={<FaRegIdCard />} />
        <GridContainer>
          <InfoItem
            label="Nombre Completo"
            value={`${persona.nombres} ${persona.apellidos}`}
          />
          <InfoItem label="Cédula / Identidad" value={persona.cedula} />
          <InfoItem label="Sexo" value={persona.sexo?.name} />
          <InfoItem
            label="Estado Civil"
            value={persona.estadoCivil?.estado_civil}
          />
        </GridContainer>
      </section>

      {/* SECCIÓN 2: FECHAS IMPORTANTES */}
      <section>
        <SectionHeader title="Fechas Registradas" icon={<FaCalendarDay />} />
        <GridContainer>
          <InfoItem
            label="Fecha de Nacimiento"
            value={persona.fecha_nacimiento}
            isDate
          />
          <InfoItem
            label="Fecha de Conversión (Fe)"
            value={persona.fecha_fe}
            isDate
          />
          <InfoItem
            label="Fecha de Bautismo"
            value={persona.fecha_bautizo}
            isDate
          />
        </GridContainer>
      </section>

      {/* SECCIÓN 3: UBICACIÓN */}
      <section>
        <SectionHeader
          title="Ubicación y Vivienda"
          icon={<FaMapLocationDot />}
        />
        <GridContainer>
          <InfoItem
            label="País"
            value={persona.barrio?.municipio?.departamento?.pais?.name}
          />
          <InfoItem
            label="Departamento"
            value={persona.barrio?.municipio?.departamento?.name}
          />
          <InfoItem label="Municipio" value={persona.barrio?.municipio?.name} />
          <InfoItem
            label="Zona / Área"
            value={persona.barrio?.zonaGeografica?.name}
          />
          <InfoItem label="Barrio" value={persona.barrio?.name} />
          {/* Dirección ocupa 2 columnas en pantallas grandes para leerse mejor */}
          <div className="col-span-1 md:col-span-2 lg:col-span-2">
            <InfoItem label="Dirección Exacta" value={persona.direccion} />
          </div>
        </GridContainer>
      </section>

      {/* SECCIÓN 4: CONTACTO */}
      <section>
        <SectionHeader
          title="Información de Contacto"
          icon={<FaAddressBook />}
        />
        <GridContainer>
          <InfoItem label="Teléfono / Celular" value={persona.telefono} />
          <InfoItem label="Correo Electrónico" value={persona.email} />
        </GridContainer>
      </section>
    </div>
  );
};

// --- SUB-COMPONENTES DE ESTILO ---

// 1. Contenedor Grid Responsivo
const GridContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-1">
      {children}
    </div>
  );
};

// 2. Item de Información (Diseño Stacked)
interface InfoItemProps {
  label: string;
  value: string | null | undefined;
  isDate?: boolean;
}

const InfoItem = ({ label, value, isDate }: InfoItemProps) => {
  return (
    <div className="flex flex-col gap-1 group">
      {/* Label: Pequeño, mayúscula, gris suave */}
      <dt className="text-xs font-semibold text-slate-500 uppercase tracking-wider group-hover:text-blue-600 transition-colors">
        {label}
      </dt>
      {/* Value: Oscuro, legible */}
      <dd className="text-sm md:text-[15px] break-words">
        {formatValue(value, isDate)}
      </dd>
    </div>
  );
};

// 3. Encabezado de Sección Moderno
interface SectionHeaderProps {
  title: string;
  icon?: React.ReactNode;
}

const SectionHeader = ({ title, icon }: SectionHeaderProps) => {
  return (
    <div className="flex items-center gap-3 mb-5 pb-2 border-b border-blue-100">
      {/* Icono circular suave */}
      {icon && (
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-50 text-blue-600">
          <span className="text-sm">{icon}</span>
        </div>
      )}
      <h3 className="text-lg font-bold text-blue-950 tracking-tight">
        {title}
      </h3>
    </div>
  );
};
