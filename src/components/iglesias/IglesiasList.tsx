"use client";

import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "sonner";
import { IglesiaDialog } from "./IglesiaDialog";
import { deleteIglesia } from "@/actions";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

interface Props {
  iglesias: any[];
}

export const IglesiasList = ({ iglesias }: Props) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedIglesia, setSelectedIglesia] = useState<any>(null);

  const handleEdit = (iglesia: any) => {
    setSelectedIglesia(iglesia);
    setIsDialogOpen(true);
  };

  const handleAdd = () => {
    setSelectedIglesia(null);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("¿Estás seguro de que deseas eliminar esta iglesia?")) {
      try {
        await deleteIglesia(id);
        toast.success("Iglesia eliminada correctamente");
      } catch (error) {
        console.error(error);
        toast.error("Error al eliminar la iglesia");
      }
    }
  };

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Button onClick={handleAdd} className="btn-primary">
          Agregar Iglesia
        </Button>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Dirección</TableHead>
              <TableHead>Teléfonos</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {iglesias.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center h-24">
                  No hay iglesias registradas.
                </TableCell>
              </TableRow>
            ) : (
              iglesias.map(iglesia => (
                <TableRow key={iglesia.id}>
                  <TableCell className="font-medium">{iglesia.name}</TableCell>
                  <TableCell>{iglesia.email}</TableCell>
                  <TableCell>{iglesia.direccion}</TableCell>
                  <TableCell>{iglesia.telefonos}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleEdit(iglesia)}
                        title="Editar"
                      >
                        <FaEdit className="text-blue-500" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleDelete(iglesia.id)}
                        title="Eliminar"
                      >
                        <FaTrash className="text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {isDialogOpen && (
        <IglesiaDialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          iglesia={selectedIglesia}
        />
      )}
    </div>
  );
};
