import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Home, MapPin, Clock, User, MessageCircle } from "lucide-react";
import cellGroupImage from "@/assets/cell-group.jpg";
import Image from "next/image";

const CellsSection = () => {
  const cells = [
    {
      name: "Videira",
      leader: "Thiago & Jéssica",
      neighborhood: "Campo Grande",
      day: "Terça-feira",
      time: "20h30",
    },
    {
      name: "Oliveira",
      leader: "Paulo & Maria",
      neighborhood: "Santíssimo",
      day: "Quinta-feira",
      time: "19h30",
    },
    {
      name: "Figueira",
      leader: "Carlos & Ana",
      neighborhood: "Cosmos",
      day: "Quarta-feira",
      time: "20h00",
    },
    {
      name: "Cedro",
      leader: "João & Beatriz",
      neighborhood: "Senador Camará",
      day: "Sexta-feira",
      time: "19h00",
    },
  ];

  return (
    <section id="celulas" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-primary-light rounded-lg mb-4">
            <Home className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-primary mb-4">Células</h2>
          <p className="text-xl font-semibold text-foreground mb-4">
            Tempo de comunhão, edificação e missão
          </p>
          <p className="text-lg text-muted-foreground">
            Nossos pequenos grupos se reúnem durante a semana para estudo bíblico, 
            oração e comunhão em ambientes acolhedores.
          </p>
        </div>

        {/* Search */}
        <div className="max-w-md mx-auto mb-12">
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              type="text"
              placeholder="Encontre uma célula próxima a você..."
              className="pl-10"
            />
          </div>
        </div>

        {/* Feature Image */}
        <div className="max-w-4xl mx-auto mb-12 rounded-xl overflow-hidden shadow-medium">
          <Image
            src={cellGroupImage}
            alt="Grupo de célula em reunião"
            className="w-full h-64 object-cover"
          />
        </div>

        {/* Cells Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cells.map((cell, index) => (
            <Card key={index} className="hover:shadow-medium transition-smooth">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Home className="w-5 h-5 text-primary" />
                  {cell.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <User className="w-4 h-4" />
                    <span>{cell.leader}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{cell.neighborhood}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>{cell.day} às {cell.time}</span>
                  </div>
                </div>
                
                <Button className="w-full" variant="default" size="sm">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  WhatsApp
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Não encontrou uma célula próxima? Entre em contato conosco!
          </p>
          <Button size="lg" variant="outline">
            Falar com a Coordenação
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CellsSection;
