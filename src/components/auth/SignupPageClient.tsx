"use client";

import { useActionState } from "react";
import { CheckCircle2, UserPlus, UserRoundCheck } from "lucide-react";
import { useSearchParams } from "next/navigation";

import {
  requestMemberAccessAction,
  type AuthFormState,
  validateExistingMemberAction,
} from "@/app/auth/actions";
import AuthShell from "@/components/auth/AuthShell";
import SubmitButton from "@/components/auth/SubmitButton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { AppSession } from "@/lib/auth/session";

const initialState: AuthFormState = { status: "idle" };

function ErrorMessage({ state }: { state: AuthFormState }) {
  if (state.status !== "error" || !state.message) {
    return null;
  }

  return <div className="rounded-2xl border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">{state.message}</div>;
}

export default function SignupPageClient({ currentSession }: { currentSession: AppSession | null }) {
  const searchParams = useSearchParams();
  const [validationState, validationAction] = useActionState(validateExistingMemberAction, initialState);
  const [signupState, signupAction] = useActionState(requestMemberAccessAction, initialState);
  const nextPath = searchParams.get("next") ?? "/";

  return (
    <AuthShell
      eyebrow="Cadastro"
      title="Abra ou confirme seu acesso."
      description="Se seus dados ja estiverem no cadastro da igreja, confirme sua conta. Se ainda nao estiverem, comece por aqui."
      highlights={[
        "Quem ja esta no cadastro pode confirmar a conta com email, telefone e uma nova senha.",
        "Quem esta chegando agora pode abrir o primeiro acesso por aqui com senha propria.",
        "Depois disso, a igreja continua o acompanhamento com voce.",
      ]}
      currentSession={currentSession}
    >
      <Card className="w-full border-border/70 shadow-medium">
        <CardHeader className="space-y-3">
          <CardTitle className="text-3xl">Cadastro e validacao</CardTitle>
          <CardDescription>Escolha se voce vai confirmar uma conta existente ou abrir um novo cadastro.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Tabs defaultValue="existing" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="existing">Validar conta</TabsTrigger>
              <TabsTrigger value="new">Novo acesso</TabsTrigger>
            </TabsList>

            <TabsContent value="existing" className="space-y-5">
              <div className="rounded-2xl border border-border/70 bg-muted/40 p-4 text-sm text-muted-foreground">
                Use email e telefone que ja estejam no cadastro da igreja e defina a senha da sua conta.
              </div>

              <form action={validationAction} className="space-y-4">
                <input type="hidden" name="next" value={nextPath} />

                <div className="space-y-2">
                  <Label htmlFor="existing-email">Email cadastrado</Label>
                  <Input id="existing-email" name="email" type="email" placeholder="voce@exemplo.com" autoComplete="email" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="existing-phone">Telefone cadastrado</Label>
                  <Input id="existing-phone" name="phone" type="tel" placeholder="(21) 99999-0000" autoComplete="tel" />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="existing-password">Senha</Label>
                    <Input id="existing-password" name="password" type="password" placeholder="Crie sua senha" autoComplete="new-password" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="existing-password-confirmation">Confirmar senha</Label>
                    <Input
                      id="existing-password-confirmation"
                      name="passwordConfirmation"
                      type="password"
                      placeholder="Repita a senha"
                      autoComplete="new-password"
                    />
                  </div>
                </div>

                <ErrorMessage state={validationState} />

                <SubmitButton idleLabel="Validar e criar senha" pendingLabel="Validando cadastro..." className="w-full" />
              </form>
            </TabsContent>

            <TabsContent value="new" className="space-y-5">
              <div className="rounded-2xl border border-blue-200 bg-blue-50 p-4 text-sm text-blue-800">
                O cadastro novo abre seu primeiro acesso. Depois, a igreja confirma e completa as informacoes.
              </div>

              <form action={signupAction} className="space-y-4">
                <input type="hidden" name="next" value={nextPath} />

                <div className="space-y-2">
                  <Label htmlFor="signup-name">Nome completo</Label>
                  <Input id="signup-name" name="name" placeholder="Seu nome completo" autoComplete="name" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input id="signup-email" name="email" type="email" placeholder="voce@exemplo.com" autoComplete="email" />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="signup-phone">Telefone</Label>
                    <Input id="signup-phone" name="phone" type="tel" placeholder="(21) 99999-0000" autoComplete="tel" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-neighborhood">Bairro</Label>
                    <Input id="signup-neighborhood" name="neighborhood" placeholder="Seu bairro" autoComplete="address-level2" />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Senha</Label>
                    <Input id="signup-password" name="password" type="password" placeholder="Crie sua senha" autoComplete="new-password" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-password-confirmation">Confirmar senha</Label>
                    <Input
                      id="signup-password-confirmation"
                      name="passwordConfirmation"
                      type="password"
                      placeholder="Repita a senha"
                      autoComplete="new-password"
                    />
                  </div>
                </div>

                <ErrorMessage state={signupState} />

                <SubmitButton idleLabel="Criar acesso inicial" pendingLabel="Abrindo cadastro..." className="w-full" />
              </form>
            </TabsContent>
          </Tabs>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-border/70 bg-background p-4">
              <div className="mb-2 flex items-center gap-2 font-semibold text-foreground">
                <UserRoundCheck className="h-4 w-4 text-primary" />
                Conta validada
              </div>
              <p className="text-sm text-muted-foreground">Depois de validar, voce entra com email e senha e acompanha agenda, turma e inscricoes.</p>
            </div>

            <div className="rounded-2xl border border-border/70 bg-background p-4">
              <div className="mb-2 flex items-center gap-2 font-semibold text-foreground">
                <UserPlus className="h-4 w-4 text-primary" />
                Novo cadastro
              </div>
              <p className="text-sm text-muted-foreground">Seu acesso ja fica salvo com senha propria, enquanto a igreja continua o atendimento.</p>
            </div>
          </div>

          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
            <div className="mb-2 flex items-center gap-2 font-semibold">
              <CheckCircle2 className="h-4 w-4" />
              Importante
            </div>
            Se houver qualquer duvida no cadastro, a secretaria da igreja pode ajudar voce a concluir esse processo.
          </div>
        </CardContent>
      </Card>
    </AuthShell>
  );
}
