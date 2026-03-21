import Link from "next/link";
import { Calendar, MapPin, Ticket } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { events } from "@/lib/platform/data";

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

export default function EventsSection() {
  const sortedEvents = [...events].sort((a, b) => parsePtBrDate(a.date, a.time) - parsePtBrDate(b.date, b.time));

  return (
    <section id="eventos" className="bg-muted/30 py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center justify-center rounded-2xl bg-primary-light p-3">
            <Calendar className="h-8 w-8 text-primary" />
          </div>
          <h2 className="mb-4 text-primary">Celebracoes e encontros</h2>
          <p className="text-lg text-muted-foreground">
            Nossos encontros fortalecem a comunhao, a adoracao e a alegria de caminhar como familia em Cristo.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {sortedEvents.map((event) => (
            <Card key={event.id} className="overflow-hidden border-border/70 transition-smooth hover:shadow-medium">
              <div className="bg-primary px-5 py-4 text-primary-foreground">
                <p className="text-sm uppercase tracking-[0.18em]">{event.date}</p>
                <p className="mt-1 text-lg font-semibold">{event.time}</p>
              </div>
              <CardHeader>
                <CardTitle className="text-lg">{event.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <div className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Ticket className="h-4 w-4" />
                  <span>{event.priceLabel}</span>
                </div>
                <p>
                  {event.registrations}/{event.capacity} inscricoes
                </p>
                <Button asChild className="w-full" size="sm">
                  <Link href="/login">Quero participar</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
