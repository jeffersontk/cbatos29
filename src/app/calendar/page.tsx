import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import StatusBadge from "@/components/dashboard/StatusBadge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { calendarEntries, events } from "@/lib/platform/data";

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
  const sortedAgendaEntries = [...calendarEntries].sort((a, b) => parsePtBrDate(a.date, a.time) - parsePtBrDate(b.date, b.time));
  const sortedEvents = [...events].sort((a, b) => parsePtBrDate(a.date, a.time) - parsePtBrDate(b.date, b.time));

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="mx-auto max-w-7xl space-y-8 px-4 pb-20 pt-28">
        <section className="rounded-[28px] bg-primary px-6 py-8 text-primary-foreground shadow-strong">
          <div className="space-y-4">
            <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em]">
              Agenda da igreja
            </span>
            <h1 className="text-4xl font-semibold tracking-tight">Calendario de cultos, eventos e aniversariantes.</h1>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.1fr_1fr]">
          <Card className="border-border/70">
            <CardHeader>
              <CardTitle className="text-xl">Agenda geral</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {sortedAgendaEntries.map((entry) => (
                <div key={entry.id} className="rounded-2xl border border-border/70 bg-background p-4">
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <p className="font-semibold text-foreground">{entry.title}</p>
                    <StatusBadge label={entry.category} tone="info" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {entry.date} | {entry.time}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">{entry.details}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-border/70">
            <CardHeader>
              <CardTitle className="text-xl">Eventos em destaque</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {sortedEvents.map((event) => (
                <div key={event.id} className="rounded-2xl border border-border/70 bg-background p-4">
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <p className="font-semibold text-foreground">{event.title}</p>
                    <StatusBadge label={event.priceLabel} tone={event.paymentStatus === "Pago" ? "warning" : "success"} />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {event.date} | {event.time}
                  </p>
                  <p className="text-sm text-muted-foreground">{event.location}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{event.audience}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>
      </main>
      <Footer />
    </div>
  );
}
