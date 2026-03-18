import { Bell, MessageSquare, Send } from "lucide-react";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import KpiCard from "@/components/dashboard/KpiCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CommunicationPage() {
  return (
    <DashboardLayout
      title="Comunicação da igreja"
      subtitle="Este módulo não estava no núcleo que você priorizou agora, mas ele aparece como apoio natural para eventos, EBD, células e integração."
      actions={[{ label: "Voltar à visão geral", href: "/dashboard", variant: "outline" }]}
    >
      <section className="grid gap-4 md:grid-cols-3">
        <KpiCard title="Campanhas" value="3" helper="Fluxos ligados a eventos, EBD e integração." icon={Send} />
        <KpiCard title="Avisos da semana" value="7" helper="Lembretes para cultos, aulas e retiradas." icon={Bell} />
        <KpiCard title="Canais ativos" value="4" helper="WhatsApp, e-mail, área do membro e murais." icon={MessageSquare} />
      </section>

      <Card className="border-border/70">
        <CardHeader>
          <CardTitle className="text-xl">Quando este módulo ganha prioridade</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <p>Notificações automáticas de inscrição em eventos.</p>
          <p>Lembretes de aula e distribuição de materiais da EBD.</p>
          <p>Mensagens segmentadas para líderes, professores, voluntários e membros.</p>
          <p>Confirmação de retirada da loja e avisos pastorais importantes.</p>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
