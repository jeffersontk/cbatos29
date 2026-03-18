import Link from "next/link";
import { Calendar, Church, GraduationCap, Home, LayoutDashboard, ShoppingBag, Sparkles, UserRound, Users, Wallet } from "lucide-react";

import { NavLink } from "@/components/NavLink";
import StatusBadge from "@/components/dashboard/StatusBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAuthSession } from "@/lib/auth/server";
import { canAccessDashboardPath, getRoleLabels } from "@/lib/auth/session";

const navItems = [
  { href: "/dashboard", label: "Visao geral", icon: LayoutDashboard, exact: true },
  { href: "/dashboard/members", label: "Membros", icon: Users, exact: true },
  { href: "/dashboard/ebd", label: "EBD", icon: GraduationCap, exact: true },
  { href: "/dashboard/events", label: "Eventos", icon: Sparkles, exact: true },
  { href: "/dashboard/cells", label: "Celulas", icon: Home, exact: true },
  { href: "/dashboard/calendar", label: "Calendario", icon: Calendar, exact: true },
  { href: "/dashboard/store", label: "Loja", icon: ShoppingBag, exact: true },
  { href: "/dashboard/ministries", label: "Ministerios", icon: Church, exact: true },
  { href: "/dashboard/finance", label: "Financeiro", icon: Wallet, exact: true },
];

export default async function DashboardShell({ children }: Readonly<{ children: React.ReactNode }>) {
  const session = await getAuthSession();
  const visibleNavItems = navItems.filter((item) => canAccessDashboardPath(session, item.href));
  const roleLabels = session ? getRoleLabels(session.roles) : [];

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="sticky top-0 z-40 border-b border-border/80 bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-primary p-3 text-primary-foreground shadow-soft">
              <Church className="h-5 w-5" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">CB Atos 29</p>
              <p className="text-sm text-muted-foreground">{session?.email ?? "Plataforma de gestao da igreja"}</p>
              <div className="flex flex-wrap gap-2">
                {roleLabels.map((label) => (
                  <StatusBadge key={label} label={label} tone="info" />
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button asChild variant="outline" size="sm">
              <Link href="/logout">
                <UserRound className="mr-2 h-4 w-4" />
                Sair
              </Link>
            </Button>
            <Button asChild size="sm">
              <Link href="/">Voltar ao site</Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="space-y-6">
          <Card className="border-border/70">
            <CardHeader>
              <CardTitle className="text-lg">Modulos liberados</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {visibleNavItems.map((item) => {
                const Icon = item.icon;

                return (
                  <NavLink
                    key={item.href}
                    href={item.href}
                    exact={item.exact}
                    className="flex items-center justify-between rounded-xl border border-transparent px-3 py-3 text-sm text-muted-foreground transition hover:border-border hover:bg-background hover:text-foreground"
                    activeClassName="border-primary/30 bg-primary/10 text-primary"
                  >
                    <span className="flex items-center gap-3">
                      <Icon className="h-4 w-4" />
                      {item.label}
                    </span>
                    {item.label === "Financeiro" ? <StatusBadge label="Em breve" tone="neutral" /> : null}
                  </NavLink>
                );
              })}
            </CardContent>
          </Card>

          <Card className="border-border/70 bg-card/80">
            <CardHeader>
              <CardTitle className="text-lg">Leitura da sessao</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>O login e unico. O sistema libera dashboard ou portal pessoal conforme o conjunto de roles do usuario.</p>
              <p>Roles acumulativas expandem os modulos visiveis, em vez de forcar uma conta separada por funcao.</p>
              <p>O portal do membro continua isolado da gestao para quem nao possui papel operacional.</p>
            </CardContent>
          </Card>
        </aside>

        <main>{children}</main>
      </div>
    </div>
  );
}
