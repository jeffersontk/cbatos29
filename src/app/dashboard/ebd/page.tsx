'use client';

import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DataTable, { type Column } from "@/components/dashboard/DataTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { Plus, Pencil, Trash2, FileText, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface EBDClass {
  id: number;
  name: string;
  teacher: string;
  ageRange: string;
  totalMeetings: number;
  enrolled: number;
}

export default function EBD() {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [editingClass, setEditingClass] = useState<EBDClass | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const [classes, setClasses] = useState<EBDClass[]>([
    { id: 1, name: "Fundamentos da Fé", teacher: "Pastor Marcos", ageRange: "Adultos", totalMeetings: 12, enrolled: 28 },
    { id: 2, name: "Primeiros Atos", teacher: "Ana Paula", ageRange: "Novos Convertidos", totalMeetings: 8,  enrolled: 15 },
    { id: 3, name: "Estudos Bíblicos Avançados", teacher: "João Silva", ageRange: "Adultos", totalMeetings: 16, enrolled: 22 },
    { id: 4, name: "Telos", teacher: "Carla Santos", ageRange: "Adolescentes", totalMeetings: 10, enrolled: 18 },
  ]);

  const handleEdit = (ebdClass: EBDClass) => {
    setEditingClass(ebdClass);
    setIsEditMode(true);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    setClasses(prev => prev.filter(c => c.id !== id));
    setDeleteId(null);
    toast({ title: "✅ Classe removida com sucesso!" });
  };

  const handleSubmit = () => {
    if (isEditMode && editingClass) {
      setClasses(prev => prev.map(c => (c.id === editingClass.id ? editingClass : c)));
      toast({ title: "✅ Classe atualizada com sucesso!" });
    } else {
      const newClass: EBDClass = {
        id: classes.length + 1,
        name: "Nova Classe",
        teacher: "Professor",
        ageRange: "Adultos",
        totalMeetings: 12,
        enrolled: 0,
      };
      setClasses(prev => [...prev, newClass]);
      toast({ title: "✅ Classe cadastrada com sucesso!" });
    }
    setIsDialogOpen(false);
    setIsEditMode(false);
    setEditingClass(null);
  };

  // Tipagem explícita das colunas
  const columns: Column<EBDClass>[] = [
    { header: "Nome da Classe", accessor: "name" },
    { header: "Professor", accessor: "teacher" },
    { header: "Faixa Etária", accessor: "ageRange" },
    { header: "Encontros", accessor: "totalMeetings" },
    { header: "Inscritos", accessor: "enrolled" },
    {
      header: "Ações",
      accessor: "id",
         cell: (_value: EBDClass[keyof EBDClass] | undefined, row: EBDClass) => (
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Users className="w-4 h-4 mr-2" />
            Alunos
          </Button>
          <Button variant="ghost" size="icon" onClick={() => handleEdit(row)}>
            <Pencil className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setDeleteId(row.id)}>
            <Trash2 className="w-4 h-4 text-destructive" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <DashboardLayout
      title="Gestão da EBD"
      subtitle="Gerencie classes, professores e alunos da Escola Bíblica Dominical"
      breadcrumbs={[
        { label: "Dashboard", href: "/dashboard" },
        { label: "Gestão da EBD" },
      ]}
      action={
        <div className="flex gap-2">
          <Button variant="outline">
            <FileText className="w-4 h-4 mr-2" />
            Relatórios
          </Button>
          <Dialog
            open={isDialogOpen}
            onOpenChange={(open: boolean) => {
              setIsDialogOpen(open);
              if (!open) {
                setIsEditMode(false);
                setEditingClass(null);
              }
            }}
          >
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Nova Classe
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>{isEditMode ? "Editar Classe" : "Cadastrar Nova Classe"}</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <Label htmlFor="className">Nome da Classe *</Label>
                  <Input id="className" placeholder="Ex: Fundamentos da Fé" />
                </div>
                <div>
                  <Label htmlFor="teacher">Professor Responsável *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o professor" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="marcos">Pastor Marcos</SelectItem>
                      <SelectItem value="ana">Ana Paula</SelectItem>
                      <SelectItem value="joao">João Silva</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="ageRange">Faixa Etária *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a faixa etária" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="criancas">Crianças</SelectItem>
                      <SelectItem value="adolescentes">Adolescentes</SelectItem>
                      <SelectItem value="jovens">Jovens</SelectItem>
                      <SelectItem value="adultos">Adultos</SelectItem>
                      <SelectItem value="novos">Novos Convertidos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="meetings">Quantidade de Encontros *</Label>
                  <Input id="meetings" type="number" min={1} placeholder="Ex: 12" />
                </div>
                <div>
                  <Label htmlFor="maxStudents">Máximo de Alunos</Label>
                  <Input id="maxStudents" type="number" min={1} placeholder="Ex: 30" />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="description">Descrição / Objetivos *</Label>
                  <Textarea id="description" placeholder="Descreva os objetivos e conteúdo da classe" rows={4} />
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsDialogOpen(false);
                    setIsEditMode(false);
                    setEditingClass(null);
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
      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir esta classe? Esta ação não poderá ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteId !== null && handleDelete(deleteId)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <DataTable<EBDClass>
        columns={columns}
        data={classes}
        mobileCard={(row) => (
          <div className="space-y-3">
            <div>
              <h3 className="font-semibold text-lg">{row.name}</h3>
              <p className="text-sm text-muted-foreground">Professor: {row.teacher}</p>
            </div>
            <div className="space-y-1 text-sm">
              <p><span className="font-medium">Faixa Etária:</span> {row.ageRange}</p>
              <p><span className="font-medium">Encontros:</span> {row.totalMeetings}</p>
              <p><span className="font-medium">Inscritos:</span> {row.enrolled}</p>
            </div>
            <div className="flex gap-2 pt-2 border-t">
              <Button variant="outline" size="sm" className="flex-1">
                <Users className="w-4 h-4 mr-2" />
                Alunos
              </Button>
              <Button variant="ghost" size="icon" onClick={() => handleEdit(row)}>
                <Pencil className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => setDeleteId(row.id)}>
                <Trash2 className="w-4 h-4 text-destructive" />
              </Button>
            </div>
          </div>
        )}
      />
    </DashboardLayout>
  );
}
