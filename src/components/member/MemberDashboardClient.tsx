"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { BookOpenCheck, CalendarClock, Church, ClipboardCheck, HeartHandshake, LogOut, ShoppingBag, Users } from "lucide-react";

import KpiCard from "@/components/dashboard/KpiCard";
import StatusBadge from "@/components/dashboard/StatusBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { AppSession } from "@/lib/auth/session";
import type { AvailableCellOption, FamilyMember, MemberPortalSnapshot } from "@/lib/platform/types";

type FamilyDraft = {
  name: string;
  relationship: string;
  birthday: string;
  phone: string;
  linkedToCell: boolean;
};

function getRegistrationTone(status: MemberPortalSnapshot["enrolledEvents"][number]["status"]) {
  if (status === "Confirmada") {
    return "success" as const;
  }

  return status === "Pendente" ? "warning" : "neutral";
}

export default function MemberDashboardClient({
  snapshot,
  session,
}: {
  snapshot: MemberPortalSnapshot;
  session: AppSession;
}) {
  const [familyMembers, setFamilyMembers] = useState(snapshot.familyMembers);
  const [familyDraft, setFamilyDraft] = useState<FamilyDraft>({
    name: "",
    relationship: "",
    birthday: "",
    phone: "",
    linkedToCell: true,
  });
  const [familyMessage, setFamilyMessage] = useState<string | null>(null);
  const [cellConnection, setCellConnection] = useState(snapshot.cellConnection);
  const [cellMessage, setCellMessage] = useState<string | null>(null);

  const linkedFamilyCount = familyMembers.filter((familyMember) => familyMember.linkedToCell).length;
  const confirmedAssignments = snapshot.servingAssignments.filter((assignment) => assignment.status === "Confirmado").length;
  const hasValidatedAccount = session.source !== "signup" || snapshot.authAccess.accountStatus === "Conta validada";

  function updateDraft(field: keyof FamilyDraft, value: string | boolean) {
    setFamilyDraft((current) => ({ ...current, [field]: value }));
  }

  function handleAddFamilyMember(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!familyDraft.name || !familyDraft.relationship || !familyDraft.phone) {
      setFamilyMessage("Preencha nome, parentesco e telefone para adicionar o familiar.");
      return;
    }

    const newFamilyMember: FamilyMember = {
      id: `family-${Date.now()}`,
      name: familyDraft.name,
      relationship: familyDraft.relationship,
      birthday: familyDraft.birthday || "A informar",
      phone: familyDraft.phone,
      status: "Em acompanhamento",
      linkedToCell: familyDraft.linkedToCell && cellConnection.id !== "cell-pending",
    };

    setFamilyMembers((current) => [...current, newFamilyMember]);
    setFamilyDraft({
      name: "",
      relationship: "",
      birthday: "",
      phone: "",
      linkedToCell: cellConnection.id !== "cell-pending",
    });
    setFamilyMessage("Familiar adicionado. O passo seguinte e persistir isso na base real.");
  }

  function handleCellRequest(option: AvailableCellOption) {
    setCellConnection({
      id: option.id,
      name: option.name,
      leaders: option.leaders,
      schedule: option.schedule,
      neighborhood: option.neighborhood,
      memberCount: option.memberCount,
      householdLinkedCount: linkedFamilyCount,
      requestStatus: "Solicitacao enviada para validacao da lideranca da celula.",
    });
    setCellMessage(`Solicitacao preparada para a celula ${option.name}.`);
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="border-b border-border/80 bg-background/95">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-primary p-3 text-primary-foreground shadow-soft">
              <Church className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Portal do membro</p>
              <p className="text-sm text-muted-foreground">{snapshot.profile.name}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button asChild variant="outline" size="sm">
              <Link href="/calendar">Calendario</Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link href="/">Voltar ao site</Link>
            </Button>
            <Button asChild size="sm">
              <Link href="/logout">
                <LogOut className="mr-2 h-4 w-4" />
                Sair
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-8 px-4 py-8">
        <section className="rounded-[28px] bg-primary px-6 py-8 text-primary-foreground shadow-strong">
          <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
            <div className="space-y-4">
              <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em]">
                Area pessoal e familiar
              </span>
              <h1 className="text-4xl font-semibold tracking-tight">O membro ve o proprio painel, nao a gestao da igreja.</h1>
              <p className="max-w-2xl text-primary-foreground/85">
                Perfil, familia, EBD, escalas, celula, calendario e comprovacao de inscricoes ficam no mesmo lugar.
              </p>
              <div className="flex flex-wrap gap-2">
                <StatusBadge label={snapshot.profile.status} tone="success" />
                <StatusBadge label={snapshot.authAccess.accountStatus} tone={hasValidatedAccount ? "success" : "warning"} />
                <StatusBadge label={cellConnection.name} tone="info" />
              </div>
            </div>

            <div className="rounded-3xl border border-white/20 bg-white/10 p-5">
              <p className="text-sm uppercase tracking-[0.18em] text-primary-foreground/75">Conta e acesso</p>
              <h2 className="mt-2 text-2xl font-semibold">{session.email}</h2>
              <p className="mt-2 text-sm text-primary-foreground/80">{snapshot.authAccess.loginHint}</p>
              <div className="mt-4 space-y-2 text-sm text-primary-foreground/85">
                <p>Bairro: {snapshot.profile.neighborhood}</p>
                <p>Turma atual: {snapshot.currentClass.name}</p>
                <p>Familia ligada a celula: {linkedFamilyCount} familiar(es)</p>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <KpiCard title="Turma atual" value={snapshot.currentClass.name} helper={snapshot.currentClass.schedule} icon={BookOpenCheck} />
          <KpiCard title="Familia no portal" value={String(familyMembers.length + 1)} helper={`${linkedFamilyCount} familiar(es) ligados a celula.`} icon={Users} />
          <KpiCard title="Escalas confirmadas" value={String(confirmedAssignments)} helper="Visiveis no painel do membro." icon={HeartHandshake} />
          <KpiCard title="Eventos inscritos" value={String(snapshot.enrolledEvents.length)} helper="Com status e comprovacao no proprio portal." icon={CalendarClock} />
        </section>

        {!hasValidatedAccount ? (
          <div className="rounded-3xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-800">
            Seu cadastro inicial ja entrou no portal do membro, mas ainda depende de validacao para completar dados importados e historico.
          </div>
        ) : null}

        <section className="grid gap-6 xl:grid-cols-[1fr_1fr]">
          <Card className="border-border/70">
            <CardHeader>
              <CardTitle className="text-xl">Meu perfil</CardTitle>
              <CardDescription>Informacoes usadas para integracao pastoral, EBD, eventos e ministerios.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-border/70 bg-background p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Contato</p>
                <p className="mt-2 font-semibold text-foreground">{snapshot.profile.email}</p>
                <p className="text-sm text-muted-foreground">{snapshot.profile.phone}</p>
              </div>
              <div className="rounded-2xl border border-border/70 bg-background p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Jornada</p>
                <p className="mt-2 font-semibold text-foreground">{snapshot.profile.journeyStep}</p>
                <p className="text-sm text-muted-foreground">Membro desde {snapshot.profile.joinedAt}</p>
              </div>
              <div className="rounded-2xl border border-border/70 bg-background p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Bairro e aniversario</p>
                <p className="mt-2 font-semibold text-foreground">{snapshot.profile.neighborhood}</p>
                <p className="text-sm text-muted-foreground">{snapshot.profile.birthday}</p>
              </div>
              <div className="rounded-2xl border border-border/70 bg-background p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Ministerios atuais</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {snapshot.profile.ministries.length ? (
                    snapshot.profile.ministries.map((ministry) => <StatusBadge key={ministry} label={ministry} tone="info" />)
                  ) : (
                    <p className="text-sm text-muted-foreground">Ainda sem ministerio ativo.</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/70">
            <CardHeader>
              <CardTitle className="text-xl">Minha celula</CardTitle>
              <CardDescription>O portal ajuda a lideranca a enxergar quantas pessoas realmente estao conectadas a celula.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-2xl border border-border/70 bg-background p-4">
                <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold text-foreground">{cellConnection.name}</p>
                    <p className="text-sm text-muted-foreground">{cellConnection.neighborhood}</p>
                  </div>
                  <StatusBadge label={`${cellConnection.memberCount + cellConnection.householdLinkedCount} pessoas`} tone="info" />
                </div>
                <p className="text-sm text-muted-foreground">Lideres: {cellConnection.leaders}</p>
                <p className="text-sm text-muted-foreground">Agenda: {cellConnection.schedule}</p>
                <p className="mt-2 text-sm text-muted-foreground">{cellConnection.requestStatus}</p>
              </div>

              {cellMessage ? <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">{cellMessage}</div> : null}

              <div className="grid gap-4">
                {snapshot.availableCells.map((option) => {
                  const isCurrent = option.id === cellConnection.id;

                  return (
                    <div key={option.id} className="rounded-2xl border border-border/70 bg-background p-4">
                      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <p className="font-semibold text-foreground">{option.name}</p>
                          <p className="text-sm text-muted-foreground">{option.neighborhood}</p>
                        </div>
                        <StatusBadge label={`${option.vacancies} vagas`} tone={option.vacancies > 3 ? "success" : "warning"} />
                      </div>
                      <p className="text-sm text-muted-foreground">{option.leaders}</p>
                      <p className="text-sm text-muted-foreground">{option.schedule}</p>
                      <p className="text-sm text-muted-foreground">{option.focus}</p>
                      <Button type="button" variant={isCurrent ? "secondary" : "outline"} className="mt-4 w-full" disabled={isCurrent} onClick={() => handleCellRequest(option)}>
                        {isCurrent ? "Vinculo atual" : "Solicitar vinculo"}
                      </Button>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1fr_1fr]">
          <Card className="border-border/70">
            <CardHeader>
              <CardTitle className="text-xl">Familia vinculada</CardTitle>
              <CardDescription>Adicione familiares para o cuidado pastoral e para o mapa real da celula.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="grid gap-4">
                {familyMembers.length ? (
                  familyMembers.map((familyMember) => (
                    <div key={familyMember.id} className="rounded-2xl border border-border/70 bg-background p-4">
                      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <p className="font-semibold text-foreground">{familyMember.name}</p>
                          <p className="text-sm text-muted-foreground">{familyMember.relationship}</p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <StatusBadge label={familyMember.status} tone={familyMember.status === "Ativo" ? "success" : "warning"} />
                          <StatusBadge label={familyMember.linkedToCell ? "Na celula" : "Sem vinculo"} tone="info" />
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{familyMember.phone}</p>
                      <p className="text-xs text-muted-foreground">Aniversario: {familyMember.birthday}</p>
                    </div>
                  ))
                ) : (
                  <div className="rounded-2xl border border-dashed border-border p-4 text-sm text-muted-foreground">
                    Nenhum familiar adicionado ainda.
                  </div>
                )}
              </div>

              <form onSubmit={handleAddFamilyMember} className="space-y-4 rounded-2xl border border-border/70 bg-muted/30 p-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="family-name">Nome do familiar</Label>
                    <Input id="family-name" value={familyDraft.name} onChange={(event) => updateDraft("name", event.target.value)} placeholder="Nome completo" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="family-relationship">Parentesco</Label>
                    <Input id="family-relationship" value={familyDraft.relationship} onChange={(event) => updateDraft("relationship", event.target.value)} placeholder="Esposa, filho, mae..." />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="family-birthday">Aniversario</Label>
                    <Input id="family-birthday" value={familyDraft.birthday} onChange={(event) => updateDraft("birthday", event.target.value)} placeholder="12 de abril" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="family-phone">Telefone</Label>
                    <Input id="family-phone" value={familyDraft.phone} onChange={(event) => updateDraft("phone", event.target.value)} placeholder="(21) 99999-0000" />
                  </div>
                </div>

                <label className="flex items-center gap-2 text-sm text-muted-foreground">
                  <input type="checkbox" checked={familyDraft.linkedToCell} onChange={(event) => updateDraft("linkedToCell", event.target.checked)} />
                  Vincular esse familiar a mesma celula
                </label>

                {familyMessage ? <div className="rounded-2xl border border-border/70 bg-background px-4 py-3 text-sm text-muted-foreground">{familyMessage}</div> : null}

                <Button type="submit" className="w-full">
                  Adicionar familiar
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card className="border-border/70">
            <CardHeader>
              <CardTitle className="text-xl">Escala e agenda</CardTitle>
              <CardDescription>O lider escala, o membro acompanha, e o calendario comum fica visivel no mesmo painel.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {snapshot.servingAssignments.map((assignment) => (
                <div key={assignment.id} className="rounded-2xl border border-border/70 bg-background p-4">
                  <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold text-foreground">{assignment.ministry}</p>
                      <p className="text-sm text-muted-foreground">{assignment.role}</p>
                    </div>
                    <StatusBadge label={assignment.status} tone={assignment.status === "Confirmado" ? "success" : "warning"} />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {assignment.date} • {assignment.time}
                  </p>
                  <p className="text-sm text-muted-foreground">Lider responsavel: {assignment.leader}</p>
                </div>
              ))}

              {snapshot.nextCalendarItems.map((entry) => (
                <div key={entry.id} className="rounded-2xl border border-border/70 bg-background p-4">
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <p className="font-semibold text-foreground">{entry.title}</p>
                    <StatusBadge label={entry.category} tone="info" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {entry.date} • {entry.time}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1fr_1fr]">
          <Card className="border-border/70">
            <CardHeader>
              <CardTitle className="text-xl">Eventos e comprovacoes</CardTitle>
              <CardDescription>Inscricoes do membro ficam visiveis aqui com pagamento e codigo de confirmacao.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {snapshot.enrolledEvents.length ? (
                snapshot.enrolledEvents.map((registration) => (
                  <div key={registration.id} className="rounded-2xl border border-border/70 bg-background p-4">
                    <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="font-semibold text-foreground">{registration.eventTitle}</p>
                        <p className="text-sm text-muted-foreground">Solicitado em {registration.requestedAt}</p>
                      </div>
                      <StatusBadge label={registration.status} tone={getRegistrationTone(registration.status)} />
                    </div>
                    <p className="text-sm text-muted-foreground">Pagamento: {registration.paymentStatus}</p>
                    <p className="text-sm text-muted-foreground">Comprovacao: {registration.confirmationCode ?? "Gerado apos confirmacao"}</p>
                  </div>
                ))
              ) : (
                <div className="rounded-2xl border border-dashed border-border p-4 text-sm text-muted-foreground">
                  Nenhuma inscricao registrada ainda.
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="border-border/70">
            <CardHeader>
              <CardTitle className="text-xl">EBD, materiais e pedidos</CardTitle>
              <CardDescription>Check-in da aula, material do professor e pedidos da loja continuam separados da gestao.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-2xl border border-border/70 bg-background p-4">
                <p className="text-sm uppercase tracking-[0.18em] text-muted-foreground">Turma atual</p>
                <p className="mt-2 text-2xl font-semibold text-foreground">{snapshot.currentClass.name}</p>
                <p className="mt-2 text-sm text-muted-foreground">{snapshot.currentClass.nextLesson}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <StatusBadge label={snapshot.currentClass.teacher} tone="info" />
                  <StatusBadge label={snapshot.currentClass.room} tone="neutral" />
                  <StatusBadge label={snapshot.currentClass.attendanceRate} tone="success" />
                </div>
              </div>

              <div className="rounded-2xl border border-border/70 bg-background p-4">
                <div className="mb-2 flex items-center gap-2 font-semibold text-foreground">
                  <ClipboardCheck className="h-4 w-4 text-primary" />
                  Codigo de check-in
                </div>
                <p className="text-sm text-muted-foreground">{snapshot.attendanceCode}</p>
              </div>

              {snapshot.materials.map((material) => (
                <div key={material} className="rounded-2xl border border-border/70 bg-background p-4">
                  <p className="font-semibold text-foreground">{material}</p>
                  <p className="mt-1 text-sm text-muted-foreground">Material liberado pelo professor para a turma atual.</p>
                </div>
              ))}

              {snapshot.orders.map((order) => (
                <div key={order.id} className="rounded-2xl border border-border/70 bg-background p-4">
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <p className="font-semibold text-foreground">{order.productName}</p>
                    <StatusBadge label={order.status} tone={order.status === "Pronto para retirada" ? "success" : "info"} />
                  </div>
                  <p className="text-sm text-muted-foreground">Quantidade: {order.quantity}</p>
                  <p className="text-sm text-muted-foreground">Retirada prevista: {order.pickupDate}</p>
                </div>
              ))}

              <div className="rounded-2xl border border-primary/20 bg-primary/10 p-4 text-sm text-foreground">
                <div className="mb-2 flex items-center gap-2 font-semibold">
                  <ShoppingBag className="h-4 w-4 text-primary" />
                  Proximo passo real
                </div>
                Persistir esses fluxos em banco e integrar pagamentos para eventos e loja.
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}
