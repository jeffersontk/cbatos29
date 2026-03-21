import type { Metadata } from "next";
import Link from "next/link";
import { Clock, Home, MapPin, Users } from "lucide-react";

import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cells } from "@/lib/platform/data";

export const metadata: Metadata = {
  title: "Celulas | CB Atos 29",
  description: "Conheca todas as celulas da CB Atos 29, seus bairros, lideres e horarios.",
};

export default function CellsPage() {
  const totalMembers = cells.reduce((total, cell) => total + cell.members, 0);
  const totalVacancies = cells.reduce((total, cell) => total + cell.vacancies, 0);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="mx-auto max-w-7xl space-y-8 px-4 pb-20 pt-28">
        <section className="rounded-[28px] bg-primary px-6 py-8 text-primary-foreground shadow-strong">
          <div className="space-y-4">
            <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em]">
              Vida na vida
            </span>
            <h1 className="text-4xl font-semibold tracking-tight">Todas as celulas da igreja em um so lugar.</h1>
            <p className="max-w-3xl text-sm text-primary-foreground/85 md:text-base">
              Veja os bairros, os lideres, os horarios e as vagas disponiveis para encontrar a celula mais proxima de voce.
            </p>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          <Card className="border-border/70">
            <CardContent className="flex items-center gap-3 p-6">
              <Home className="h-5 w-5 text-primary" />
              <div>
                <p className="text-2xl font-semibold text-foreground">{cells.length}</p>
                <p className="text-sm text-muted-foreground">Celulas ativas</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border/70">
            <CardContent className="flex items-center gap-3 p-6">
              <Users className="h-5 w-5 text-primary" />
              <div>
                <p className="text-2xl font-semibold text-foreground">{totalMembers}</p>
                <p className="text-sm text-muted-foreground">Pessoas acompanhadas</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border/70">
            <CardContent className="flex items-center gap-3 p-6">
              <MapPin className="h-5 w-5 text-primary" />
              <div>
                <p className="text-2xl font-semibold text-foreground">{totalVacancies}</p>
                <p className="text-sm text-muted-foreground">Vagas disponiveis</p>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {cells.map((cell) => (
            <Card key={cell.id} className="border-border/70 transition-smooth hover:shadow-medium">
              <CardHeader className="space-y-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Home className="h-5 w-5 text-primary" />
                  {cell.name}
                </CardTitle>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{cell.neighborhood}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{cell.schedule}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span>
                      {cell.members} pessoas | {cell.vacancies} vagas
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <p>Lideres: {cell.leaders}</p>
                <p>Foco: {cell.focus}</p>
                <Button asChild className="w-full">
                  <Link href="/login">Quero participar</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </section>
      </main>
      <Footer />
    </div>
  );
}
