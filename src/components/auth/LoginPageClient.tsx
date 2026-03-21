"use client";

import Link from "next/link";
import { useActionState } from "react";
import { ArrowLeft, LockKeyhole, LogOut, ShieldCheck } from "lucide-react";
import { useSearchParams } from "next/navigation";

import { loginAction, type AuthFormState } from "@/app/auth/actions";
import bgAtos29Image from "@/assets/bg-atos29.jpg";
import AuthShell from "@/components/auth/AuthShell";
import SubmitButton from "@/components/auth/SubmitButton";
import StatusBadge from "@/components/dashboard/StatusBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { previewAccessAccounts, type AppSession } from "@/lib/auth/session";

const initialState: AuthFormState = { status: "idle" };

function ErrorMessage({ state }: { state: AuthFormState }) {
  if (state.status !== "error" || !state.message) {
    return null;
  }

  return <div className="rounded-2xl border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">{state.message}</div>;
}

export default function LoginPageClient({ currentSession }: { currentSession: AppSession | null }) {
  const searchParams = useSearchParams();
  const [loginState, loginActionState] = useActionState(loginAction, initialState);
  const nextPath = searchParams.get("next") ?? "/";
  const previewAccess = previewAccessAccounts[0];

  return (
    <AuthShell
      eyebrow="Login"
      title="Entre com sua conta."
      description="Use seu email e sua senha para continuar."
      currentSession={currentSession}
      sessionBadgeLabel="Conectado"
      sessionBadgeTone="neutral"
      backgroundImage={bgAtos29Image}
      backgroundOverlayClassName="bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.50),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(37,99,235,0.45),transparent_42%),linear-gradient(180deg,rgba(30,64,175,0.38),rgba(15,23,42,0.62))]"
      showShellBackLink={false}
      showShellSessionControls={false}
      showIntroContent={false}
      mobileOverlayCard
    >
      <Card className="w-full border-border/70 shadow-medium">
        <CardHeader className="space-y-3">
          <div className="flex items-center justify-between gap-4">
            <Button asChild variant="ghost" size="sm" className="-ml-2 w-fit px-2 text-muted-foreground hover:text-foreground">
              <Link href="/">
                <ArrowLeft className="h-4 w-4" />
                Voltar ao site
              </Link>
            </Button>

            {currentSession ? (
              <div className="flex items-center gap-2">
                <StatusBadge label="Conectado" tone="neutral" />
                <Button asChild size="sm" variant="outline">
                  <Link href="/logout">
                    <LogOut className="h-4 w-4" />
                    Sair
                  </Link>
                </Button>
              </div>
            ) : null}
          </div>
          <CardTitle className="text-3xl">Entrar</CardTitle>
          <CardDescription>Informe seu email e sua senha para continuar.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form action={loginActionState} className="space-y-4">
            <input type="hidden" name="next" value={nextPath} />

            <div className="space-y-2">
              <Label htmlFor="login-email">Email</Label>
              <Input id="login-email" name="email" type="email" placeholder="voce@exemplo.com" autoComplete="email" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="login-password">Senha</Label>
              <Input
                id="login-password"
                name="password"
                type="password"
                placeholder="Sua senha"
                autoComplete="current-password"
              />
            </div>

            <ErrorMessage state={loginState} />

            <SubmitButton idleLabel="Fazer login" pendingLabel="Entrando..." className="w-full" />
          </form>

          <div className="flex flex-col gap-3 rounded-2xl border border-border/70 bg-background p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <p className="font-semibold text-foreground">Ainda nao tem acesso?</p>
            </div>
            <Button asChild variant="outline">
              <Link href="/signup">Abrir cadastro</Link>
            </Button>
          </div>

          <div className="rounded-2xl border border-border/70 bg-muted/40 p-4">
            <div className="mb-3 flex items-center gap-2 font-semibold text-foreground">
              <LockKeyhole className="h-4 w-4 text-primary" />
              Credenciais de teste
            </div>
            <p className="mb-3 text-sm text-muted-foreground">Se quiser testar a tela, use estes dados.</p>
            <div className="space-y-1 text-sm text-muted-foreground">
              <p>Email equipe: {previewAccess.email}</p>
              <p>Senha equipe: {previewAccess.password}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </AuthShell>
  );
}
