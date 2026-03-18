import { Package, ShoppingBag, Truck } from "lucide-react";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DataTable from "@/components/dashboard/DataTable";
import KpiCard from "@/components/dashboard/KpiCard";
import StatusBadge from "@/components/dashboard/StatusBadge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { storeOrders, storeProducts } from "@/lib/platform/data";

export default function StorePage() {
  const readyOrders = storeOrders.filter((order) => order.status === "Pronto para retirada").length;

  return (
    <DashboardLayout
      title="Loja online com retirada"
      subtitle="A loja entra como operacao leve: catalogo, pedido, separacao e retirada concentrada na igreja."
      actions={[
        { label: "Ver calendario", href: "/dashboard/calendar", variant: "outline" },
        { label: "Ver membros", href: "/dashboard/members", variant: "secondary" },
      ]}
    >
      <section className="grid gap-4 md:grid-cols-3">
        <KpiCard title="Produtos ativos" value={String(storeProducts.length)} helper="Catalogo inicial para pedidos simples." icon={ShoppingBag} />
        <KpiCard title="Pedidos em aberto" value={String(storeOrders.length)} helper="Pedidos que precisam ser separados e entregues." icon={Package} />
        <KpiCard title="Prontos para retirada" value={String(readyOrders)} helper="Fluxo alinhado com o calendario da igreja." icon={Truck} />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_1.2fr]">
        <Card className="border-border/70">
          <CardHeader>
            <CardTitle className="text-xl">Catalogo atual</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {storeProducts.map((product) => (
              <div key={product.id} className="rounded-2xl border border-border/70 bg-background p-4">
                <div className="mb-3 flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-foreground">{product.name}</p>
                    <p className="text-sm text-muted-foreground">{product.category}</p>
                  </div>
                  <StatusBadge label={`${product.stock} un.`} tone={product.stock <= 12 ? "warning" : "success"} />
                </div>
                <p className="text-sm text-muted-foreground">{product.price}</p>
                <p className="mt-1 text-xs text-muted-foreground">Retirada: {product.pickupWindow}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <DataTable
          data={storeOrders}
          columns={[
            {
              header: "Membro",
              cell: (order) => <span className="font-semibold text-foreground">{order.memberName}</span>,
            },
            {
              header: "Produto",
              cell: (order) => (
                <div>
                  <p className="text-sm text-foreground">{order.productName}</p>
                  <p className="text-xs text-muted-foreground">Qtd. {order.quantity}</p>
                </div>
              ),
            },
            {
              header: "Status",
              cell: (order) => (
                <StatusBadge
                  label={order.status}
                  tone={order.status === "Pronto para retirada" ? "success" : order.status === "Separando" ? "warning" : "info"}
                />
              ),
            },
            {
              header: "Retirada",
              cell: (order) => <span className="text-sm text-muted-foreground">{order.pickupDate}</span>,
            },
          ]}
        />
      </section>
    </DashboardLayout>
  );
}
