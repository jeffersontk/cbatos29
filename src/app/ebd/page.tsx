import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, BookOpenText, Clock3, Presentation, Users } from "lucide-react";

import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ebdClasses } from "@/lib/platform/data";

export const metadata: Metadata = {
  title: "EBD | CB Atos 29",
  description: "Conheca as classes da EBD da CB Atos 29, com professores, horarios e proximas aulas.",
};

export default function EbdPage() {
  const totalEnrolled = ebdClasses.reduce((total, item) => total + item.enrolled, 0);
  const totalCapacity = ebdClasses.reduce((total, item) => total + item.capacity, 0);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="mx-auto max-w-7xl space-y-8 px-4 pb-20 pt-28">
        <section className="rounded-[28px] bg-primary px-6 py-8 text-primary-foreground shadow-strong">
          <div className="space-y-4">
            <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em]">
              Crescendo na Palavra
            </span>
            <h1 className="text-4xl font-semibold tracking-tight">Todas as classes da EBD em um so lugar.</h1>
            <p className="max-w-3xl text-sm text-primary-foreground/85 md:text-base">
              Veja as turmas ativas, os professores, os horarios e a proxima aula para encontrar a classe mais adequada para voce.
            </p>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          <Card className="border-border/70">
            <CardContent className="flex items-center gap-3 p-6">
              <Presentation className="h-5 w-5 text-primary" />
              <div>
                <p className="text-2xl font-semibold text-foreground">{ebdClasses.length}</p>
                <p className="text-sm text-muted-foreground">Turmas ativas</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border/70">
            <CardContent className="flex items-center gap-3 p-6">
              <BookOpenText className="h-5 w-5 text-primary" />
              <div>
                <p className="text-2xl font-semibold text-foreground">{totalEnrolled}</p>
                <p className="text-sm text-muted-foreground">Alunos inscritos</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border/70">
            <CardContent className="flex items-center gap-3 p-6">
              <Users className="h-5 w-5 text-primary" />
              <div>
                <p className="text-2xl font-semibold text-foreground">{totalCapacity - totalEnrolled}</p>
                <p className="text-sm text-muted-foreground">Vagas disponiveis</p>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          {ebdClasses.map((ebdClass) => (
            <Card key={ebdClass.id} className="border-border/70">
              <CardHeader className="space-y-3">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <BookOpen className="h-5 w-5 text-primary" />
                  {ebdClass.name}
                </CardTitle>
                <p className="text-sm text-muted-foreground">{ebdClass.audience}</p>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-border/70 bg-background p-4">
                    <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Professor</p>
                    <p className="mt-2 font-semibold text-foreground">{ebdClass.teacher}</p>
                  </div>
                  <div className="rounded-2xl border border-border/70 bg-background p-4">
                    <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Agenda</p>
                    <p className="mt-2 font-semibold text-foreground">{ebdClass.schedule}</p>
                    <p className="text-sm text-muted-foreground">{ebdClass.room}</p>
                  </div>
                </div>

                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span>
                      {ebdClass.enrolled}/{ebdClass.capacity} alunos
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock3 className="h-4 w-4" />
                    <span>{ebdClass.nextLesson}</span>
                  </div>
                </div>

                <Button asChild className="w-full">
                  <Link href="/login">Quero participar dessa jornada</Link>
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
