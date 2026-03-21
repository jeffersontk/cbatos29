import Link from "next/link";
import Image from "next/image";

import bgAtos29Image from "@/assets/bg-atos29.jpg";
import { Button } from "@/components/ui/button";
import { churchProfile } from "@/lib/platform/data";

export default function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <Image src={bgAtos29Image} alt="Culto de adoracao da CB Atos 29" className="h-full w-full object-cover object-center" fill priority />
        <div className="absolute inset-0 bg-slate-950/35" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.52),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(37,99,235,0.44),transparent_42%),linear-gradient(180deg,rgba(30,64,175,0.44),rgba(15,23,42,0.72))] backdrop-blur-[3px]" />
      </div>

      <div className="relative z-10 container mx-auto px-4 pt-24 text-center text-white">
        <div className="mx-auto max-w-5xl space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl font-semibold leading-tight md:text-6xl lg:text-7xl">
              Uma comunidade que vive o Evangelho no dia a dia.
            </h1>
            <p className="mx-auto max-w-3xl text-lg leading-relaxed text-white/85 md:text-xl">
              Somos uma familia de amor e fe, vivemos em comunhao e caminhamos lado a lado para transformar vidas.
            </p>
          </div>

          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 shadow-strong">
              <Link href="/#sobre">Venha nos conhecer</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/25 bg-white/10 text-white hover:bg-white/15"
            >
              <Link href="/calendar">Participe de uma celebracao</Link>
            </Button>
          </div>

          <div className="grid gap-4 pt-10 md:grid-cols-3">
            <div className="rounded-3xl border border-white/15 bg-white/10 p-5 backdrop-blur">
              <p className="text-sm uppercase tracking-[0.2em] text-white/70">EBD</p>
              <p className="mt-2 text-2xl font-semibold">{churchProfile.ebdSchedule}</p>
            </div>
            <div className="rounded-3xl border border-white/15 bg-white/10 p-5 backdrop-blur [&>p:last-child]:hidden">
              <p className="text-sm uppercase tracking-[0.2em] text-white/70">Celebracoes</p>
              <p className="mt-2 text-2xl font-semibold">{churchProfile.sundayServices.join(" | ")}</p>
              <p className="mt-2 text-2xl font-semibold">{churchProfile.sundayServices.join(" • ")}</p>
            </div>
            <div className="rounded-3xl border border-white/15 bg-white/10 p-5 backdrop-blur">
              <p className="text-sm uppercase tracking-[0.2em] text-white/70">Estamos em</p>
              <p className="mt-2 text-xl font-semibold">{churchProfile.address}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
