"use client";

import Link from "next/link";
import { useActionState } from "react";
import { LockKeyhole, UsersRound } from "lucide-react";
import { useSearchParams } from "next/navigation";

import { loginAction, type AuthFormState } from "@/app/auth/actions";
import AuthShell from "@/components/auth/AuthShell";
import SubmitButton from "@/components/auth/SubmitButton";
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
      title="Uma unica entrada para toda a plataforma."
      description="Voce faz login uma vez. O sistema detecta suas roles acumulativas e envia voce para a area correta."
      highlights={[
        "Membro comum vai para o portal pessoal.",
        "Admin, lideres, sublideres e professores vao para o dashboard conforme seu conjunto de roles.",
        "Uma mesma pessoa pode acumular mais de um papel ao mesmo tempo.",
      ]}
      currentSession={currentSession}
    >
      <Card className="w-full border-border/70 shadow-medium">
        <CardHeader className="space-y-3">
          <CardTitle className="text-3xl">Login da plataforma</CardTitle>
          <CardDescription>Use email e telefone cadastrado ou, no caso da equipe tecnica, email e chave de acesso.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="rounded-2xl border border-border/70 bg-muted/40 p-4 text-sm text-muted-foreground">
            O redirecionamento e automatico. Se voce for membro comum, vai para seu portal. Se tiver roles de lideranca, ensino ou admin, vai para o dashboard.
          </div>

          <form action={loginActionState} className="space-y-4">
            <input type="hidden" name="next" value={nextPath} />

            <div className="space-y-2">
              <Label htmlFor="login-email">Email</Label>
              <Input id="login-email" name="email" type="email" placeholder="voce@exemplo.com" autoComplete="email" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="login-credential">Telefone cadastrado ou chave de acesso</Label>
              <Input
                id="login-credential"
                name="credential"
                type="text"
                placeholder="(21) 99999-0000 ou sua chave"
                autoComplete="off"
              />
            </div>

            <ErrorMessage state={loginState} />

            <SubmitButton idleLabel="Fazer login" pendingLabel="Entrando..." className="w-full" />
          </form>

          <div className="flex flex-col gap-3 rounded-2xl border border-border/70 bg-background p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <p className="font-semibold text-foreground">Ainda nao tem acesso?</p>
              <p className="text-sm text-muted-foreground">Abra seu cadastro ou valide uma conta ja importada.</p>
            </div>
            <Button asChild variant="outline">
              <Link href="/signup">Solicitar acesso</Link>
            </Button>
          </div>

          <div className="rounded-2xl border border-border/70 bg-primary/5 p-4 text-sm text-muted-foreground">
            <div className="mb-2 flex items-center gap-2 font-semibold text-foreground">
              <UsersRound className="h-4 w-4 text-primary" />
              Roles suportadas
            </div>
            Admin, lider de ministerio, sublider de ministerio, lider de celula, professor da EBD e membro comum.
          </div>

          <div className="rounded-2xl border border-border/70 bg-muted/40 p-4">
            <div className="mb-3 flex items-center gap-2 font-semibold text-foreground">
              <LockKeyhole className="h-4 w-4 text-primary" />
              Acesso demo da equipe
            </div>
            <div className="space-y-1 text-sm text-muted-foreground">
              <p>Email: {previewAccess.email}</p>
              <p>Chave: {previewAccess.accessKey}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </AuthShell>
  );
}
