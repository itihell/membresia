"use client";
import { DataMembresia, DataPersonaGeneral } from "@/components";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { People } from "@/interfaces";
import { useEffect, useState } from "react";
import { getPeopleId } from "@/actions";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

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

  return (
    <div className="mb-5">
      <Tabs defaultValue={tab ?? "general"}>
        <TabsList>
          <TabsTrigger
            className=""
            onClick={() => navegacionTab("general")}
            value="general"
          >
            General
          </TabsTrigger>
          <TabsTrigger
            className=""
            onClick={() => navegacionTab("membresia")}
            value="membresia"
          >
            Membresia
          </TabsTrigger>
          <TabsTrigger
            className=""
            onClick={() => navegacionTab("familia")}
            value="familia"
          >
            Familia
          </TabsTrigger>
          <TabsTrigger
            className=""
            onClick={() => navegacionTab("familia")}
            value="asistencia"
          >
            Asistencia
          </TabsTrigger>
        </TabsList>
        <TabsContent value="general">
          <div className="mt-5">
            <DataPersonaGeneral persona={persona} />
          </div>
        </TabsContent>
        <TabsContent value="membresia">
          <div className="mt-5">
            <DataMembresia id={persona.id} membresias={persona.membresia} />
          </div>
        </TabsContent>
        <TabsContent value="familia">
          <div>
            {persona?.familia?.map((familia) => (
              <div key={familia.id}>
                {`${familia?.persona?.nombres} ${familia?.persona?.apellidos}`}
              </div>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="asistencia">
          <div>Asistencia</div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
