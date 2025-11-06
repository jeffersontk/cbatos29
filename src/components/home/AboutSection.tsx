import { Button } from "@/components/ui/button";
import { Heart, Book, Users } from "lucide-react";

const AboutSection = () => {
  const values = [
    {
      icon: Heart,
      title: "Comunhão",
      description: "Vivemos em amor e unidade, cuidando uns dos outros como família.",
    },
    {
      icon: Book,
      title: "Ensino",
      description: "Fundamentados na Palavra, crescemos juntos no conhecimento de Deus.",
    },
    {
      icon: Users,
      title: "Missão",
      description: "Levamos o Evangelho além das quatro paredes, vivendo Atos 29 hoje.",
    },
  ];

  return (
    <section id="sobre" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6 mb-16">
          <h2 className="text-primary">Quem Somos</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            A CB Atos 29 é uma comunidade batista comprometida com o Evangelho de Cristo.
            Nossa visão é ser uma igreja que vive a fé além das quatro paredes, 
            transformando vidas através do amor, da Palavra e do serviço ao próximo.
          </p>
          <p className="text-xl font-semibold text-foreground">
            "Ser igreja além das quatro paredes, vivendo Atos 29 hoje."
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <div
                key={index}
                className="bg-card p-8 rounded-xl shadow-soft hover:shadow-medium transition-smooth border border-border"
              >
                <div className="bg-primary-light p-4 rounded-lg w-fit mb-4">
                  <Icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <Button size="lg" variant="default">
            Conheça Nossa História
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
