import { CreditCard, MapPinned, Ticket } from "lucide-react";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DataTable from "@/components/dashboard/DataTable";
import KpiCard from "@/components/dashboard/KpiCard";
import StatusBadge from "@/components/dashboard/StatusBadge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { eventRegistrations, events } from "@/lib/platform/data";

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

export default function EventsPage() {
  const sortedEvents = [...events].sort((a, b) => parsePtBrDate(a.date, a.time) - parsePtBrDate(b.date, b.time));
  const paidEvents = events.filter((event) => event.paymentStatus === "Pago").length;
  const registrations = eventRegistrations.length;
  const pendingPayments = eventRegistrations.filter((registration) => registration.paymentStatus === "Pendente").length;

  return (
    <DashboardLayout
      title="Eventos"
      subtitle="Inscricoes, pagamentos e acompanhamento dos encontros."
      actions={[
        { label: "Calendario", href: "/dashboard/calendar", variant: "outline" },
        { label: "Loja", href: "/dashboard/store", variant: "secondary" },
      ]}
    >
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <KpiCard title="Eventos abertos" value={String(events.length)} helper="Encontros publicados na agenda." icon={MapPinned} />
        <KpiCard title="Inscricoes" value={String(registrations)} helper="Pedidos recebidos ate agora." icon={Ticket} />
        <KpiCard title="Pagamentos pendentes" value={String(pendingPayments)} helper={`${paidEvents} evento(s) com cobranca.`} icon={CreditCard} />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.1fr_1.2fr]">
        <Card className="border-border/70">
          <CardHeader>
            <CardTitle className="text-xl">Eventos publicados</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {sortedEvents.map((event) => (
              <div key={event.id} className="rounded-2xl border border-border/70 bg-background p-4">
                <div className="mb-3 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="font-semibold text-foreground">{event.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {event.date} | {event.time}
                    </p>
                  </div>
                  <StatusBadge label={event.priceLabel} tone={event.paymentStatus === "Pago" ? "warning" : "info"} />
                </div>
                <div className="grid gap-2 text-sm text-muted-foreground">
                  <p>{event.location}</p>
                  <p>
                    {event.registrations}/{event.capacity} inscricoes
                  </p>
                  <p>{event.audience}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <DataTable
          data={eventRegistrations}
          columns={[
            {
              header: "Participante",
              cell: (registration) => (
                <div>
                  <p className="font-semibold text-foreground">{registration.memberName}</p>
                  <p className="text-xs text-muted-foreground">{registration.requestedAt}</p>
                </div>
              ),
            },
            {
              header: "Evento",
              cell: (registration) => <span className="text-sm text-foreground">{registration.eventTitle}</span>,
            },
            {
              header: "Inscricao",
              cell: (registration) => (
                <StatusBadge
                  label={registration.status}
                  tone={registration.status === "Confirmada" ? "success" : registration.status === "Pendente" ? "warning" : "neutral"}
                />
              ),
            },
            {
              header: "Pagamento",
              cell: (registration) => (
                <StatusBadge label={registration.paymentStatus} tone={registration.paymentStatus === "Pago" ? "success" : "warning"} />
              ),
            },
          ]}
        />
      </section>
    </DashboardLayout>
  );
}
