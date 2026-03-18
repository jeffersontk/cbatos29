import Link from "next/link";
import Image from "next/image";
import { Home, MapPin, Users } from "lucide-react";

import cellGroupImage from "@/assets/cell-group.jpg";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cells } from "@/lib/platform/data";

export default function CellsSection() {
  return (
    <section id="celulas" className="bg-background py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-12 max-w-4xl text-center">
          <div className="mb-4 inline-flex items-center justify-center rounded-2xl bg-primary-light p-3">
            <Home className="h-8 w-8 text-primary" />
          </div>
          <h2 className="mb-4 text-primary">Celulas</h2>
          <p className="text-lg text-muted-foreground">
            Pequenos grupos durante a semana para comunhao, discipulado, cuidado e expansao missionaria da igreja.
          </p>
        </div>

        <div className="mx-auto mb-12 max-w-5xl overflow-hidden rounded-[32px] shadow-medium">
          <Image src={cellGroupImage} alt="Reuniao de celula da igreja" className="h-72 w-full object-cover" />
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {cells.map((cell) => (
            <Card key={cell.id} className="border-border/70 transition-smooth hover:shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Home className="h-5 w-5 text-primary" />
                  {cell.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>{cell.neighborhood}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>
                    {cell.members} pessoas • {cell.vacancies} vagas
                  </span>
                </div>
                <p>{cell.leaders}</p>
                <p>{cell.schedule}</p>
                <Button asChild className="w-full" size="sm">
                  <Link href="/login">Demonstrar interesse</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
