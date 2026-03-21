import Link from "next/link";
import { BookOpen, Clock3, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ebdClasses } from "@/lib/platform/data";

export default function EBDSection() {
  const totalEnrolled = ebdClasses.reduce((total, item) => total + item.enrolled, 0);
  const totalCapacity = ebdClasses.reduce((total, item) => total + item.capacity, 0);

  return (
    <section id="ebd" className="bg-muted/30 py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center justify-center rounded-2xl bg-primary-light p-3">
            <BookOpen className="h-8 w-8 text-primary" />
          </div>
          <h2 className="mb-4 text-primary">Crescendo na Palavra</h2>
          <p className="text-lg text-muted-foreground">
            Seguimos juntos no ensino da Palavra para conhecer melhor a Jesus e viver a fe com maturidade no dia a dia.
          </p>
        </div>

        <div className="mx-auto max-w-4xl rounded-[32px] border border-border/70 bg-background p-8 text-center shadow-soft">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl bg-muted/60 p-4">
              <p className="text-3xl font-semibold text-foreground">{ebdClasses.length}</p>
              <p className="text-sm text-muted-foreground">Turmas ativas</p>
            </div>
            <div className="rounded-2xl bg-muted/60 p-4">
              <p className="text-3xl font-semibold text-foreground">{totalEnrolled}</p>
              <p className="text-sm text-muted-foreground">Alunos inscritos</p>
            </div>
            <div className="rounded-2xl bg-muted/60 p-4">
              <p className="text-3xl font-semibold text-foreground">{totalCapacity - totalEnrolled}</p>
              <p className="text-sm text-muted-foreground">Vagas disponiveis</p>
            </div>
          </div>

          <div className="mt-6 space-y-2 text-muted-foreground">
            <p>As turmas da EBD ajudam novos convertidos, familias, lideres e membros a crescerem com base biblica solida.</p>
            <p>Na pagina completa voce pode ver as classes, os professores, os horarios e a proxima aula de cada turma.</p>
          </div>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" variant="outline">
              <Link href="/ebd">
                <Clock3 className="h-4 w-4" />
                Ver todas as classes
              </Link>
            </Button>
            <Button asChild size="lg">
              <Link href="/login">
                <Users className="h-4 w-4" />
                Quero crescer na Palavra
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
