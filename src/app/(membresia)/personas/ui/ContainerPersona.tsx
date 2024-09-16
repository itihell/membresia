"use client";
import { DataPersonaGeneral } from "@/components";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { People } from "@/interfaces";
import { useEffect, useState } from "react";
import { getPeopleId } from "@/actions";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  id: string;
}

export const ContainerPersona = ({ id }: Props) => {
  const route = useSearchParams();
  const tab = route.get("tab");

  const [persona, setPersona] = useState<People>({} as People);
  useEffect(() => {
    (async () => {
      const persona = await getPeopleId(id);
      setPersona(persona);
    })();
  }, [id]);

  return (
    <div className="mb-5">
      <Tabs defaultValue={tab ?? "general"}>
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="membresia">Membresia</TabsTrigger>
          <TabsTrigger value="familia">Familia</TabsTrigger>
        </TabsList>
        <TabsContent value="general">
          <div className="mt-5">
            <DataPersonaGeneral persona={persona} />
          </div>
        </TabsContent>
        <TabsContent value="membresia">
          <div className="mt-5">Membresia</div>
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
      </Tabs>
    </div>
  );
};
