"use client";

import { MembresiaSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Calendar } from "../ui/calendar";
import { useState } from "react";
import { ListPersonas } from "../ui/lists/list-personas";

export const FormMembresia = () => {
  const route = useRouter();
  const [openFecha, setOpenFecha] = useState(false);

  const form = useForm<z.infer<typeof MembresiaSchema>>({
    resolver: zodResolver(MembresiaSchema),
    defaultValues: {},
  });

  const onSubmit = async (data: z.infer<typeof MembresiaSchema>) => {
    console.log({ data });
  };
  return (
    <div>
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid md:grid-cols-12 mt-1">
              <div className="col-span-3 md:justify-end mr-1 flex items-center">
                <label className="font-bold">Persona</label>
              </div>
              <div className="col-span-9">
                <ListPersonas form={form} campo="persona_id" nameRelation="persona" />
              </div>
            </div>
            <div className="grid md:grid-cols-12 mt-1">
              <div className="col-span-3 md:justify-end mr-1 flex items-center">
                <label className="font-bold">Fecha Membresia</label>
              </div>
              <div className="col-span-9">
                <FormField
                  control={form.control}
                  name="fecha"
                  render={({ field }) => (
                    <FormItem>
                      <Popover open={openFecha} onOpenChange={setOpenFecha}>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "d-MM-yyyy")
                              ) : (
                                <span>Fecha de nacimiento</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            onDayClick={(e) => {
                              setOpenFecha(false);
                            }}
                            captionLayout="dropdown-buttons"
                            fromYear={1940}
                            toYear={new Date().getFullYear()}
                            mode="single"
                            selected={
                              field.value ? new Date(field.value) : undefined
                            }
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};
