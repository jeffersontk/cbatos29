import Link from "next/link";
import { Church, UserRound } from "lucide-react";

import { DashboardMobileNav, DashboardSidebarNav } from "@/components/dashboard/DashboardNav";
import { Button } from "@/components/ui/button";
import { getAuthSession } from "@/lib/auth/server";
import { dashboardNavItems } from "@/lib/dashboard/navigation";
import { canAccessDashboardPath } from "@/lib/auth/session";

export default async function DashboardShell({ children }: Readonly<{ children: React.ReactNode }>) {
  const session = await getAuthSession();
  const visibleNavItems = dashboardNavItems.filter((item) => canAccessDashboardPath(session, item.href));

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="sticky top-0 z-40 border-b border-border/80 bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:gap-4 sm:py-4">
          <div className="min-w-0 flex items-center gap-3">
            <DashboardMobileNav items={visibleNavItems} />
            <div className="rounded-2xl bg-primary p-3 text-primary-foreground shadow-soft">
              <Church className="h-5 w-5" />
            </div>
            <div className="min-w-0 space-y-1">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary sm:text-sm">CB Atos 29</p>
              <p className="truncate text-xs text-muted-foreground sm:text-sm">{session?.email ?? "Acesso interno"}</p>
            </div>
          </div>

          <div className="ml-auto flex items-center gap-2 sm:gap-3">
            <Button asChild variant="outline" size="sm">
              <Link href="/logout">
                <UserRound className="mr-2 h-4 w-4" />
                Sair
              </Link>
            </Button>
            <Button asChild size="sm">
              <Link href="/">
                <span className="hidden sm:inline">Voltar ao site</span>
                <span className="sm:hidden">Site</span>
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-5 px-4 py-5 sm:gap-6 sm:py-8 lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="hidden space-y-6 lg:block">
          <DashboardSidebarNav items={visibleNavItems} />
        </aside>

        <main className="min-w-0">{children}</main>
      </div>
    </div>
  );
}
