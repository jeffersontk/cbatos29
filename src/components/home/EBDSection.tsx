import Link from "next/link";
import { BookOpen, Clock3, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ebdClasses } from "@/lib/platform/data";

export default function EBDSection() {
  return (
    <section id="ebd" className="bg-muted/30 py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center justify-center rounded-2xl bg-primary-light p-3">
            <BookOpen className="h-8 w-8 text-primary" />
          </div>
          <h2 className="mb-4 text-primary">Escola Biblica Dominical</h2>
          <p className="text-lg text-muted-foreground">Turmas, materiais e presenca integrados ao mesmo fluxo para professores, alunos e coordenacao.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {ebdClasses.map((ebdClass) => (
            <Card key={ebdClass.id} className="border-border/70 transition-smooth hover:shadow-medium">
              <CardHeader>
                <CardTitle className="text-lg">{ebdClass.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{ebdClass.audience}</p>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span>
                      {ebdClass.enrolled}/{ebdClass.capacity} alunos
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock3 className="h-4 w-4" />
                    <span>{ebdClass.schedule}</span>
                  </div>
                </div>
                <p className="text-sm font-medium text-foreground">{ebdClass.nextLesson}</p>
                <Button asChild className="w-full" size="sm">
                  <Link href="/login">Entrar e participar</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
