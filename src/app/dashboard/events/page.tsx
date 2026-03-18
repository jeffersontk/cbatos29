import { CreditCard, MapPinned, Ticket } from "lucide-react";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DataTable from "@/components/dashboard/DataTable";
import KpiCard from "@/components/dashboard/KpiCard";
import StatusBadge from "@/components/dashboard/StatusBadge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { eventRegistrations, events } from "@/lib/platform/data";

export default function EventsPage() {
  const paidEvents = events.filter((event) => event.paymentStatus === "Pago").length;
  const registrations = eventRegistrations.length;
  const pendingPayments = eventRegistrations.filter((registration) => registration.paymentStatus === "Pendente").length;

  return (
    <DashboardLayout
      title="Eventos e inscrições"
      subtitle="Eventos gratuitos e pagos precisam compartilhar o mesmo fluxo de cadastro, comunicação, pagamento e operação no dia."
      actions={[
        { label: "Abrir calendário", href: "/dashboard/calendar", variant: "outline" },
        { label: "Ver loja", href: "/dashboard/store", variant: "secondary" },
      ]}
    >
      <section className="grid gap-4 md:grid-cols-3">
        <KpiCard title="Eventos abertos" value={String(events.length)} helper="Agenda ativa para cultos especiais, treinamentos e retiros." icon={MapPinned} />
        <KpiCard title="Inscrições em andamento" value={String(registrations)} helper="Solicitações já mapeadas para o fluxo do admin." icon={Ticket} />
        <KpiCard title="Pagamentos pendentes" value={String(pendingPayments)} helper={`${paidEvents} eventos já exigem cobrança no desenho atual.`} icon={CreditCard} />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.1fr_1.2fr]">
        <Card className="border-border/70">
          <CardHeader>
            <CardTitle className="text-xl">Eventos publicados</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {events.map((event) => (
              <div key={event.id} className="rounded-2xl border border-border/70 bg-background p-4">
                <div className="mb-3 flex items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold text-foreground">{event.title}</p>
                    <p className="text-sm text-muted-foreground">{event.date}</p>
                  </div>
                  <StatusBadge label={event.priceLabel} tone={event.paymentStatus === "Pago" ? "warning" : "info"} />
                </div>
                <div className="grid gap-2 text-sm text-muted-foreground">
                  <p>{event.location}</p>
                  <p>{event.time}</p>
                  <p>
                    {event.registrations}/{event.capacity} inscrições
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
              header: "Inscrição",
              cell: (registration) => (
                <StatusBadge
                  label={registration.status}
                  tone={
                    registration.status === "Confirmada"
                      ? "success"
                      : registration.status === "Pendente"
                        ? "warning"
                        : "neutral"
                  }
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
