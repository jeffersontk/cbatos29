import Link from "next/link";
import { ArrowRight, Calendar, LogIn, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const accessCards = [
  {
    title: "Login unificado",
    description: "Um unico acesso para admin, lideres, professores e membros comuns.",
    href: "/login",
    icon: LogIn,
  },
  {
    title: "Calendario da igreja",
    description: "Cultos, aniversariantes, eventos e retiradas em uma agenda comum.",
    href: "/calendar",
    icon: Calendar,
  },
  {
    title: "Permissoes por role",
    description: "As roles podem ser acumulativas, e o sistema libera dashboard ou portal pessoal conforme a combinacao de responsabilidades.",
    href: "/login",
    icon: ShieldCheck,
  },
];

export default function OfferingsSection() {
  return (
    <section id="plataforma" className="bg-muted/30 py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <h2 className="mb-6 text-primary">Plataforma da Igreja</h2>
          <p className="text-lg text-muted-foreground">
            O projeto deixa de ser so um site institucional e passa a ser o hub digital da igreja.
          </p>
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
                  <Button asChild className="mt-6 w-full" variant={card.href === "/login" ? "default" : "outline"}>
                    <Link href={card.href}>
                      <ArrowRight className="mr-2 h-4 w-4" />
                      {card.href === "/calendar" ? "Ver agenda" : "Entrar"}
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
