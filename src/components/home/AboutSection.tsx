import Link from "next/link";
import { Book, Heart, Users } from "lucide-react";

import { Button } from "@/components/ui/button";

const values = [
  {
    icon: Book,
    title: "Cristo e o centro",
    description: "Tudo comeca e termina em Jesus. Ele e a razao da nossa fe, da nossa esperanca e da nossa missao.",
  },
  {
    icon: Users,
    title: "Pessoas sao o foco",
    description: "Acreditamos que cada vida importa para Deus. Por isso caminhamos juntos, cuidando uns dos outros.",
  },
  {
    icon: Heart,
    title: "Amor e a nossa arma",
    description: "Servimos, acolhemos e alcancamos pessoas atraves do amor de Cristo.",
  },
];

export default function AboutSection() {
  return (
    <section id="sobre" className="bg-background py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-14 max-w-4xl space-y-6 text-center">
          <h2 className="text-primary">Mais do que um lugar, uma familia.</h2>
          <p className="text-lg leading-relaxed text-muted-foreground">
            A Comunidade Batista Atos 29 acredita que o Evangelho nao e apenas algo para ouvir aos domingos, mas para viver todos os dias.
          </p>
          <p className="text-lg leading-relaxed text-muted-foreground">
            Seguimos o exemplo da igreja descrita em Atos: uma comunidade que caminha junta, cresce na Palavra, serve com amor e alcanca pessoas com a mensagem de Jesus.
          </p>
          <p className="text-lg leading-relaxed text-muted-foreground">
            Aqui acreditamos em relacionamentos verdadeiros, discipulado e uma fe que se expressa na pratica.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {values.map((value) => {
            const Icon = value.icon;

            return (
              <div key={value.title} className="rounded-3xl border border-border bg-card p-8 shadow-soft transition-smooth hover:shadow-medium">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-light">
                  <Icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="mb-3 text-xl font-semibold">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Button asChild size="lg">
            <Link href="/#plataforma">Venha nos conhecer</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
