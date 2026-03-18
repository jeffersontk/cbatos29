import Link from "next/link";
import Image from "next/image";
import { LogIn } from "lucide-react";

import heroImage from "@/assets/hero-worship.jpg";
import { Button } from "@/components/ui/button";
import { churchProfile } from "@/lib/platform/data";

export default function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <Image src={heroImage} alt="Culto de adoracao da CB Atos 29" className="h-full w-full object-cover" fill priority />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/85 via-primary/80 to-slate-950/90" />
      </div>

      <div className="relative z-10 container mx-auto px-4 pt-24 text-center text-white">
        <div className="mx-auto max-w-5xl space-y-8">
          <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white/85">
            Igreja local + plataforma digital
          </span>

          <div className="space-y-4">
            <h1 className="text-5xl font-semibold leading-tight md:text-6xl lg:text-7xl">{churchProfile.mission}</h1>
            <p className="mx-auto max-w-3xl text-lg text-white/85 md:text-xl">
              Um login unico identifica o papel de cada usuario e envia automaticamente para o portal do membro ou para o dashboard operacional.
            </p>
          </div>

          <div className="flex justify-center">
            <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 shadow-strong">
              <Link href="/login">
                <LogIn className="mr-2 h-5 w-5" />
                Login
              </Link>
            </Button>
          </div>

          <div className="grid gap-4 pt-10 md:grid-cols-3">
            <div className="rounded-3xl border border-white/15 bg-white/10 p-5 backdrop-blur">
              <p className="text-sm uppercase tracking-[0.2em] text-white/70">Cultos</p>
              <p className="mt-2 text-2xl font-semibold">{churchProfile.sundayServices.join(" • ")}</p>
            </div>
            <div className="rounded-3xl border border-white/15 bg-white/10 p-5 backdrop-blur">
              <p className="text-sm uppercase tracking-[0.2em] text-white/70">EBD</p>
              <p className="mt-2 text-2xl font-semibold">{churchProfile.ebdSchedule}</p>
            </div>
            <div className="rounded-3xl border border-white/15 bg-white/10 p-5 backdrop-blur">
              <p className="text-sm uppercase tracking-[0.2em] text-white/70">Base</p>
              <p className="mt-2 text-xl font-semibold">{churchProfile.address}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
