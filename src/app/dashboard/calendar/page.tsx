import { CalendarDays, CakeSlice, Church, PackageCheck } from "lucide-react";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import KpiCard from "@/components/dashboard/KpiCard";
import StatusBadge from "@/components/dashboard/StatusBadge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { calendarEntries } from "@/lib/platform/data";

const monthMap: Record<string, number> = {
  janeiro: 0,
  fevereiro: 1,
  marco: 2,
  abril: 3,
  maio: 4,
  junho: 5,
  julho: 6,
  agosto: 7,
  setembro: 8,
  outubro: 9,
  novembro: 10,
  dezembro: 11,
};

function parsePtBrDate(date: string, time: string) {
  const match = date.match(/^(\d{2}) de ([a-z]+) de (\d{4})$/i);

  if (!match) {
    return Number.POSITIVE_INFINITY;
  }

  const [, day, monthLabel, year] = match;
  const month = monthMap[monthLabel.toLowerCase()];
  const [hours = "00", minutes = "00"] = time.replace("h", ":").split(":");

  return new Date(Number(year), month, Number(day), Number(hours), Number(minutes)).getTime();
}

export default function CalendarPage() {
  const sortedEntries = [...calendarEntries].sort((a, b) => parsePtBrDate(a.date, a.time) - parsePtBrDate(b.date, b.time));
  const birthdayCount = calendarEntries.filter((entry) => entry.category === "Aniversario").length;
  const worshipCount = calendarEntries.filter((entry) => entry.category === "Culto").length;
  const eventCount = calendarEntries.filter((entry) => entry.category === "Evento").length;

  return (
    <DashboardLayout
      title="Calendario"
      subtitle="Cultos, encontros, aniversariantes e retiradas da semana."
      actions={[
        { label: "Eventos", href: "/dashboard/events", variant: "outline" },
        { label: "Agenda publica", href: "/calendar", variant: "secondary" },
      ]}
    >
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <KpiCard title="Cultos" value={String(worshipCount)} helper="Encontros ja previstos na agenda." icon={Church} />
        <KpiCard title="Eventos" value={String(eventCount)} helper="Encontros que exigem acompanhamento." icon={CalendarDays} />
        <KpiCard title="Aniversariantes" value={String(birthdayCount)} helper="Pessoas para lembrar e celebrar." icon={CakeSlice} />
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        {sortedEntries.map((entry) => (
          <Card key={entry.id} className="border-border/70">
            <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="space-y-2">
                <CardTitle className="text-xl">{entry.title}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {entry.date} | {entry.time}
                </p>
              </div>
              <StatusBadge
                label={entry.category}
                tone={entry.category === "Culto" ? "info" : entry.category === "Evento" ? "warning" : entry.category === "Retirada" ? "success" : "neutral"}
              />
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>{entry.details}</p>
              {entry.category === "Retirada" ? (
                <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-emerald-700">
                  <PackageCheck className="h-4 w-4" />
                  Retirada prevista para este dia.
                </div>
              ) : null}
            </CardContent>
          </Card>
        ))}
      </section>
    </DashboardLayout>
  );
}
