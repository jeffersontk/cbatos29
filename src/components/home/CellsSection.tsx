import Link from "next/link";
import Image from "next/image";
import { Home, Users } from "lucide-react";

import cellGroupImage from "@/assets/cell-group.jpg";
import { Button } from "@/components/ui/button";
import { cells } from "@/lib/platform/data";

export default function CellsSection() {
  const totalMembers = cells.reduce((total, cell) => total + cell.members, 0);
  const totalVacancies = cells.reduce((total, cell) => total + cell.vacancies, 0);

  return (
    <section id="celulas" className="bg-background py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-12 max-w-4xl text-center">
          <div className="mb-4 inline-flex items-center justify-center rounded-2xl bg-primary-light p-3">
            <Home className="h-8 w-8 text-primary" />
          </div>
          <h2 className="mb-4 text-primary">Vida na vida</h2>
          <div className="mx-auto max-w-3xl space-y-4 text-lg text-muted-foreground">
            <p>Acreditamos que o discipulado acontece nos relacionamentos.</p>
            <p>Caminhamos juntos, aprendendo a viver como Jesus viveu e ajudando outras pessoas a fazer o mesmo.</p>
          </div>
        </div>

        <div className="mx-auto mb-12 max-w-5xl overflow-hidden rounded-[32px] shadow-medium">
          <Image src={cellGroupImage} alt="Reuniao de celula da igreja" className="h-72 w-full object-cover" />
        </div>

        <div className="mx-auto max-w-4xl rounded-[32px] border border-border/70 bg-card p-8 text-center shadow-soft">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl bg-muted/60 p-4">
              <p className="text-3xl font-semibold text-foreground">{cells.length}</p>
              <p className="text-sm text-muted-foreground">Celulas ativas</p>
            </div>
            <div className="rounded-2xl bg-muted/60 p-4">
              <p className="text-3xl font-semibold text-foreground">{totalMembers}</p>
              <p className="text-sm text-muted-foreground">Pessoas acompanhadas</p>
            </div>
            <div className="rounded-2xl bg-muted/60 p-4">
              <p className="text-3xl font-semibold text-foreground">{totalVacancies}</p>
              <p className="text-sm text-muted-foreground">Vagas disponiveis</p>
            </div>
          </div>

          <div className="mt-6 space-y-2 text-muted-foreground">
            <p>As celulas acontecem em diferentes bairros para facilitar o cuidado, o discipulado e a comunhao durante a semana.</p>
            <p>Na pagina completa voce encontra todos os horarios, lideres e vagas antes de pedir seu acesso.</p>
          </div>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" variant="outline">
              <Link href="/celulas">
                <Home className="h-4 w-4" />
                Ver todas as celulas
              </Link>
            </Button>
            <Button asChild size="lg">
              <Link href="/login">
                <Users className="h-4 w-4" />
                Quero caminhar em uma celula
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
