import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MapPin, DollarSign, Users } from "lucide-react";

const EventsSection = () => {
  const events = [
    {
      date: "15",
      month: "DEZ",
      title: "Retiro de Jovens 2024",
      location: "Sítio Vale Verde, Itaguaí",
      price: "R$ 180,00",
      spots: "15 vagas",
    },
    {
      date: "20",
      month: "DEZ",
      title: "Encontro de Casais",
      location: "Sede da Igreja",
      price: "R$ 50,00 (por casal)",
      spots: "20 vagas",
    },
    {
      date: "31",
      month: "DEZ",
      title: "Vigília de Ano Novo",
      location: "Templo CB Atos 29",
      price: "Gratuito",
      spots: "Sem limite",
    },
    {
      date: "10",
      month: "JAN",
      title: "Conferência Missionária",
      location: "Auditório Principal",
      price: "Gratuito",
      spots: "150 vagas",
    },
  ];

  return (
    <section id="eventos" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-primary-light rounded-lg mb-4">
            <Calendar className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-primary mb-4">Próximos Eventos</h2>
          <p className="text-lg text-muted-foreground">
            Participe dos nossos eventos e fortaleça sua caminhada com Cristo
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {events.map((event, index) => (
            <Card key={index} className="hover:shadow-medium transition-smooth overflow-hidden">
              <div className="bg-primary text-primary-foreground text-center py-4">
                <div className="text-3xl font-bold">{event.date}</div>
                <div className="text-sm uppercase tracking-wide">{event.month}</div>
              </div>
              <CardHeader>
                <CardTitle className="text-lg">{event.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <DollarSign className="w-4 h-4" />
                    <span>{event.price}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="w-4 h-4" />
                    <span>{event.spots}</span>
                  </div>
                </div>
                
                <Button className="w-full" size="sm">
                  Saiba Mais
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" variant="outline">
            Ver Todos os Eventos
          </Button>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
