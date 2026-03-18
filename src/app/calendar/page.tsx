import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import StatusBadge from "@/components/dashboard/StatusBadge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { calendarEntries, events } from "@/lib/platform/data";

export default function CalendarPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="mx-auto max-w-7xl space-y-8 px-4 pb-20 pt-28">
        <section className="rounded-[28px] bg-primary px-6 py-8 text-primary-foreground shadow-strong">
          <div className="space-y-4">
            <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em]">
              Agenda da igreja
            </span>
            <h1 className="text-4xl font-semibold tracking-tight">Calendario comum para cultos, eventos e aniversariantes.</h1>
            <p className="max-w-3xl text-primary-foreground/85">
              Esta tela e publica. O membro continua vendo suas inscricoes e comprovacoes no proprio portal, sem depender da area administrativa.
            </p>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.1fr_1fr]">
          <Card className="border-border/70">
            <CardHeader>
              <CardTitle className="text-xl">Agenda geral</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {calendarEntries.map((entry) => (
                <div key={entry.id} className="rounded-2xl border border-border/70 bg-background p-4">
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <p className="font-semibold text-foreground">{entry.title}</p>
                    <StatusBadge label={entry.category} tone="info" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {entry.date} • {entry.time}
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
              {events.map((event) => (
                <div key={event.id} className="rounded-2xl border border-border/70 bg-background p-4">
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <p className="font-semibold text-foreground">{event.title}</p>
                    <StatusBadge label={event.priceLabel} tone={event.paymentStatus === "Pago" ? "warning" : "success"} />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {event.date} • {event.time}
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
