"use client";
import { cn, removeTilde } from "@/lib/utils";
import { Button } from "../button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../form";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";
import { CaretSortIcon, CheckCircledIcon } from "@radix-ui/react-icons";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../command";
import { CommandList } from "cmdk";
import { useListData } from "@/hooks";
import { Barrio } from "@/interfaces";
import { getListBarrios } from "@/actions";
import {
  ControllerRenderProps,
  FieldValues,
  Path,
  PathValue,
  UseFormReturn,
} from "react-hook-form";
import { useState } from "react";

interface Campos {
  id?: number;
  name: string;
  municipio_id: number;
  zona_geografica_id: number;
}

type Props<T extends FieldValues> = {
  form: UseFormReturn<T>;
  campo: Path<T>;
  label?: string | undefined;
  className?: string | undefined;
  nameRelation?: Path<T>;
};

export const ListBarrios = <T extends FieldValues>({
  form,
  campo,
  label,
  className = "flex flex-col flex-wrap",
  nameRelation,
}: Props<T>) => {
  const [open, setOpen] = useState(false);
  const { searchData, items } = useListData<Campos>(
    getListBarrios,
    "list-barrios"
  );

  const relation: Campos = nameRelation
    ? form.watch(nameRelation)
    : ({} as Campos);

  const setDefaultData = (
    field: ControllerRenderProps<T, Path<T>>
  ): string | undefined => {
    if (relation?.name) {
      return relation.name;
    }
    return field.value
      ? items.find((item) => item.id === parseInt(field.value.toString()))?.name
      : "Barrios";
  };

  return (
    <FormField
      control={form.control}
      name={campo}
      render={({ field }) => (
        <FormItem className={className}>
          {label && <FormLabel className="mr-1">{label} </FormLabel>}
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "w-full justify-between border-list",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {setDefaultData(field)}
                  <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height]">
              <Command className="w-full">
                <CommandInput
                  placeholder="Buscar..."
                  onKeyUp={(e) => searchData(e.currentTarget.value)}
                  className="h-9 w-full"
                />
                <CommandList>
                  <CommandEmpty>No se encontro el registro</CommandEmpty>
                  <CommandGroup>
                    {items.map((item: Barrio) => (
                      <CommandItem
                        className={cn(
                          "transition-all duration-200 ",
                          item.id === field.value
                            ? " text-white font-bold bg-blue-700"
                            : ""
                        )}
                        value={removeTilde(item.name)}
                        key={item.id}
                        onSelect={() => {
                          setOpen(false);
                          form.setValue(
                            campo,
                            item.id as PathValue<T, Path<T>>
                          );
                          if (nameRelation) {
                            form.setValue(
                              nameRelation,
                              item as PathValue<T, Path<T>>
                            );
                          }
                        }}
                      >
                        <div className="flex flex-col">
                          <div className="text-xl">
                            {removeTilde(item.name)}
                          </div>
                          <div className="flex flex-row gap-2">
                            <div>{item.zonaGeografica?.name},</div>
                            <div>{item.municipio?.name},</div>
                            <div>{item.municipio?.departamento?.name},</div>
                            <div>
                              {item.municipio?.departamento?.pais?.name}
                            </div>
                          </div>
                        </div>
                        <CheckCircledIcon
                          className={cn(
                            "ml-auto h-4 w-4",
                            item.id === field.value
                              ? "opacity-100 text-white font-bold bg-blue-500 rounded-lg"
                              : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
