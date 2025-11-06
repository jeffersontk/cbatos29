import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Users, Clock, TrendingUp } from "lucide-react";

const EBDSection = () => {
  const classes = [
    {
      name: "Fundamentos",
      description: "Bases da fé cristã para novos convertidos",
      age: "Todas as idades",
      duration: "12 encontros",
      progress: 75,
    },
    {
      name: "Primeiros Atos",
      description: "Discipulado e crescimento espiritual",
      age: "Jovens e adultos",
      duration: "16 encontros",
      progress: 45,
    },
    {
      name: "Estudos Bíblicos",
      description: "Aprofundamento nas Escrituras",
      age: "Adultos",
      duration: "24 encontros",
      progress: 30,
    },
    {
      name: "Telos",
      description: "Teologia e vida cristã avançada",
      age: "Líderes e membros",
      duration: "20 encontros",
      progress: 60,
    },
  ];

  return (
    <section id="ebd" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-primary-light rounded-lg mb-4">
            <BookOpen className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-primary mb-4">Escola Bíblica Dominical</h2>
          <p className="text-lg text-muted-foreground">
            Crescimento no conhecimento de Deus através do estudo sistemático da Palavra
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {classes.map((classItem, index) => (
            <Card key={index} className="hover:shadow-medium transition-smooth">
              <CardHeader>
                <CardTitle className="text-lg">{classItem.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{classItem.description}</p>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="w-4 h-4" />
                    <span>{classItem.age}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>{classItem.duration}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Progresso</span>
                    <span className="font-semibold text-primary">{classItem.progress}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-smooth"
                      style={{ width: `${classItem.progress}%` }}
                    />
                  </div>
                </div>

                <Button className="w-full" size="sm">
                  Inscreva-se
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-primary-light border border-primary/20 rounded-xl p-6 max-w-2xl mx-auto">
          <div className="flex items-start gap-4">
            <div className="bg-primary p-3 rounded-lg">
              <TrendingUp className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-primary">Horários das Aulas</h3>
              <p className="text-sm text-muted-foreground mb-1">
                Domingos às 9h30 (antes do primeiro culto)
              </p>
              <p className="text-sm text-muted-foreground">
                Segunda-feira às 20h30 (ensino online disponível)
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EBDSection;
