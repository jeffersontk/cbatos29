import Link from "next/link";
import { Heart } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ministryOpportunities } from "@/lib/platform/data";

export default function MinistriesSection() {
  return (
    <section id="ministerios" className="bg-background py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center justify-center rounded-2xl bg-primary-light p-3">
            <Heart className="h-8 w-8 text-primary" />
          </div>
          <h2 className="mb-4 text-primary">Faca Parte do Reino</h2>
          <p className="text-lg text-muted-foreground">O membro pode demonstrar interesse, e a lideranca acompanha o processo ate a integracao real no ministerio.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {ministryOpportunities.map((ministry) => (
            <Card key={ministry.id} className="border-border/70 transition-smooth hover:shadow-medium">
              <CardHeader>
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-light">
                  <Heart className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-lg">{ministry.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">{ministry.description}</p>
                <p className="text-xs text-muted-foreground">Coordenacao: {ministry.coordinator}</p>
                <Button asChild className="w-full" variant="outline" size="sm">
                  <Link href="/login">Quero servir</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mx-auto mt-12 max-w-3xl rounded-[28px] border border-primary/20 bg-primary-light p-8 text-center">
          <h3 className="text-xl font-semibold text-primary">&ldquo;Como bom despenseiro da multiforme graca de Deus, sirva aos outros com o dom que recebeu.&rdquo;</h3>
          <p className="mt-2 text-muted-foreground">1 Pedro 4:10</p>
        </div>
      </div>
    </section>
  );
}
