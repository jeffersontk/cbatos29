"use client";

import Link from "next/link";
import { Calendar, Church, Clock, MapPin } from "lucide-react";

import { Button } from "@/components/ui/button";
import { churchProfile } from "@/lib/platform/data";

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-white/15 p-3">
                <Church className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xl font-semibold">{churchProfile.name}</p>
                <p className="text-sm text-primary-foreground/80">{churchProfile.subtitle}</p>
              </div>
            </div>
            <p className="text-sm text-primary-foreground/80">Uma comunidade que vive o Evangelho no dia a dia.</p>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Vida da igreja</h4>
            <div className="space-y-3 text-sm text-primary-foreground/85">
              <div className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0" />
                <span>{churchProfile.address}</span>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="mt-0.5 h-4 w-4 flex-shrink-0" />
                <span>Cultos aos domingos: {churchProfile.sundayServices.join(", ")}</span>
              </div>
              <div className="flex items-start gap-2">
                <Calendar className="mt-0.5 h-4 w-4 flex-shrink-0" />
                <span>{churchProfile.ebdSchedule}</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Acessos rapidos</h4>
            <div className="flex flex-col gap-2 text-sm">
              <Link href="/#sobre" className="transition-opacity hover:opacity-80">
                Mais do que um lugar, uma familia
              </Link>
              <Link href="/calendar" className="transition-opacity hover:opacity-80">
                Agenda da igreja
              </Link>
              <Link href="/login" className="transition-opacity hover:opacity-80">
                Area do membro
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Voce e bem-vindo aqui</h4>
            <div className="space-y-3 text-sm text-primary-foreground/85">
              <p>Independentemente da sua historia, acreditamos que Deus tem algo novo para sua vida.</p>
              <p>Venha fazer parte dessa familia e caminhar conosco.</p>
              <div className="flex gap-3">
                <Button asChild variant="outline" className="border-white/20 bg-white/10 text-white hover:bg-white/20">
                  <Link href="/#sobre">
                    <Church className="mr-2 h-4 w-4" />
                    Conhecer
                  </Link>
                </Button>
                <Button asChild variant="outline" className="border-white/20 bg-white/10 text-white hover:bg-white/20">
                  <Link href="/calendar">
                    <Calendar className="mr-2 h-4 w-4" />
                    Ver agenda
                  </Link>
                </Button>
              </div>
            </div>

            <Button
              onClick={scrollToTop}
              variant="outline"
              className="border-white/20 bg-white/10 text-white hover:bg-white/20"
            >
              Voltar ao topo
            </Button>
          </div>
        </div>

        <div className="mt-8 border-t border-white/15 pt-6 text-center text-sm text-primary-foreground/80">
          <p>
            &copy; {new Date().getFullYear()} <Link href="/">CB Atos 29</Link>. Uma comunidade que vive o Evangelho no dia a dia.
          </p>
        </div>
      </div>
    </footer>
  );
}

