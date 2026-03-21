import { Clock3, CreditCard, ShieldCheck } from "lucide-react";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import KpiCard from "@/components/dashboard/KpiCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function FinancePage() {
  return (
    <DashboardLayout
      title="Financeiro"
      subtitle="Estamos preparando esta area."
      actions={[{ label: "Painel", href: "/dashboard", variant: "outline" }]}
    >
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <KpiCard title="Eventos pagos" value="Preparado" helper="A base ja considera cobrancas por evento." icon={CreditCard} />
        <KpiCard title="Retirada da loja" value="Preparada" helper="Pedidos e status ja estao organizados." icon={Clock3} />
        <KpiCard title="Controle" value="Em preparo" helper="Tesouraria e acompanhamento ainda estao sendo organizados." icon={ShieldCheck} />
      </section>

      <Card className="border-border/70">
        <CardHeader>
          <CardTitle className="text-xl">Quando entrar em uso</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <p>Conciliacao de pagamentos de eventos e loja.</p>
          <p>Dizimos e ofertas com regras proprias.</p>
          <p>Relatorios para a tesouraria.</p>
          <p>Permissoes especificas para o time financeiro.</p>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
