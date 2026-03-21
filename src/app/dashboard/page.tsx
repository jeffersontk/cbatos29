import { Calendar, GraduationCap, ShoppingBag, Sparkles, Users } from "lucide-react";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import KpiCard from "@/components/dashboard/KpiCard";
import StatusBadge from "@/components/dashboard/StatusBadge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ebdClasses, eventRegistrations, events, members, platformModules } from "@/lib/platform/data";

const metricIcons = [Users, GraduationCap, Sparkles, ShoppingBag];
const metricHelpers = [
  "Pessoas com cadastro e acompanhamento ativo.",
  "Turmas em andamento na igreja.",
  "Encontros com inscricoes abertas.",
  "Escalas confirmadas para os ministerios.",
];

const nextSteps = [
  { title: "Acesso", description: "Ajustar senha, recuperacao de conta e entrada dos membros." },
  { title: "Cadastros", description: "Continuar organizando membros, familias, celulas e inscricoes." },
  { title: "Pagamentos", description: "Concluir eventos pagos, loja e envio de comprovacoes." },
];

const dashboardMetrics = [
  { label: "Membros acompanhados", value: String(members.length) },
  { label: "Turmas da EBD", value: String(ebdClasses.length) },
  { label: "Eventos em aberto", value: String(events.length) },
  { label: "Escalas ativas", value: "4" },
];

export default function DashboardPage() {
  return (
    <DashboardLayout
      title="Painel da igreja"
      subtitle="Acompanhe membros, turmas, eventos e escalas em um so lugar."
      actions={[
        { label: "Calendario", href: "/dashboard/calendar", variant: "outline" },
        { label: "Membros", href: "/dashboard/members", variant: "secondary" },
      ]}
    >
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {dashboardMetrics.map((metric, index) => {
          const Icon = metricIcons[index];
          return <KpiCard key={metric.label} title={metric.label} value={metric.value} helper={metricHelpers[index]} icon={Icon} />;
        })}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <Card className="border-border/70">
          <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-2">
              <CardTitle className="text-xl">Areas em uso hoje</CardTitle>
              <p className="text-sm text-muted-foreground">Veja o que ja esta em uso hoje na igreja.</p>
            </div>
            <StatusBadge label="Em uso" tone="info" />
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            {platformModules.map((module) => (
              <div key={module.slug} className="rounded-2xl border border-border/70 bg-background p-4">
                <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <h3 className="font-semibold text-foreground">{module.title}</h3>
                  <StatusBadge
                    label={module.stage === "ativo" ? "Ativo" : module.stage === "planejado" ? "Planejado" : "Em breve"}
                    tone={module.stage === "ativo" ? "success" : module.stage === "planejado" ? "warning" : "neutral"}
                  />
                </div>
                <p className="text-sm text-muted-foreground">{module.description}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-border/70">
          <CardHeader>
            <CardTitle className="text-xl">Proximos ajustes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {nextSteps.map((item) => (
              <div key={item.title} className="rounded-2xl border border-border/70 bg-background p-4">
                <div className="mb-2 flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  <h3 className="font-semibold text-foreground">{item.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.2fr_1fr]">
        <Card className="border-border/70">
          <CardHeader>
            <CardTitle className="text-xl">Inscricoes recentes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {eventRegistrations.map((registration) => (
              <div
                key={registration.id}
                className="flex flex-col gap-3 rounded-2xl border border-border/70 bg-background p-4 md:flex-row md:items-center md:justify-between"
              >
                <div>
                  <p className="font-semibold text-foreground">{registration.memberName}</p>
                  <p className="text-sm text-muted-foreground">{registration.eventTitle}</p>
                  <p className="text-xs text-muted-foreground">Pedido em {registration.requestedAt}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <StatusBadge
                    label={registration.status}
                    tone={registration.status === "Confirmada" ? "success" : registration.status === "Pendente" ? "warning" : "neutral"}
                  />
                  <StatusBadge label={registration.paymentStatus} tone={registration.paymentStatus === "Pago" ? "success" : "info"} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-border/70 bg-primary text-primary-foreground">
          <CardHeader>
            <CardTitle className="text-xl">Neste momento</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-primary-foreground/90">
            <p>Membros, turmas, eventos e escalas ja podem ser acompanhados neste painel.</p>
            <p>O calendario segue publico para a igreja inteira.</p>
            <p>O financeiro completo ainda esta sendo organizado.</p>
          </CardContent>
        </Card>
      </section>
    </DashboardLayout>
  );
}
