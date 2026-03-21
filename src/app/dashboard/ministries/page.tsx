import { HandHeart, UsersRound, Wrench } from "lucide-react";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import KpiCard from "@/components/dashboard/KpiCard";
import StatusBadge from "@/components/dashboard/StatusBadge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ministryInterests, ministryOpportunities } from "@/lib/platform/data";

export default function MinistriesPage() {
  return (
    <DashboardLayout
      title="Ministerios"
      subtitle="Vagas, interesses e acompanhamento das equipes."
      actions={[
        { label: "Membros", href: "/dashboard/members", variant: "outline" },
        { label: "Eventos", href: "/dashboard/events", variant: "secondary" },
      ]}
    >
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <KpiCard title="Frentes abertas" value={String(ministryOpportunities.length)} helper="Equipes prontas para receber gente." icon={UsersRound} />
        <KpiCard title="Interesses" value={String(ministryInterests.length)} helper="Pedidos aguardando retorno." icon={HandHeart} />
        <KpiCard
          title="Vagas em aberto"
          value={String(ministryOpportunities.reduce((acc, item) => acc + item.openRoles.length, 0))}
          helper="Funcoes disponiveis para novos voluntarios."
          icon={Wrench}
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.1fr_1fr]">
        <Card className="border-border/70">
          <CardHeader>
            <CardTitle className="text-xl">Frentes disponiveis</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {ministryOpportunities.map((opportunity) => (
              <div key={opportunity.id} className="rounded-2xl border border-border/70 bg-background p-4">
                <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="font-semibold text-foreground">{opportunity.name}</p>
                    <p className="text-sm text-muted-foreground">{opportunity.coordinator}</p>
                  </div>
                  <StatusBadge label={`${opportunity.interestedCount} interessados`} tone="info" />
                </div>
                <p className="text-sm text-muted-foreground">{opportunity.description}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {opportunity.openRoles.map((role) => (
                    <StatusBadge key={role} label={role} tone="neutral" />
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-border/70">
          <CardHeader>
            <CardTitle className="text-xl">Acompanhamento</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {ministryInterests.map((interest) => (
              <div key={interest.id} className="rounded-2xl border border-border/70 bg-background p-4">
                <div className="mb-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className="font-semibold text-foreground">{interest.memberName}</p>
                  <StatusBadge label={interest.status} tone={interest.status === "Integrado" ? "success" : interest.status === "Em conversa" ? "warning" : "info"} />
                </div>
                <p className="text-sm text-muted-foreground">{interest.ministry}</p>
                <p className="mt-2 text-xs text-muted-foreground">Disponibilidade: {interest.availability}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </DashboardLayout>
  );
}
