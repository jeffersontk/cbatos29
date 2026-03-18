import { Calendar, GraduationCap, ShoppingBag, Sparkles, Users } from "lucide-react";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import KpiCard from "@/components/dashboard/KpiCard";
import StatusBadge from "@/components/dashboard/StatusBadge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { dashboardMetrics, eventRegistrations, platformModules, roadmap } from "@/lib/platform/data";

const metricIcons = [Users, GraduationCap, Sparkles, ShoppingBag];

export default function DashboardPage() {
  return (
    <DashboardLayout
      title="Visao geral da plataforma"
      subtitle="Este painel centraliza os modulos administrativos. O membro agora entra em um portal proprio, separado da gestao."
      actions={[
        { label: "Ver calendario", href: "/dashboard/calendar", variant: "outline" },
        { label: "Consumir API da plataforma", href: "/api/platform", variant: "secondary" },
      ]}
    >
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {dashboardMetrics.map((metric, index) => {
          const Icon = metricIcons[index];
          return <KpiCard key={metric.label} title={metric.label} value={metric.value} helper={metric.helper} icon={Icon} />;
        })}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <Card className="border-border/70">
          <CardHeader className="flex flex-row items-start justify-between gap-4">
            <div className="space-y-2">
              <CardTitle className="text-xl">Mapa dos modulos</CardTitle>
              <p className="text-sm text-muted-foreground">Escopo distribuido entre gestao, operacao da igreja e experiencia do membro.</p>
            </div>
            <StatusBadge label="Base unificada" tone="info" />
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            {platformModules.map((module) => (
              <div key={module.slug} className="rounded-2xl border border-border/70 bg-background p-4">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <h3 className="font-semibold text-foreground">{module.title}</h3>
                  <StatusBadge
                    label={module.stage === "ativo" ? "Pronto para evoluir" : module.stage === "planejado" ? "Planejado" : "Em breve"}
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
            <CardTitle className="text-xl">Prioridades tecnicas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {roadmap.map((item) => (
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
            <CardTitle className="text-xl">Fluxo de eventos em andamento</CardTitle>
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
                  <p className="text-xs text-muted-foreground">Solicitacao em {registration.requestedAt}</p>
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
            <CardTitle className="text-xl">Estado atual da separacao</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-primary-foreground/90">
            <p>Dashboard liberado conforme o conjunto de roles operacionais do usuario.</p>
            <p>Portal do membro separado com perfil, familia, celula, escalas, agenda e comprovacao de inscricoes.</p>
            <p>Proxima camada critica: persistencia real, uploads da EBD e pagamentos para eventos e loja.</p>
          </CardContent>
        </Card>
      </section>
    </DashboardLayout>
  );
}
