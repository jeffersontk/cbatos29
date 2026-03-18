import Link from "next/link";
import { Book, Heart, Users } from "lucide-react";

import { Button } from "@/components/ui/button";

const values = [
  {
    icon: Heart,
    title: "Comunhao",
    description: "Uma igreja local que cuida das pessoas de perto, em cultos, celulas e relacionamentos reais.",
  },
  {
    icon: Book,
    title: "Ensino",
    description: "EBD organizada com turmas, materiais, professores e acompanhamento da caminhada de cada aluno.",
  },
  {
    icon: Users,
    title: "Missao",
    description: "Membros servindo com clareza nos ministerios, eventos e frentes que a igreja precisa fortalecer.",
  },
];

export default function AboutSection() {
  return (
    <section id="sobre" className="bg-background py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-14 max-w-4xl space-y-6 text-center">
          <h2 className="text-primary">Quem Somos</h2>
          <p className="text-lg leading-relaxed text-muted-foreground">
            A CB Atos 29 e uma comunidade batista comprometida com o Evangelho de Cristo. O projeto desta plataforma nasce para sustentar o cuidado da igreja com mais ordem, visibilidade e servico.
          </p>
          <p className="text-xl font-semibold text-foreground">&ldquo;Ser igreja alem das quatro paredes, vivendo Atos 29 hoje.&rdquo;</p>
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
            <Link href="/login">Fazer login</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
