'use client';

import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Plus, Send, Pencil, Trash2, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

/** ===== Tipos ===== */
type Category = "Devocional" | "Evento" | "Geral";

interface Message {
  id: number;
  title: string;
  message: string;
  category: Category;
  date: Date;
  author: string;
}

export default function CommunicationPage() {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [editingMessage, setEditingMessage] = useState<Message | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      title: "Devocional Semanal",
      message: "Meditação sobre Salmos 23 - O Senhor é meu pastor...",
      category: "Devocional",
      date: new Date("2024-11-06"),
      author: "Pastor Marcos",
    },
    {
      id: 2,
      title: "Lembrete: Retiro de Jovens",
      message:
        "Não esqueça de confirmar sua inscrição para o retiro que acontecerá no próximo mês.",
      category: "Evento",
      date: new Date("2024-11-05"),
      author: "Líder Jovens",
    },
    {
      id: 3,
      title: "Reunião de Líderes",
      message: "Próxima reunião de líderes será dia 15/11 às 19h na igreja.",
      category: "Geral",
      date: new Date("2024-11-04"),
      author: "Secretaria",
    },
  ]);

  /** ===== Handlers ===== */
  const handleEdit = (message: Message) => {
    setEditingMessage(message);
    setIsEditMode(true);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    setMessages((prev) => prev.filter((m) => m.id !== id));
    setDeleteId(null);
    toast({ title: "✅ Aviso removido com sucesso!" });
  };

  const handleSubmit = () => {
    if (isEditMode && editingMessage) {
      setMessages((prev) =>
        prev.map((m) => (m.id === editingMessage.id ? editingMessage : m))
      );
      toast({ title: "✅ Aviso atualizado com sucesso!" });
    } else {
      const newMessage: Message = {
        id: messages.length + 1,
        title: "Novo Aviso",
        message: "Conteúdo do aviso",
        category: "Geral",
        date: new Date(),
        author: "Administração",
      };
      setMessages((prev) => [...prev, newMessage]);
      toast({ title: "✅ Aviso publicado com sucesso!" });
    }
    setIsDialogOpen(false);
    setIsEditMode(false);
    setEditingMessage(null);
  };

  /** ===== UI helpers ===== */
  const getCategoryBadge = (category: Category) => {
    const variants: Record<Category, "default" | "secondary" | "outline"> = {
      Devocional: "default",
      Evento: "secondary",
      Geral: "outline",
    };
    return <Badge variant={variants[category]}>{category}</Badge>;
  };

  return (
    <DashboardLayout
      title="Comunicação"
      subtitle="Central de comunicação interna da igreja"
      breadcrumbs={[
        { label: "Dashboard", href: "/dashboard" },
        { label: "Comunicação" },
      ]}
      action={
        <Dialog
          open={isDialogOpen}
          onOpenChange={(open: boolean) => {
            setIsDialogOpen(open);
            if (!open) {
              setIsEditMode(false);
              setEditingMessage(null);
            }
          }}
        >
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Novo Aviso
            </Button>
          </DialogTrigger>

          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {isEditMode ? "Editar Aviso" : "Criar Novo Aviso"}
              </DialogTitle>
            </DialogHeader>

            <div className="grid gap-4">
              <div>
                <Label htmlFor="title">Título *</Label>
                <Input
                  id="title"
                  placeholder="Ex: Devocional Semanal"
                  value={editingMessage?.title ?? ""}
                  onChange={(e) =>
                    setEditingMessage((prev) =>
                      prev ? { ...prev, title: e.target.value } : prev
                    )
                  }
                />
              </div>

              <div>
                <Label htmlFor="category">Categoria *</Label>
                <Select
                  value={editingMessage?.category ?? undefined}
                  onValueChange={(v: Category) =>
                    setEditingMessage((prev) =>
                      prev ? { ...prev, category: v } : prev
                    )
                  }
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Selecione a categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Devocional">Devocional</SelectItem>
                    <SelectItem value="Evento">Evento</SelectItem>
                    <SelectItem value="Geral">Geral</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="message">Mensagem *</Label>
                <Textarea
                  id="message"
                  placeholder="Escreva sua mensagem aqui..."
                  rows={6}
                  value={editingMessage?.message ?? ""}
                  onChange={(e) =>
                    setEditingMessage((prev) =>
                      prev ? { ...prev, message: e.target.value } : prev
                    )
                  }
                />
              </div>

              <div>
                <Label htmlFor="publishDate">Data de Publicação *</Label>
                <Input
                  id="publishDate"
                  type="date"
                  value={
                    editingMessage?.date
                      ? format(editingMessage.date, "yyyy-MM-dd")
                      : ""
                  }
                  onChange={(e) =>
                    setEditingMessage((prev) =>
                      prev
                        ? { ...prev, date: new Date(e.target.value) }
                        : prev
                    )
                  }
                />
              </div>

              <div className="rounded-lg bg-muted/50 p-4">
                <div className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-primary" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Enviar via WhatsApp</p>
                    <p className="text-xs text-muted-foreground">
                      Esta mensagem será enviada para os líderes via WhatsApp
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setIsDialogOpen(false);
                  setIsEditMode(false);
                  setEditingMessage(null);
                }}
              >
                Cancelar
              </Button>
              <Button onClick={handleSubmit}>
                <Send className="mr-2 h-4 w-4" />
                {isEditMode ? "Atualizar" : "Publicar"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      }
    >
      {/* Confirmação de exclusão */}
      <AlertDialog
        open={deleteId !== null}
        onOpenChange={(open: boolean) => {
          if (!open) setDeleteId(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir este aviso? Esta ação não poderá ser
              desfeita.
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

      {/* Lista de avisos */}
      <div className="space-y-4">
        {messages.map((message) => (
          <Card key={message.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-lg">{message.title}</CardTitle>
                    {getCategoryBadge(message.category)}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{message.author}</span>
                    <span>•</span>
                    <span>
                      {format(message.date, "dd 'de' MMMM, yyyy", {
                        locale: ptBR,
                      })}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Editar aviso"
                    onClick={() => handleEdit(message)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Excluir aviso"
                    onClick={() => setDeleteId(message.id)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{message.message}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
}
