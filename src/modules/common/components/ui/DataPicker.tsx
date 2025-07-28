import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
interface Props {
  placeholder?: string;
  className?: string;
  label?: string;
  date?: Date | undefined | null;
  setDate?: (date: Date | undefined | null) => void;
}
export const DataPicker = ({ placeholder, label, date, setDate }: Props) => {
  const [open, setOpen] = useState(false);
  //const [date, setDate] = useState<Date | undefined>(undefined);
  return (
    <div className="flex flex-col gap-3">
      {label && <Label className="text-sm">{label}</Label>}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className="w-full justify-between font-normal border-list"
          >
            {date
              ? date.toLocaleDateString()
              : placeholder || "Seleccionar fecha"}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto overflow-hidden p-0 border-list"
          align="start"
        >
          <Calendar
            mode="single"
            selected={date ? date : undefined}
            captionLayout="dropdown"
            onSelect={date => {
              setDate?.(date);
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};
