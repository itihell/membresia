"use client";
import {
  AddFamiliaPersona,
  DataMembresia,
  DataPersonaGeneral,
  Loading,
  MiembrosHasFamilia,
} from "@/components";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FamiliaHasPersona, People } from "@/interfaces";
import { Suspense, useEffect, useState } from "react";
import { getPeopleId } from "@/actions";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
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
  useEffect(() => {
    (async () => {
      const persona = await getPeopleId(id);
      setPersona(persona);
    })();
  }, [id]);

  const navegacionTab = (tab: string) => {
    route.push(`${pathName}?tab=${tab}`);
  };

  const loadData = async (personaId:string) => {
    const persona = await getPeopleId(personaId);
    setPersona(persona);
  };

  const createdMiembroHasFamilia = async (miembro: FamiliaHasPersona) => {
    loadData(miembro.persona_id);
  };

  const deletedHundler = async (personaId: string) => {
    loadData(personaId);
  };

  return (
    <div className="mb-5">
      <Tabs defaultValue={tab ?? "general"}>
        <TabsList>
          <TabsTrigger
            className="flex gap-2"
            onClick={() => navegacionTab("general")}
            value="general"
          >
            <FaCircleUser size={15} />
            General
          </TabsTrigger>
          <TabsTrigger
            className="flex gap-2"
            onClick={() => navegacionTab("membresia")}
            value="membresia"
          >
            <FaPersonShelter />
            Membresia
          </TabsTrigger>
          <TabsTrigger
            className="flex gap-2"
            onClick={() => navegacionTab("familia")}
            value="familia"
          >
            <FaPeopleGroup size={15} />
            Familia
          </TabsTrigger>
          <TabsTrigger
            className="flex gap-2"
            onClick={() => navegacionTab("asistencia")}
            value="asistencia"
          >
            <FaCalendarCheck />
            Asistencia
          </TabsTrigger>
        </TabsList>
        <TabsContent value="general">
          <div className="mt-5">
            <Suspense fallback={<Loading />}>
              <DataPersonaGeneral persona={persona} />
            </Suspense>
          </div>
        </TabsContent>
        <TabsContent value="membresia">
          <div className="mt-5">
            <DataMembresia id={persona.id} membresias={persona.membresia} />
          </div>
        </TabsContent>
        <TabsContent value="familia">
          <div>
            {!persona.familia && (
              <Suspense fallback={<Loading />}>
                <AddFamiliaPersona
                  created={(miembro: FamiliaHasPersona) => {
                    createdMiembroHasFamilia(miembro);
                  }}
                  personaId={persona.id as string}
                />
              </Suspense>
            )}
            {persona.familia && (
              <Suspense fallback={<Loading />}>
                <MiembrosHasFamilia
                  onDeleted={(id: string) => {
                    deletedHundler(id);
                  }}
                  familiaId={persona.familia.familia_id}
                />
              </Suspense>
            )}
          </div>
        </TabsContent>
        <TabsContent value="asistencia">
          <div>Asistencia</div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
