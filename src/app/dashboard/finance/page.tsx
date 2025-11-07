"use client";

import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DataTable, { type Column } from "@/components/dashboard/DataTable";
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
import {
  Plus,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Pencil,
  Trash2,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Transaction {
  id: number;
  date: Date;
  category: string;
  amount: number;
  description: string;
  type: "Entrada" | "Saída";
}

type NewType = "entrada" | "saida";

interface FinanceSummary {
  totalIncome: number;
  totalExpense: number;
  balance: number;
}

export default function FinancePage() {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [transactionType, setTransactionType] = useState<NewType>("entrada");

  const [summary, setSummary] = useState<FinanceSummary>({
    totalIncome: 45250.0,
    totalExpense: 12800.0,
    balance: 32450.0,
  });

  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: 1,
      date: new Date("2024-11-01"),
      category: "Dízimo",
      amount: 3500.0,
      description: "Dízimos do mês",
      type: "Entrada",
    },
    {
      id: 2,
      date: new Date("2024-11-05"),
      category: "Oferta",
      amount: 1200.0,
      description: "Ofertas de missões",
      type: "Entrada",
    },
    {
      id: 3,
      date: new Date("2024-11-10"),
      category: "Despesa",
      amount: 850.0,
      description: "Conta de luz",
      type: "Saída",
    },
    {
      id: 4,
      date: new Date("2024-11-12"),
      category: "Evento",
      amount: 2400.0,
      description: "Inscrições Retiro de Jovens",
      type: "Entrada",
    },
  ]);

  function handleEdit(tx: Transaction) {
    setEditingTransaction(tx);
    setIsEditMode(true);
    setTransactionType(tx.type === "Entrada" ? "entrada" : "saida");
    setIsDialogOpen(true);
  }

  function handleDelete(id: number) {
    const tx = transactions.find((t) => t.id === id);
    if (tx) {
      setTransactions((prev) => prev.filter((t) => t.id !== id));
      if (tx.type === "Entrada") {
        setSummary((prev) => ({
          ...prev,
          totalIncome: prev.totalIncome - tx.amount,
          balance: prev.balance - tx.amount,
        }));
      } else {
        setSummary((prev) => ({
          ...prev,
          totalExpense: prev.totalExpense - tx.amount,
          balance: prev.balance + tx.amount,
        }));
      }
    }
    setDeleteId(null);
    toast({ title: "✅ Registro removido com sucesso!" });
  }

  function handleSubmit() {
    if (isEditMode && editingTransaction) {
      setTransactions((prev) =>
        prev.map((t) => (t.id === editingTransaction.id ? editingTransaction : t)),
      );
      toast({ title: "✅ Registro atualizado com sucesso!" });
    } else {
      const newTransaction: Transaction = {
        id: transactions.length + 1,
        date: new Date(),
        category: transactionType === "entrada" ? "Dízimo" : "Despesa",
        amount: 0,
        description: "Nova transação",
        type: transactionType === "entrada" ? "Entrada" : "Saída",
      };
      setTransactions((prev) => [...prev, newTransaction]);
      toast({ title: "✅ Registro cadastrado com sucesso!" });
    }
    setIsDialogOpen(false);
    setIsEditMode(false);
    setEditingTransaction(null);
  }

  function getTypeBadge(type: Transaction["type"]) {
    return type === "Entrada" ? (
      <Badge variant="default" className="bg-green-600">
        Entrada
      </Badge>
    ) : (
      <Badge variant="destructive">Saída</Badge>
    );
  }

  const columns: Column<Transaction>[] = [
    {
      header: "Data",
      accessor: "date",
      cell: (value) => format(value as Date, "dd/MM/yyyy", { locale: ptBR }),
    },
    { header: "Categoria", accessor: "category" },
    {
      header: "Valor",
      accessor: "amount",
      cell: (value, row) => {
        const v = value as number;
        const r = row as Transaction;
        const plus = r.type === "Entrada";
        return (
          <span className={`${plus ? "text-green-600" : "text-red-600"} font-semibold`}>
            {plus ? "+" : "-"} R$ {v.toFixed(2)}
          </span>
        );
      },
    },
    { header: "Descrição", accessor: "description" },
    {
      header: "Tipo",
      accessor: "type",
      cell: (value) => getTypeBadge(value as Transaction["type"]),
    },
    {
      header: "Ações",
      accessor: "id",
      cell: (_value, row) => {
        const r = row as Transaction;
        return (
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" onClick={() => handleEdit(r)}>
              <Pencil className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setDeleteId(r.id)}>
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <DashboardLayout
      title="Gestão Financeira"
      subtitle="Controle entradas e saídas da igreja"
      breadcrumbs={[
        { label: "Dashboard", href: "/dashboard" },
        { label: "Gestão Financeira" },
      ]}
      action={
        <Dialog
          open={isDialogOpen}
          onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) {
              setIsEditMode(false);
              setEditingTransaction(null);
              setTransactionType("entrada");
            }
          }}
        >
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Novo Registro
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {isEditMode ? "Editar Registro" : "Cadastrar Novo Registro Financeiro"}
              </DialogTitle>
            </DialogHeader>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="type">Tipo *</Label>
                <Select
                  value={transactionType}
                  onValueChange={(value: NewType) => setTransactionType(value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="entrada">Entrada</SelectItem>
                    <SelectItem value="saida">Saída</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="category">Categoria *</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {transactionType === "entrada" ? (
                      <>
                        <SelectItem value="dizimo">Dízimo</SelectItem>
                        <SelectItem value="oferta">Oferta</SelectItem>
                        <SelectItem value="evento">Evento</SelectItem>
                        <SelectItem value="doacao">Doação</SelectItem>
                      </>
                    ) : (
                      <>
                        <SelectItem value="aluguel">Aluguel</SelectItem>
                        <SelectItem value="luz">Conta de Luz</SelectItem>
                        <SelectItem value="agua">Conta de Água</SelectItem>
                        <SelectItem value="manutencao">Manutenção</SelectItem>
                        <SelectItem value="evento">Evento</SelectItem>
                        <SelectItem value="outros">Outros</SelectItem>
                      </>
                    )}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="amount">Valor (R$) *</Label>
                <Input id="amount" type="number" min="0" step="0.01" placeholder="0.00" />
              </div>
              <div>
                <Label htmlFor="date">Data *</Label>
                <Input id="date" type="date" />
              </div>
              <div className="col-span-2">
                <Label htmlFor="description">Observações *</Label>
                <Textarea id="description" placeholder="Descrição do registro" rows={3} />
              </div>
            </div>

            <div className="mt-4 flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setIsDialogOpen(false);
                  setIsEditMode(false);
                  setEditingTransaction(null);
                  setTransactionType("entrada");
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
      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir este registro? Esta ação não poderá ser desfeita.
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

      {/* Summary Cards */}
      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Entradas</CardTitle>
            <TrendingUp className="h-5 w-5 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              R$ {summary.totalIncome.toFixed(2)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Saídas</CardTitle>
            <TrendingDown className="h-5 w-5 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              R$ {summary.totalExpense.toFixed(2)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saldo Atual</CardTitle>
            <DollarSign className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              R$ {summary.balance.toFixed(2)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Filtrar por mês" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="11-2024">Novembro 2024</SelectItem>
            <SelectItem value="10-2024">Outubro 2024</SelectItem>
            <SelectItem value="09-2024">Setembro 2024</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Filtrar por categoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todas</SelectItem>
            <SelectItem value="dizimo">Dízimo</SelectItem>
            <SelectItem value="oferta">Oferta</SelectItem>
            <SelectItem value="evento">Evento</SelectItem>
            <SelectItem value="despesa">Despesa</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <DataTable<Transaction>
        columns={columns}
        data={transactions}
        mobileCard={(row) => (
          <div className="space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold">{row.category}</h3>
                <p className="text-sm text-muted-foreground">
                  {format(row.date, "dd/MM/yyyy", { locale: ptBR })}
                </p>
              </div>
              {getTypeBadge(row.type)}
            </div>

            <div className="space-y-1">
              <p
                className={`text-xl font-bold ${
                  row.type === "Entrada" ? "text-green-600" : "text-red-600"
                }`}
              >
                {row.type === "Entrada" ? "+" : "-"} R$ {row.amount.toFixed(2)}
              </p>
              <p className="text-sm text-muted-foreground">{row.description}</p>
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
