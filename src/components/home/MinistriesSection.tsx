import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Music, Users, Baby, Briefcase, Heart, Zap } from "lucide-react";

const MinistriesSection = () => {
  const ministries = [
    {
      icon: Music,
      name: "Louvor e Adoração",
      description: "Ministério de música que conduz a igreja em adoração",
    },
    {
      icon: Baby,
      name: "Kids",
      description: "Evangelização e ensino para crianças de 0 a 12 anos",
    },
    {
      icon: Users,
      name: "Jovens",
      description: "Discipulado e atividades para adolescentes e jovens",
    },
    {
      icon: Heart,
      name: "Intercessão",
      description: "Oração em favor da igreja e do Reino de Deus",
    },
    {
      icon: Briefcase,
      name: "Atos de Homens",
      description: "Fortalecimento espiritual masculino",
    },
    {
      icon: Zap,
      name: "Gênesis",
      description: "Ministério de mulheres cristãs",
    },
  ];

  return (
    <section id="ministerios" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-primary-light rounded-lg mb-4">
            <Heart className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-primary mb-4">Faça Parte do Reino</h2>
          <p className="text-lg text-muted-foreground">
            Use seus dons e talentos para servir ao Senhor e edificar a igreja
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {ministries.map((ministry, index) => {
            const Icon = ministry.icon;
            return (
              <Card key={index} className="hover:shadow-medium transition-smooth group">
                <CardHeader>
                  <div className="bg-primary-light p-3 rounded-lg w-fit mb-3 group-hover:scale-110 transition-smooth">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{ministry.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{ministry.description}</p>
                  <Button variant="outline" size="sm" className="w-full">
                    Quero Servir
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="bg-primary-light border border-primary/20 rounded-xl p-8 max-w-2xl mx-auto text-center">
          <h3 className="text-xl font-semibold mb-4 text-primary">
            "Como bom despenseiro da multiforme graça de Deus, sirva aos outros com o dom que recebeu."
          </h3>
          <p className="text-muted-foreground mb-6">1 Pedro 4:10</p>
          <Button size="lg">
            Conversar com um Líder
          </Button>
        </div>
      </div>
    </section>
  );
};

export default MinistriesSection;
