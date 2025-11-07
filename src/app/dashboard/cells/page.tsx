'use client';

import { useMemo, useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DataTable from "@/components/dashboard/DataTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search, Pencil, Trash2, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { ReactNode } from "react";

/** ===== Tipagens ===== */
type CellRow = {
  id: number;
  name: string;
  day: string;
  time: string;
  neighborhood: string;
  leader: string;
  phone: string;
  participants: number;
};

type Column<T> = {
  header: string;
  /** chave do objeto T usada como base da coluna */
  accessor: keyof T;
  /** renderizador opcional para a célula */
  cell?: (value: T[keyof T], row: T) => ReactNode;
};

/** Se o seu DataTable for genérico, ótimo: <DataTable<CellRow> ... />
 * Caso não seja, ainda assim manteremos sua chamada tipada do nosso lado. */

export default function CellsPage() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const cells: CellRow[] = useMemo(
    () => [
      {
        id: 1,
        name: "Videira",
        day: "Terça-feira",
        time: "20h30",
        neighborhood: "Campo Grande",
        leader: "Thiago & Jéssica",
        phone: "(21) 98765-4321",
        participants: 12,
      },
      {
        id: 2,
        name: "Acácia",
        day: "Quinta-feira",
        time: "19h30",
        neighborhood: "Tijuca",
        leader: "Carlos & Ana",
        phone: "(21) 99876-5432",
        participants: 15,
      },
      {
        id: 3,
        name: "Oliveira",
        day: "Sexta-feira",
        time: "20h00",
        neighborhood: "Barra da Tijuca",
        leader: "Pedro & Maria",
        phone: "(21) 97654-3210",
        participants: 10,
      },
    ],
    []
  );

  const columns = [
    { header: "Nome", accessor: "name" },
    {
      header: "Dia e Hora",
      accessor: "day",
      cell: (_value, row) => `${row.day} às ${row.time}`,
    },
    { header: "Bairro", accessor: "neighborhood" },
    { header: "Líder", accessor: "leader" },
    { header: "Participantes", accessor: "participants" },
    {
      header: "WhatsApp",
      accessor: "phone",
      cell: (value) => {
        const phone = String(value).replace(/\D/g, "");
        const openWhatsApp = () => window.open(`https://wa.me/55${phone}`, "_blank", "noopener,noreferrer");
        return (
          <Button variant="outline" size="sm" onClick={openWhatsApp}>
            <MessageCircle className="mr-2 h-4 w-4" />
            Contatar
          </Button>
        );
      },
    },
    {
      header: "Ações",
      accessor: "id",
      cell: () => (
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" aria-label="Editar célula">
            <Pencil className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Excluir célula">
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        </div>
      ),
    },
  ] satisfies Column<CellRow>[];

  const filtered: CellRow[] = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return cells;
    return cells.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.neighborhood.toLowerCase().includes(q)
    );
  }, [cells, searchTerm]);

  return (
    <DashboardLayout
      title="Gestão de Células"
      subtitle="Administre as células da igreja e seus líderes"
      breadcrumbs={[
        { label: "Dashboard", href: "/dashboard" },
        { label: "Gestão de Células" },
      ]}
      action={
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nova Célula
            </Button>
          </DialogTrigger>

          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Cadastrar Nova Célula</DialogTitle>
            </DialogHeader>

            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Label htmlFor="cellName">Nome da Célula *</Label>
                <Input id="cellName" placeholder="Ex: Videira" />
              </div>

              <div>
                <Label htmlFor="day">Dia da Semana *</Label>
                <Select>
                  <SelectTrigger id="day">
                    <SelectValue placeholder="Selecione o dia" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="segunda">Segunda-feira</SelectItem>
                    <SelectItem value="terca">Terça-feira</SelectItem>
                    <SelectItem value="quarta">Quarta-feira</SelectItem>
                    <SelectItem value="quinta">Quinta-feira</SelectItem>
                    <SelectItem value="sexta">Sexta-feira</SelectItem>
                    <SelectItem value="sabado">Sábado</SelectItem>
                    <SelectItem value="domingo">Domingo</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="time">Horário *</Label>
                <Input id="time" type="time" />
              </div>

              <div>
                <Label htmlFor="neighborhood">Bairro / Local *</Label>
                <Input id="neighborhood" placeholder="Ex: Campo Grande" />
              </div>

              <div>
                <Label htmlFor="leader">Líder *</Label>
                <Select>
                  <SelectTrigger id="leader">
                    <SelectValue placeholder="Selecione o líder" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="thiago">Thiago & Jéssica</SelectItem>
                    <SelectItem value="carlos">Carlos & Ana</SelectItem>
                    <SelectItem value="pedro">Pedro & Maria</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="col-span-2">
                <Label htmlFor="address">Endereço Completo</Label>
                <Input id="address" placeholder="Rua, número, complemento" />
              </div>
            </div>

            <div className="mt-4 flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancelar
              </Button>
              <Button
                onClick={() => {
                  toast({ title: "Célula cadastrada com sucesso!" });
                  setIsDialogOpen(false);
                }}
              >
                Salvar
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      }
    >
      {/* Busca */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="text-muted-foreground absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
          <Input
            placeholder="Buscar célula por nome ou bairro..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>
      <DataTable<CellRow> columns={columns} data={filtered} />
    </DashboardLayout>
  );
}
