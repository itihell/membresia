"use client";
import { cn } from "@/lib/utils";
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
import { useListFetchData } from "@/hooks";
import { Familia } from "@/interfaces";
import { getFamilias } from "@/actions";

type Props = {
  form: any;
  campo: string;
  label?: string | undefined;
  className?: string | undefined;
  nameRelation?: string;
};

export const ListFamilias = ({
  form,
  campo,
  label,
  className = "flex flex-col flex-wrap",
  nameRelation,
}: Props) => {
  const { searchData, store, removeTilde } = useListFetchData<Familia>(
    getFamilias,
    "list-personas"
  );

  const relation: Familia = form.watch(nameRelation);

  const items = store((state) => state.items);
  const open = store((state) => state.open);
  const setOpen = store((state) => state.setOpen);

  const setDefaultData = (field: any): string | undefined => {
    if (relation?.name) {
      return relation.name;
    } else {
      return field.value
        ? items.find((item) => item.id === field.value)?.name
        : "Seleccione la persona";
    }
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
                    "w-full justify-between",
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
                  className="h-9 w-full"
                  onKeyUp={(e) => searchData(e.currentTarget.value)}
                />
                <CommandList>
                  <CommandEmpty>No se encontro el registro</CommandEmpty>
                  <CommandGroup>
                    {items.map((item: Familia) => (
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
                          form.setValue(campo, item.id);
                          nameRelation && form.setValue(nameRelation, item);
                        }}
                      >
                        <div className="flex flex-col">
                          <div className="font-bold">{item.name} </div>
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
