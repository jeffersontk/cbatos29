import { CalendarDays, CakeSlice, Church, PackageCheck } from "lucide-react";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import KpiCard from "@/components/dashboard/KpiCard";
import StatusBadge from "@/components/dashboard/StatusBadge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { calendarEntries } from "@/lib/platform/data";

export default function CalendarPage() {
  const birthdayCount = calendarEntries.filter((entry) => entry.category === "Aniversario").length;
  const worshipCount = calendarEntries.filter((entry) => entry.category === "Culto").length;
  const eventCount = calendarEntries.filter((entry) => entry.category === "Evento").length;

  return (
    <DashboardLayout
      title="Calendario da igreja"
      subtitle="O calendario unifica cultos, EBD, aniversariantes, eventos e ate retiradas da loja para dar contexto a igreja inteira."
      actions={[
        { label: "Voltar aos eventos", href: "/dashboard/events", variant: "outline" },
        { label: "Calendario publico", href: "/calendar", variant: "secondary" },
      ]}
    >
      <section className="grid gap-4 md:grid-cols-3">
        <KpiCard title="Cultos no radar" value={String(worshipCount)} helper="Agenda oficial dos proximos encontros." icon={Church} />
        <KpiCard title="Eventos do periodo" value={String(eventCount)} helper="Acoes que exigem divulgacao e operacao." icon={CalendarDays} />
        <KpiCard title="Aniversariantes" value={String(birthdayCount)} helper="Pessoas para lembrar e celebrar como igreja." icon={CakeSlice} />
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        {calendarEntries.map((entry) => (
          <Card key={entry.id} className="border-border/70">
            <CardHeader className="flex flex-row items-start justify-between gap-4">
              <div className="space-y-2">
                <CardTitle className="text-xl">{entry.title}</CardTitle>
                <p className="text-sm text-muted-foreground">{entry.date}</p>
              </div>
              <StatusBadge
                label={entry.category}
                tone={entry.category === "Culto" ? "info" : entry.category === "Evento" ? "warning" : entry.category === "Retirada" ? "success" : "neutral"}
              />
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>Horario: {entry.time}</p>
              <p>{entry.details}</p>
              {entry.category === "Retirada" ? (
                <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-emerald-700">
                  <PackageCheck className="h-4 w-4" />
                  Centralizar retiradas aqui evita desencontro entre loja e operacao.
                </div>
              ) : null}
            </CardContent>
          </Card>
        ))}
      </section>
    </DashboardLayout>
  );
}
