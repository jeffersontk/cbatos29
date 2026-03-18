import { Clock3, CreditCard, ShieldCheck } from "lucide-react";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import KpiCard from "@/components/dashboard/KpiCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function FinancePage() {
  return (
    <DashboardLayout
      title="Financeiro em fase futura"
      subtitle="Você deixou o financeiro para um próximo ciclo, então esta área foi mantida como trilha técnica e de produto, sem misturar isso com a v1."
      actions={[{ label: "Voltar à visão geral", href: "/dashboard", variant: "outline" }]}
    >
      <section className="grid gap-4 md:grid-cols-3">
        <KpiCard title="Cobrança de eventos" value="Preparado" helper="Fluxo de eventos já considera gratuitos e pagos." icon={CreditCard} />
        <KpiCard title="Loja com retirada" value="Preparada" helper="Pedidos e status já estão modelados para evoluir." icon={Clock3} />
        <KpiCard title="Governança" value="Necessária" helper="Financeiro exige permissões e rastreabilidade mais duras." icon={ShieldCheck} />
      </section>

      <Card className="border-border/70">
        <CardHeader>
          <CardTitle className="text-xl">Quando abrir este módulo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <p>Conciliação de pagamentos de eventos e loja.</p>
          <p>Fluxo de dízimos e ofertas com regras próprias e auditoria.</p>
          <p>Relatórios, centros de custo e exportação para a tesouraria.</p>
          <p>Permissões específicas para tesouraria sem expor toda a plataforma.</p>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
