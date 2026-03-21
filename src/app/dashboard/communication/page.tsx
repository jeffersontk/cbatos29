import { Bell, MessageSquare, Send } from "lucide-react";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import KpiCard from "@/components/dashboard/KpiCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CommunicationPage() {
  return (
    <DashboardLayout
      title="Comunicacao"
      subtitle="Avisos, lembretes e mensagens da igreja."
      actions={[{ label: "Painel", href: "/dashboard", variant: "outline" }]}
    >
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <KpiCard title="Campanhas" value="3" helper="Comunicacoes preparadas para esta semana." icon={Send} />
        <KpiCard title="Avisos da semana" value="7" helper="Lembretes de cultos, aulas e encontros." icon={Bell} />
        <KpiCard title="Canais ativos" value="4" helper="WhatsApp, email, portal e murais." icon={MessageSquare} />
      </section>

      <Card className="border-border/70">
        <CardHeader>
          <CardTitle className="text-xl">Usos mais urgentes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <p>Confirmacoes de inscricao em eventos.</p>
          <p>Lembretes de aula e envio de materiais da EBD.</p>
          <p>Mensagens para lideres, professores, voluntarios e membros.</p>
          <p>Avisos de retirada da loja e comunicados pastorais.</p>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
