import { Home, Map, UserRoundPlus } from "lucide-react";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import KpiCard from "@/components/dashboard/KpiCard";
import StatusBadge from "@/components/dashboard/StatusBadge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cellRequests, getCellCoverageSnapshot } from "@/lib/platform/data";

export default function CellsPage() {
  const cellCoverage = getCellCoverageSnapshot();
  const totalPeopleInCare = cellCoverage.reduce((acc, cell) => acc + cell.totalPeopleInCare, 0);
  const totalVacancies = cellCoverage.reduce((acc, cell) => acc + cell.vacancies, 0);

  return (
    <DashboardLayout
      title="Celulas"
      subtitle="Bairros, vagas e pedidos de abertura."
      actions={[
        { label: "Membros", href: "/dashboard/members", variant: "outline" },
        { label: "Calendario", href: "/dashboard/calendar", variant: "secondary" },
      ]}
    >
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <KpiCard title="Celulas ativas" value={String(cellCoverage.length)} helper="Grupos em funcionamento hoje." icon={Home} />
        <KpiCard title="Pessoas em cuidado" value={String(totalPeopleInCare)} helper="Membros e familiares acompanhados." icon={UserRoundPlus} />
        <KpiCard title="Vagas disponiveis" value={String(totalVacancies)} helper="Espaco para novos vinculos." icon={Map} />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.2fr_1fr]">
        <Card className="border-border/70">
          <CardHeader>
            <CardTitle className="text-xl">Mapa de celulas</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            {cellCoverage.map((cell) => (
              <div key={cell.id} className="rounded-2xl border border-border/70 bg-background p-4">
                <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="font-semibold text-foreground">{cell.name}</p>
                    <p className="text-sm text-muted-foreground">{cell.neighborhood}</p>
                  </div>
                  <StatusBadge label={`${cell.vacancies} vagas`} tone={cell.vacancies <= 3 ? "warning" : "success"} />
                </div>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p>{cell.leaders}</p>
                  <p>{cell.schedule}</p>
                  <p>{cell.members} membros cadastrados</p>
                  <p>{cell.householdLinkedCount} familiares vinculados</p>
                  <p>{cell.totalPeopleInCare} pessoas em cuidado</p>
                  <p>{cell.focus}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-border/70">
          <CardHeader>
            <CardTitle className="text-xl">Pedidos de abertura</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {cellRequests.map((request) => (
              <div key={request.id} className="rounded-2xl border border-border/70 bg-background p-4">
                <div className="mb-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className="font-semibold text-foreground">{request.neighborhood}</p>
                  <StatusBadge label={`${request.interestedPeople} interessados`} tone="info" />
                </div>
                <p className="text-sm text-muted-foreground">{request.status}</p>
                <p className="mt-2 text-xs text-muted-foreground">Possivel lider: {request.potentialLeader}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </DashboardLayout>
  );
}
