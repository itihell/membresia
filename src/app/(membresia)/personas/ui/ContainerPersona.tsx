"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import {
  AddFamiliaPersona,
  DataMembresia,
  DataPersonaGeneral,
  Loading,
  MiembrosHasFamilia,
} from "@/components";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { People } from "@/interfaces";
import { getPeopleId } from "@/actions";
import {
  FaCalendarCheck,
  FaCircleUser,
  FaPeopleGroup,
  FaPersonShelter,
} from "react-icons/fa6";

interface Props {
  id: string;
}

export const ContainerPersona = ({ id }: Props) => {
  const params = useSearchParams();
  const route = useRouter();
  const pathName = usePathname();
  const tab = params.get("tab");

  const [persona, setPersona] = useState<People>({} as People);

  // Carga inicial
  useEffect(() => {
    (async () => {
      const data = await getPeopleId(id);
      setPersona(data);
    })();
  }, [id]);

  const navegacionTab = (newTab: string) => {
    // Usamos replace en lugar de push para no llenar el historial del navegador con cada click en tab
    route.replace(`${pathName}?tab=${newTab}`, { scroll: false });
  };

  const loadData = async (personaId: string) => {
    const data = await getPeopleId(personaId);
    setPersona(data);
  };

  return (
    <div className="w-full">
      {/* TABS CONTAINER 
         w-full: Asegura ancho completo
      */}
      <Tabs
        defaultValue={tab ?? "general"}
        className="w-full flex flex-col gap-6"
      >
        {/* LISTA DE TABS 
            - h-auto: Altura automática para adaptarse al padding.
            - bg-blue-50/60: Fondo celeste pastel muy suave.
            - p-1: Espacio para el efecto de "burbuja".
            - overflow-x-auto: Permite scroll horizontal en móviles muy pequeños.
        */}
        <TabsList className="w-full h-auto flex justify-start sm:justify-start gap-1 overflow-x-auto bg-blue-50/60 p-1.5 rounded-lg border border-blue-100 no-scrollbar">
          <TabItem
            value="general"
            label="General"
            icon={<FaCircleUser size={16} />}
            onClick={() => navegacionTab("general")}
          />

          <TabItem
            value="membresia"
            label="Membresía"
            icon={<FaPersonShelter size={16} />}
            onClick={() => navegacionTab("membresia")}
          />

          <TabItem
            value="familia"
            label="Familia"
            icon={<FaPeopleGroup size={16} />}
            onClick={() => navegacionTab("familia")}
          />

          <TabItem
            value="asistencia"
            label="Asistencia"
            icon={<FaCalendarCheck size={16} />}
            onClick={() => navegacionTab("asistencia")}
          />
        </TabsList>

        {/* CONTENIDO DE LOS TABS */}
        <div className="min-h-[300px]">
          {" "}
          {/* Altura mínima para evitar saltos */}
          <TabsContent
            value="general"
            className="mt-0 outline-none animate-in fade-in-50 zoom-in-95 duration-300"
          >
            <Suspense
              fallback={
                <div className="p-10 text-center text-blue-300">
                  Cargando datos generales...
                </div>
              }
            >
              <DataPersonaGeneral persona={persona} />
            </Suspense>
          </TabsContent>
          <TabsContent
            value="membresia"
            className="mt-0 outline-none animate-in fade-in-50 zoom-in-95 duration-300"
          >
            <DataMembresia id={persona.id} membresias={persona.membresia} />
          </TabsContent>
          <TabsContent
            value="familia"
            className="mt-0 outline-none animate-in fade-in-50 zoom-in-95 duration-300"
          >
            {/* Lógica condicional limpia */}
            {!persona.familia ? (
              <Suspense fallback={<Loading />}>
                <AddFamiliaPersona
                  created={miembro => loadData(miembro.persona_id)}
                  personaId={persona.id as string}
                />
              </Suspense>
            ) : (
              <Suspense fallback={<Loading />}>
                <MiembrosHasFamilia
                  onDeleted={id => loadData(id)}
                  familiaId={persona.familia.familia_id}
                />
              </Suspense>
            )}
          </TabsContent>
          <TabsContent
            value="asistencia"
            className="mt-0 outline-none animate-in fade-in-50 zoom-in-95 duration-300"
          >
            <div className="p-10 border border-dashed border-blue-200 rounded-lg text-center text-slate-500 bg-blue-50/20">
              <FaCalendarCheck className="mx-auto h-10 w-10 text-blue-200 mb-3" />
              <p>Módulo de asistencia en desarrollo</p>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

// COMPONENTE AUXILIAR PARA LIMPIAR EL CODIGO DE ARRIBA
// Esto hace que cada botón de tab se vea idéntico y profesional
const TabItem = ({
  value,
  label,
  icon,
  onClick,
}: {
  value: string;
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
}) => {
  return (
    <TabsTrigger
      value={value}
      onClick={onClick}
      className="
        flex-1 min-w-[100px] flex items-center justify-center gap-2 py-2.5 px-3 rounded-md text-sm font-medium transition-all
        text-slate-500 hover:text-blue-700 hover:bg-white/50
        data-[state=active]:bg-white data-[state=active]:text-blue-950 data-[state=active]:shadow-sm data-[state=active]:font-semibold
      "
    >
      {icon}
      {/* En móvil muy pequeño podríamos ocultar el texto, pero con min-w-100px y scroll se ve bien */}
      <span className="hidden xs:inline-block">{label}</span>
    </TabsTrigger>
  );
};
