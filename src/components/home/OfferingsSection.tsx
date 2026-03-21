import Link from "next/link";
import { ArrowRight, Calendar, Heart, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const accessCards = [
  {
    title: "Venha nos conhecer",
    description: "Sera uma alegria receber voce e apresentar de perto a nossa familia na fe.",
    href: "/#sobre",
    buttonLabel: "Conhecer a igreja",
    icon: Heart,
    variant: "default" as const,
  },
  {
    title: "Participe de uma celebracao",
    description: "Nossos encontros sao tempo de adoracao, Palavra e comunhao para toda a familia.",
    href: "/calendar",
    buttonLabel: "Ver agenda",
    icon: Calendar,
    variant: "outline" as const,
  },
  {
    title: "Caminhe conosco",
    description: "Ha espaco para voce viver relacionamentos verdadeiros, discipulado e cuidado mutuo.",
    href: "/#celulas",
    buttonLabel: "Dar o primeiro passo",
    icon: Users,
    variant: "outline" as const,
  },
];

export default function OfferingsSection() {
  return (
    <section id="plataforma" className="bg-muted/30 py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-12 max-w-3xl space-y-4 text-center">
          <h2 className="text-primary">Voce e bem-vindo aqui.</h2>
          <p className="text-lg text-muted-foreground">
            Independentemente da sua historia, acreditamos que Deus tem algo novo para sua vida.
          </p>
          <p className="text-lg text-muted-foreground">Venha fazer parte dessa familia e caminhar conosco.</p>
        </div>

        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
          {accessCards.map((card) => {
            const Icon = card.icon;

            return (
              <Card key={card.title} className="border-border/70 transition-smooth hover:shadow-medium">
                <CardContent className="pt-6">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-light">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">{card.title}</h3>
                  <p className="mt-3 text-sm text-muted-foreground">{card.description}</p>
                  <Button asChild className="mt-6 w-full" variant={card.variant}>
                    <Link href={card.href}>
                      <ArrowRight className="mr-2 h-4 w-4" />
                      {card.buttonLabel}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
