'use client';

import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DataTable, { Column } from "@/components/dashboard/DataTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Plus, Pencil, Trash2, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

type EventStatus = "Ativo" | "Encerrado";

interface Event {
  id: number;
  title: string;
  date: Date;
  location: string;
  price: number;
  slots: number;
  enrolled: number;
  status: EventStatus;
}

export default function EventsPage() {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const [events, setEvents] = useState<Event[]>([
    {
      id: 1,
      title: "Retiro de Jovens 2024",
      date: new Date("2024-12-15"),
      location: "Sítio Esperança",
      price: 150,
      slots: 50,
      enrolled: 32,
      status: "Ativo",
    },
    {
      id: 2,
      title: "Congresso de Missões",
      date: new Date("2024-11-20"),
      location: "Igreja Central",
      price: 0,
      slots: 200,
      enrolled: 145,
      status: "Ativo",
    },
    {
      id: 3,
      title: "Acampamento de Crianças",
      date: new Date("2024-10-10"),
      location: "Camping Alegria",
      price: 80,
      slots: 30,
      enrolled: 30,
      status: "Encerrado",
    },
  ]);

  const handleEdit = (event: Event) => {
    setEditingEvent(event);
    setIsEditMode(true);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
    setDeleteId(null);
    toast({ title: "✅ Evento removido com sucesso!" });
  };

  const handleSubmit = () => {
    if (isEditMode && editingEvent) {
      setEvents((prev) => prev.map((e) => (e.id === editingEvent.id ? editingEvent : e)));
      toast({ title: "✅ Evento atualizado com sucesso!" });
    } else {
      const newEvent: Event = {
        id: events.length + 1,
        title: "Novo Evento",
        date: new Date(),
        location: "Igreja Central",
        price: 0,
        slots: 50,
        enrolled: 0,
        status: "Ativo",
      };
      setEvents((prev) => [...prev, newEvent]);
      toast({ title: "✅ Evento cadastrado com sucesso!" });
    }
    setIsDialogOpen(false);
    setIsEditMode(false);
    setEditingEvent(null);
  };

  const getStatusBadge = (status: EventStatus) =>
    status === "Ativo" ? <Badge variant="default">Ativo</Badge> : <Badge variant="secondary">Encerrado</Badge>;

  const columns: Column<Event>[] = [
    { header: "Título", accessor: "title" },
    {
      header: "Data",
      accessor: "date",
      cell: (value) => format(value as Date, "dd/MM/yyyy", { locale: ptBR }),
    },
    { header: "Local", accessor: "location" },
    {
      header: "Valor",
      accessor: "price",
      cell: (value) => {
        const v = value as number;
        return v === 0 ? "Gratuito" : `R$ ${v.toFixed(2)}`;
      },
    },
    {
      header: "Vagas",
      accessor: "slots",
      cell: (_value, row) => `${row.enrolled}/${row.slots}`,
    },
    {
      header: "Status",
      accessor: "status",
      cell: (value) => getStatusBadge(value as EventStatus),
    },
    {
      header: "Ações",
      accessor: "id",
      cell: (_value, row) => (
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Users className="mr-2 h-4 w-4" />
            Inscritos
          </Button>
          <Button variant="ghost" size="icon" onClick={() => handleEdit(row)}>
            <Pencil className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setDeleteId(row.id)}>
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <DashboardLayout
      title="Gestão de Eventos"
      subtitle="Crie, edite e acompanhe eventos da igreja"
      breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Gestão de Eventos" }]}
      action={
        <Dialog
          open={isDialogOpen}
          onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) {
              setIsEditMode(false);
              setEditingEvent(null);
            }
          }}
        >
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Novo Evento
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{isEditMode ? "Editar Evento" : "Cadastrar Novo Evento"}</DialogTitle>
            </DialogHeader>

            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Label htmlFor="eventTitle">Nome do Evento *</Label>
                <Input id="eventTitle" placeholder="Ex: Retiro de Jovens 2024" />
              </div>
              <div>
                <Label htmlFor="eventDate">Data *</Label>
                <Input id="eventDate" type="date" />
              </div>
              <div>
                <Label htmlFor="eventTime">Horário *</Label>
                <Input id="eventTime" type="time" />
              </div>
              <div>
                <Label htmlFor="eventLocation">Local *</Label>
                <Input id="eventLocation" placeholder="Ex: Igreja Central" />
              </div>
              <div>
                <Label htmlFor="eventPrice">Valor da Inscrição</Label>
                <Input id="eventPrice" type="number" min="0" step="0.01" placeholder="0.00" />
              </div>
              <div>
                <Label htmlFor="eventSlots">Número de Vagas</Label>
                <Input id="eventSlots" type="number" min="1" placeholder="Ex: 50" />
              </div>
              <div>
                <Label htmlFor="eventImage">Imagem do Evento (URL)</Label>
                <Input id="eventImage" type="url" placeholder="https://..." />
              </div>
              <div className="col-span-2">
                <Label htmlFor="eventDescription">Descrição *</Label>
                <Textarea id="eventDescription" placeholder="Descreva o evento, programação e informações importantes" rows={4} />
              </div>
            </div>

            <div className="mt-4 flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setIsDialogOpen(false);
                  setIsEditMode(false);
                  setEditingEvent(null);
                }}
              >
                Cancelar
              </Button>
              <Button onClick={handleSubmit}>{isEditMode ? "Atualizar" : "Salvar"}</Button>
            </div>
          </DialogContent>
        </Dialog>
      }
    >
      {/* Confirmação de exclusão */}
      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
            <AlertDialogDescription>Tem certeza que deseja excluir este evento? Esta ação não poderá ser desfeita.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteId && handleDelete(deleteId)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Tabela + cards mobile */}
      <DataTable<Event>
        columns={columns}
        data={events}
        mobileCard={(row) => (
          <div className="space-y-3">
            <div>
              <h3 className="text-lg font-semibold">{row.title}</h3>
              <p className="text-sm text-muted-foreground">
                {format(row.date, "dd/MM/yyyy", { locale: ptBR })} | {row.location}
              </p>
            </div>
            <div className="space-y-1 text-sm">
              <p>
                <span className="font-medium">Valor:</span> {row.price === 0 ? "Gratuito" : `R$ ${row.price.toFixed(2)}`}
              </p>
              <p>
                <span className="font-medium">Vagas:</span> {row.enrolled}/{row.slots}
              </p>
              <div className="flex items-center gap-2">
                <span className="font-medium">Status:</span>
                {getStatusBadge(row.status)}
              </div>
            </div>
            <div className="border-t pt-2 flex gap-2">
              <Button variant="outline" size="sm" className="flex-1">
                <Users className="mr-2 h-4 w-4" />
                Inscritos
              </Button>
              <Button variant="ghost" size="icon" onClick={() => handleEdit(row)}>
                <Pencil className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => setDeleteId(row.id)}>
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          </div>
        )}
      />
    </DashboardLayout>
  );
}
