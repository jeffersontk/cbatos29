"use client";

import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DataTable, { type Column } from "@/components/dashboard/DataTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { Plus, Search, Pencil, Trash2, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type MemberStatus = "Ativo" | "Visitante" | "Novo Convertido";
type StatusFilter = "todos" | "ativo" | "visitante" | "novo";

interface Member {
  id: number;
  name: string;
  age: number;
  phone: string;
  cell: string;
  ministry: string;
  status: MemberStatus;
  email?: string;
  birthdate?: string;
  observations?: string;
}

export default function MembersPage() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("todos");
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const [members, setMembers] = useState<Member[]>([
    {
      id: 1,
      name: "Maria Silva",
      age: 32,
      phone: "(21) 98765-4321",
      cell: "Videira",
      ministry: "Louvor, Intercessão",
      status: "Ativo",
    },
    {
      id: 2,
      name: "João Pereira",
      age: 45,
      phone: "(21) 99876-5432",
      cell: "Acácia",
      ministry: "Atos de Homens",
      status: "Ativo",
    },
    {
      id: 3,
      name: "Ana Rodrigues",
      age: 28,
      phone: "(21) 97654-3210",
      cell: "Oliveira",
      ministry: "Kids",
      status: "Visitante",
    },
  ]);

  const getStatusBadge = (status: MemberStatus) => {
    const variants: Record<MemberStatus, "default" | "secondary" | "outline"> = {
      Ativo: "default",
      Visitante: "secondary",
      "Novo Convertido": "outline",
    };
    return <Badge variant={variants[status]}>{status}</Badge>;
  };

  const handleEdit = (member: Member) => {
    setEditingMember(member);
    setIsEditMode(true);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    setMembers((prev) => prev.filter((m) => m.id !== id));
    setDeleteId(null);
    toast({ title: "✅ Membro removido com sucesso!" });
  };

  const handleSubmit = () => {
    if (isEditMode && editingMember) {
      setMembers((prev) => prev.map((m) => (m.id === editingMember.id ? editingMember : m)));
      toast({ title: "✅ Membro atualizado com sucesso!" });
    } else {
      const newMember: Member = {
        id: members.length + 1,
        name: "Novo Membro",
        age: 30,
        phone: "(21) 99999-9999",
        cell: "Videira",
        ministry: "Louvor",
        status: "Ativo",
      };
      setMembers((prev) => [...prev, newMember]);
      toast({ title: "✅ Membro cadastrado com sucesso!" });
    }
    setIsDialogOpen(false);
    setIsEditMode(false);
    setEditingMember(null);
  };

  const handleExportCSV = () => {
    const csv = [
      ["Nome", "Idade", "Telefone", "Célula", "Ministério", "Status"],
      ...members.map((m) => [m.name, String(m.age), m.phone, m.cell, m.ministry, m.status]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `membros-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();

    toast({
      title: "✅ Dados exportados",
      description: "O arquivo CSV foi baixado com sucesso.",
    });
  };

  const columns: Column<Member>[] = [
    { header: "Nome", accessor: "name" },
    { header: "Idade", accessor: "age" },
    { header: "Telefone", accessor: "phone" },
    { header: "Célula", accessor: "cell" },
    { header: "Ministério", accessor: "ministry" },
    {
      header: "Status",
      accessor: "status",
      cell: (value) => getStatusBadge(value as MemberStatus),
    },
    {
      header: "Ações",
      accessor: "id",
      cell: (_value, row) => {
        const r = row as Member;
        return (
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" onClick={() => handleEdit(r)}>
              <Pencil className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setDeleteId(r.id)}>
              <Trash2 className="w-4 h-4 text-destructive" />
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <DashboardLayout
      title="Gestão de Membros"
      subtitle="Gerencie informações dos membros da igreja"
      breadcrumbs={[
        { label: "Dashboard", href: "/dashboard" },
        { label: "Gestão de Membros" },
      ]}
      action={
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExportCSV}>
            <Download className="mr-2 h-4 w-4" />
            Exportar CSV
          </Button>

          <Dialog
            open={isDialogOpen}
            onOpenChange={(open) => {
              setIsDialogOpen(open);
              if (!open) {
                setIsEditMode(false);
                setEditingMember(null);
              }
            }}
          >
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Novo Membro
              </Button>
            </DialogTrigger>

            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>{isEditMode ? "Editar Membro" : "Cadastrar Novo Membro"}</DialogTitle>
              </DialogHeader>

              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <Label htmlFor="name">Nome Completo *</Label>
                  <Input id="name" placeholder="Digite o nome completo" />
                </div>
                <div>
                  <Label htmlFor="birthdate">Data de Nascimento *</Label>
                  <Input id="birthdate" type="date" />
                </div>
                <div>
                  <Label htmlFor="phone">Telefone / WhatsApp *</Label>
                  <Input id="phone" placeholder="(21) 99999-9999" />
                </div>
                <div>
                  <Label htmlFor="email">E-mail</Label>
                  <Input id="email" type="email" placeholder="email@exemplo.com" />
                </div>
                <div>
                  <Label htmlFor="cell">Célula</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma célula" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="videira">Videira</SelectItem>
                      <SelectItem value="acacia">Acácia</SelectItem>
                      <SelectItem value="oliveira">Oliveira</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="ministry">Ministério</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um ministério" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="louvor">Louvor</SelectItem>
                      <SelectItem value="intercessao">Intercessão</SelectItem>
                      <SelectItem value="kids">Kids</SelectItem>
                      <SelectItem value="jovens">Jovens</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="status">Status *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ativo">Ativo</SelectItem>
                      <SelectItem value="visitante">Visitante</SelectItem>
                      <SelectItem value="novo">Novo Convertido</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-2">
                  <Label htmlFor="observations">Observações</Label>
                  <Textarea id="observations" placeholder="Informações adicionais" rows={3} />
                </div>
              </div>

              <div className="mt-4 flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsDialogOpen(false);
                    setIsEditMode(false);
                    setEditingMember(null);
                  }}
                >
                  Cancelar
                </Button>
                <Button onClick={handleSubmit}>{isEditMode ? "Atualizar" : "Salvar"}</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      }
    >
      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir este membro? Esta ação não poderá ser desfeita.
            </AlertDialogDescription>
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

      {/* Filters */}
      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar por nome..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <Select value={statusFilter} onValueChange={(v: StatusFilter) => setStatusFilter(v)}>
          <SelectTrigger>
            <SelectValue placeholder="Filtrar por status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos</SelectItem>
            <SelectItem value="ativo">Ativo</SelectItem>
            <SelectItem value="visitante">Visitante</SelectItem>
            <SelectItem value="novo">Novo Convertido</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Filtrar por célula" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todas">Todas</SelectItem>
            <SelectItem value="videira">Videira</SelectItem>
            <SelectItem value="acacia">Acácia</SelectItem>
            <SelectItem value="oliveira">Oliveira</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <DataTable<Member>
        columns={columns}
        data={members}
        mobileCard={(row) => (
          <div className="space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold">{row.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {row.age} anos | {row.cell}
                </p>
              </div>
              {getStatusBadge(row.status)}
            </div>
            <div className="space-y-1 text-sm">
              <p>
                <span className="font-medium">Telefone:</span> {row.phone}
              </p>
              <p>
                <span className="font-medium">Ministério:</span> {row.ministry}
              </p>
            </div>
            <div className="flex gap-2 border-t pt-2">
              <Button variant="outline" size="sm" className="flex-1" onClick={() => handleEdit(row)}>
                <Pencil className="mr-2 h-4 w-4" />
                Editar
              </Button>
              <Button variant="outline" size="sm" className="flex-1" onClick={() => setDeleteId(row.id)}>
                <Trash2 className="mr-2 h-4 w-4 text-destructive" />
                Excluir
              </Button>
            </div>
          </div>
        )}
      />
    </DashboardLayout>
  );
}
