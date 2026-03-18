"use client";

import type { ChangeEvent } from "react";
import { useMemo, useRef, useState } from "react";
import {
  CheckCircle2,
  Download,
  FileSpreadsheet,
  HeartHandshake,
  TriangleAlert,
  Upload,
  UserPlus,
  Users,
} from "lucide-react";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DataTable from "@/components/dashboard/DataTable";
import KpiCard from "@/components/dashboard/KpiCard";
import StatusBadge from "@/components/dashboard/StatusBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Member, MemberStatus, MinistryInterest } from "@/lib/platform/types";

type MembersManagementClientProps = {
  initialMembers: Member[];
  ministryInterests: MinistryInterest[];
};

type ImportIssue = {
  line: number;
  message: string;
};

type ImportReport = {
  fileName: string;
  importedCount: number;
  skippedCount: number;
  issues: ImportIssue[];
};

type CsvMemberDraft = Partial<{
  name: string;
  email: string;
  phone: string;
  neighborhood: string;
  status: string;
  journeyStep: string;
  joinedAt: string;
  ebdClass: string;
  cell: string;
  ministries: string;
  birthday: string;
}>;

const TEMPLATE_HEADERS = [
  "nome",
  "email",
  "telefone",
  "bairro",
  "status",
  "jornada",
  "desde",
  "ebd",
  "celula",
  "ministerios",
  "aniversario",
];

const TEMPLATE_ROWS = [
  [
    "João da Silva",
    "joao.silva@igreja.local",
    "(21) 99999-0001",
    "Campo Grande",
    "Ativo",
    "Integrado na recepção",
    "Março de 2025",
    "Fundamentos",
    "Videira",
    "Recepção|Intercessão",
    "12 de abril",
  ],
  [
    "Marina Souza",
    "marina.souza@igreja.local",
    "(21) 99999-0002",
    "Cosmos",
    "Em integracao",
    "Chegando pela EBD",
    "Janeiro de 2026",
    "Primeiros Passos",
    "Cedro",
    "Louvor",
    "08 de novembro",
  ],
];

const HEADER_MAP: Record<string, keyof CsvMemberDraft> = {
  nome: "name",
  "nomecompleto": "name",
  member: "name",
  membro: "name",
  name: "name",
  email: "email",
  "e-mail": "email",
  telefone: "phone",
  phone: "phone",
  celular: "phone",
  bairro: "neighborhood",
  neighborhood: "neighborhood",
  status: "status",
  jornada: "journeyStep",
  jornadaatual: "journeyStep",
  journey: "journeyStep",
  journeystep: "journeyStep",
  desde: "joinedAt",
  joinedat: "joinedAt",
  ingressouem: "joinedAt",
  ingresso: "joinedAt",
  ebd: "ebdClass",
  turmaebd: "ebdClass",
  ebdclass: "ebdClass",
  celula: "cell",
  célula: "cell",
  cell: "cell",
  ministerios: "ministries",
  ministérios: "ministries",
  ministries: "ministries",
  aniversario: "birthday",
  aniversário: "birthday",
  birthday: "birthday",
};

function normalizeHeader(value: string) {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "");
}

function detectDelimiter(content: string) {
  const firstLine = content.split(/\r?\n/, 1)[0] ?? "";
  const commaCount = (firstLine.match(/,/g) ?? []).length;
  const semicolonCount = (firstLine.match(/;/g) ?? []).length;

  return semicolonCount > commaCount ? ";" : ",";
}

