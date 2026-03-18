import type { ReactNode } from "react";

import Link from "next/link";
import { ArrowLeft, Church, LogOut, ShieldCheck, UserRound } from "lucide-react";

import StatusBadge from "@/components/dashboard/StatusBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getPrimaryRole, getRoleLabel, hasDashboardAccess, type AppSession } from "@/lib/auth/session";

type AuthShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  highlights: string[];
  currentSession: AppSession | null;
  children: ReactNode;
};

export default function AuthShell({
  eyebrow,
  title,
  description,
  highlights,
  currentSession,
  children,
}: AuthShellProps) {
  const currentRoleLabel = currentSession ? getRoleLabel(getPrimaryRole(currentSession.roles)) : null;

  return (
    <div className="min-h-screen bg-muted/30 px-4 py-10">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_1.05fr]">
        <section className="flex flex-col justify-between rounded-[32px] bg-primary px-6 py-8 text-primary-foreground shadow-strong md:px-8">
          <div className="space-y-8">
            <div className="flex items-center justify-between gap-4">
              <Link href="/" className="inline-flex items-center gap-2 text-sm text-primary-foreground/85 transition-opacity hover:opacity-80">
                <ArrowLeft className="h-4 w-4" />
                Voltar ao site
              </Link>

              {currentSession ? (
                <div className="flex items-center gap-2">
                  <StatusBadge
                    label={currentRoleLabel ?? "Conectado"}
                    tone={hasDashboardAccess(currentSession) ? "warning" : "success"}
                  />
                  <Button asChild size="sm" variant="outline" className="border-white/20 bg-white/10 text-white hover:bg-white/20">
                    <Link href="/logout">
                      <LogOut className="h-4 w-4" />
                      Sair
                    </Link>
                  </Button>
                </div>
              ) : null}
            </div>

            <div className="space-y-6">
              <div className="inline-flex rounded-2xl bg-white/10 p-4">
                <Church className="h-7 w-7" />
              </div>

              <div className="space-y-4">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary-foreground/75">{eyebrow}</p>
                <h1 className="max-w-xl text-4xl font-semibold tracking-tight md:text-5xl">{title}</h1>
                <p className="max-w-2xl text-base text-primary-foreground/85 md:text-lg">{description}</p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {highlights.map((highlight) => (
                <div key={highlight} className="rounded-3xl border border-white/15 bg-white/10 p-5">
                  <p className="text-sm text-primary-foreground/85">{highlight}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <Card className="border-white/15 bg-white/10 text-white">
              <CardContent className="flex items-start gap-3 p-5">
                <UserRound className="mt-1 h-5 w-5 text-white/85" />
                <div className="space-y-2">
                  <p className="font-semibold">Login unificado</p>
                  <p className="text-sm text-white/80">Uma unica entrada. O sistema redireciona automaticamente para a area certa.</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-white/15 bg-white/10 text-white">
              <CardContent className="flex items-start gap-3 p-5">
                <ShieldCheck className="mt-1 h-5 w-5 text-white/85" />
                <div className="space-y-2">
                  <p className="font-semibold">Roles acumulativas</p>
                  <p className="text-sm text-white/80">Liderancas e professores podem acumular papeis e acessar o que fizer sentido para seu conjunto de responsabilidades.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="flex items-center">{children}</section>
      </div>
    </div>
  );
}