function parseCsv(content: string, delimiter: string) {
  const rows: string[][] = [];
  let currentRow: string[] = [];
  let currentCell = "";
  let inQuotes = false;

  for (let index = 0; index < content.length; index += 1) {
    const character = content[index];
    const nextCharacter = content[index + 1];

    if (character === '"') {
      if (inQuotes && nextCharacter === '"') {
        currentCell += '"';
        index += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (!inQuotes && character === delimiter) {
      currentRow.push(currentCell.trim());
      currentCell = "";
      continue;
    }

    if (!inQuotes && (character === "\n" || character === "\r")) {
      if (character === "\r" && nextCharacter === "\n") {
        index += 1;
      }

      currentRow.push(currentCell.trim());

      if (currentRow.some((cell) => cell.length > 0)) {
        rows.push(currentRow);
      }

      currentRow = [];
      currentCell = "";
      continue;
    }

    currentCell += character;
  }

  currentRow.push(currentCell.trim());
  if (currentRow.some((cell) => cell.length > 0)) {
    rows.push(currentRow);
  }

  return rows;
}

function normalizeStatus(status?: string): MemberStatus {
  const normalized = status
    ?.trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  if (!normalized) {
    return "Em integracao";
  }

  if (normalized === "ativo") {
    return "Ativo";
  }

  if (normalized === "em integracao" || normalized === "integracao") {
    return "Em integracao";
  }

  if (normalized === "em cuidado" || normalized === "cuidado") {
    return "Em cuidado";
  }

  return "Em integracao";
}

function splitMinistries(value?: string) {
  if (!value) {
    return [];
  }

  return value
    .split(/[|,;]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function formatCurrentMonthYear() {
  const label = new Intl.DateTimeFormat("pt-BR", {
    month: "long",
    year: "numeric",
  }).format(new Date());

  return label.charAt(0).toUpperCase() + label.slice(1);
}

function buildTemplateCsv() {
  const rows = [TEMPLATE_HEADERS, ...TEMPLATE_ROWS];
  return rows
    .map((row) => row.map((cell) => `"${cell.replaceAll('"', '""')}"`).join(";"))
    .join("\n");
}

function mapRowToDraft(headers: string[], row: string[]) {
  return headers.reduce<CsvMemberDraft>((draft, header, index) => {
    const mappedHeader = HEADER_MAP[normalizeHeader(header)];

    if (mappedHeader) {
      draft[mappedHeader] = row[index]?.trim() ?? "";
    }

    return draft;
  }, {});
}

function makeImportedMember(draft: CsvMemberDraft, line: number): Member {
  return {
    id: `csv-${Date.now()}-${line}`,
    name: draft.name?.trim() || "",
    email: draft.email?.trim().toLowerCase() || "",
    phone: draft.phone?.trim() || "Não informado",
    neighborhood: draft.neighborhood?.trim() || "Não informado",
    status: normalizeStatus(draft.status),
    journeyStep: draft.journeyStep?.trim() || "Importado via CSV",
    joinedAt: draft.joinedAt?.trim() || formatCurrentMonthYear(),
    ebdClass: draft.ebdClass?.trim() || "Sem turma definida",
    cell: draft.cell?.trim() || "Sem célula definida",
    ministries: splitMinistries(draft.ministries),
    birthday: draft.birthday?.trim() || "Não informado",
  };
}

export default function MembersManagementClient({
  initialMembers,
  ministryInterests,
}: MembersManagementClientProps) {
  const [allMembers, setAllMembers] = useState(initialMembers);
  const [lastImportedMembers, setLastImportedMembers] = useState<Member[]>([]);
  const [report, setReport] = useState<ImportReport | null>(null);
  const [isImporting, setIsImporting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const activeMembers = useMemo(
    () => allMembers.filter((member) => member.status === "Ativo").length,
    [allMembers],
  );
  const integrationFlow = useMemo(
    () => allMembers.filter((member) => member.status === "Em integracao").length,
    [allMembers],
  );
  const careFlow = useMemo(
    () => allMembers.filter((member) => member.status === "Em cuidado").length,
    [allMembers],
  );

  async function handleCsvImport(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    setIsImporting(true);

    try {
      const content = (await file.text()).replace(/^\uFEFF/, "");
      const delimiter = detectDelimiter(content);
      const rows = parseCsv(content, delimiter);

      if (rows.length < 2) {
        setReport({
          fileName: file.name,
          importedCount: 0,
          skippedCount: 1,
          issues: [{ line: 1, message: "O arquivo precisa ter cabeçalho e pelo menos uma linha de dados." }],
        });
        setLastImportedMembers([]);
        return;
      }

      const [headers, ...dataRows] = rows;
      const knownHeaders = headers.filter((header) => HEADER_MAP[normalizeHeader(header)]);

      if (!knownHeaders.length) {
        setReport({
          fileName: file.name,
          importedCount: 0,
          skippedCount: dataRows.length,
          issues: [
            {
              line: 1,
              message: "Nenhuma coluna reconhecida. Use cabeçalhos como nome, email, telefone, bairro, status, ebd e celula.",
            },
          ],
        });
        setLastImportedMembers([]);
        return;
      }

      const existingEmails = new Set(allMembers.map((member) => member.email.trim().toLowerCase()));
      const importedBatch: Member[] = [];
      const issues: ImportIssue[] = [];

      dataRows.forEach((row, index) => {
        const line = index + 2;
        const draft = mapRowToDraft(headers, row);
        const name = draft.name?.trim();
        const email = draft.email?.trim().toLowerCase();

        if (!name) {
          issues.push({ line, message: "Linha ignorada: o campo nome é obrigatório." });
          return;
        }

        if (!email) {
          issues.push({ line, message: `Linha de ${name} ignorada: o campo email é obrigatório.` });
          return;
        }

        if (existingEmails.has(email)) {
          issues.push({ line, message: `Linha de ${name} ignorada: já existe um membro com o email ${email}.` });
          return;
        }

        const member = makeImportedMember(draft, line);
        existingEmails.add(member.email);
        importedBatch.push(member);
      });

      if (importedBatch.length) {
        setAllMembers((currentMembers) => [...importedBatch, ...currentMembers]);
      }

      setLastImportedMembers(importedBatch);
      setReport({
        fileName: file.name,
        importedCount: importedBatch.length,
        skippedCount: issues.length,
        issues,
      });
    } finally {
      setIsImporting(false);
      event.target.value = "";
    }
  }

  function handleDownloadTemplate() {
    const blob = new Blob([buildTemplateCsv()], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "modelo-importacao-membros.csv";
    anchor.click();
    URL.revokeObjectURL(url);
  }

  function resetImportedBatch() {
    if (!lastImportedMembers.length) {
      return;
    }

    const importedIds = new Set(lastImportedMembers.map((member) => member.id));
    setAllMembers((currentMembers) => currentMembers.filter((member) => !importedIds.has(member.id)));
    setLastImportedMembers([]);
    setReport(null);
  }

  return (
    <DashboardLayout
      title="Gestão de membros"
      subtitle="Cadastre pessoas, acompanhe integração, conecte com células, EBD e ministérios e mantenha o cuidado pastoral visível."
      actions={[
        { label: "Ver calendário", href: "/dashboard/calendar", variant: "outline" },
        { label: "Ver celulas", href: "/dashboard/cells", variant: "secondary" },
      ]}
    >
      <section className="grid gap-4 md:grid-cols-3">
        <KpiCard
          title="Membros ativos"
          value={String(activeMembers)}
          helper="Pessoas já consolidadas no fluxo de cuidado e serviço."
          icon={Users}
        />
        <KpiCard
          title="Em integracao"
          value={String(integrationFlow)}
          helper="Novos membros que ainda precisam concluir passos iniciais."
          icon={UserPlus}
        />
        <KpiCard
          title="Em cuidado"
          value={String(careFlow)}
          helper="Acompanhamentos que não podem sumir do radar da liderança."
          icon={HeartHandshake}
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
        <div className="space-y-6">
          <Card className="border-border/70">
            <CardHeader className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div className="space-y-2">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <FileSpreadsheet className="h-5 w-5 text-primary" />
                  Importar membros por CSV
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Aceita arquivo com separador por ponto e vírgula ou vírgula. Colunas reconhecidas: nome, email, telefone, bairro, status, jornada, desde, ebd, celula, ministerios e aniversario.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button type="button" variant="outline" onClick={handleDownloadTemplate}>
                  <Download className="mr-2 h-4 w-4" />
                  Baixar modelo
                </Button>
                <Button type="button" onClick={() => fileInputRef.current?.click()} disabled={isImporting}>
                  <Upload className="mr-2 h-4 w-4" />
                  {isImporting ? "Importando..." : "Selecionar CSV"}
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv,text/csv"
                  className="hidden"
                  onChange={handleCsvImport}
                />
              </div>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-muted-foreground">
              <div className="flex flex-wrap gap-2">
                {TEMPLATE_HEADERS.map((header) => (
                  <StatusBadge key={header} label={header} tone="info" />
                ))}
              </div>

              <div className="rounded-2xl border border-dashed border-border bg-muted/40 p-4">
                <p className="font-medium text-foreground">Formato sugerido para ministérios</p>
                <p className="mt-1">Use múltiplos ministérios no mesmo campo separados por `|`, vírgula ou ponto e vírgula.</p>
              </div>

              <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-amber-800">
                <p className="font-medium">Estado atual</p>
                <p className="mt-1">
                  O importador já incorpora os registros na grade da tela, mas ainda não grava em banco. Isso entra na próxima etapa quando ligarmos a persistência real.
                </p>
              </div>
            </CardContent>
          </Card>

          <DataTable
            data={allMembers}
            columns={[
              {
                header: "Nome",
                cell: (member) => (
                  <div>
                    <p className="font-semibold text-foreground">{member.name}</p>
                    <p className="text-xs text-muted-foreground">{member.email}</p>
                  </div>
                ),
              },
              {
                header: "Jornada",
                cell: (member) => (
                  <div>
                    <p className="text-sm text-foreground">{member.journeyStep}</p>
                    <p className="text-xs text-muted-foreground">Desde {member.joinedAt}</p>
                  </div>
                ),
              },
              {
                header: "Conexões",
                cell: (member) => (
                  <div className="space-y-1 text-sm">
                    <p>{member.ebdClass}</p>
                    <p className="text-muted-foreground">{member.cell}</p>
                  </div>
                ),
              },
              {
                header: "Status",
                className: "w-[150px]",
                cell: (member) => (
                  <StatusBadge
                    label={member.status}
                    tone={member.status === "Ativo" ? "success" : member.status === "Em integracao" ? "warning" : "neutral"}
                  />
                ),
              },
            ]}
          />
        </div>

        <div className="space-y-6">
          <Card className="border-border/70">
            <CardHeader>
              <CardTitle className="text-xl">Resultado da importação</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {report ? (
                <>
                  <div className="rounded-2xl border border-border/70 bg-background p-4">
                    <p className="font-semibold text-foreground">{report.fileName}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <StatusBadge label={`${report.importedCount} importados`} tone="success" />
                      <StatusBadge label={`${report.skippedCount} ignorados`} tone={report.skippedCount ? "warning" : "info"} />
                      {lastImportedMembers.length ? <StatusBadge label="Sessão atual" tone="info" /> : null}
                    </div>
                  </div>

                  {report.issues.length ? (
                    <div className="space-y-3">
                      {report.issues.map((issue) => (
                        <div
                          key={`${issue.line}-${issue.message}`}
                          className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800"
                        >
                          <div className="flex items-start gap-2">
                            <TriangleAlert className="mt-0.5 h-4 w-4 flex-shrink-0" />
                            <span>
                              Linha {issue.line}: {issue.message}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0" />
                        <span>Importação concluída sem conflitos.</span>
                      </div>
                    </div>
                  )}

                  {lastImportedMembers.length ? (
                    <Button type="button" variant="outline" className="w-full" onClick={resetImportedBatch}>
                      Remover lote importado desta sessão
                    </Button>
                  ) : null}
                </>
              ) : (
                <div className="rounded-2xl border border-dashed border-border bg-muted/30 p-4 text-sm text-muted-foreground">
                  Nenhum CSV importado nesta sessão ainda.
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="border-border/70">
            <CardHeader>
              <CardTitle className="text-xl">Interesse ministerial</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {ministryInterests.map((interest) => (
                <div key={interest.id} className="rounded-2xl border border-border/70 bg-background p-4">
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <p className="font-semibold text-foreground">{interest.memberName}</p>
                    <StatusBadge
                      label={interest.status}
                      tone={interest.status === "Integrado" ? "success" : interest.status === "Em conversa" ? "warning" : "info"}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">{interest.ministry}</p>
                  <p className="mt-2 text-xs text-muted-foreground">Disponibilidade: {interest.availability}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>
    </DashboardLayout>
  );
}


