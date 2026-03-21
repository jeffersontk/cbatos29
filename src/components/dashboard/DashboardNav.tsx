"use client";

import { useState } from "react";
import {
  Calendar,
  Church,
  GraduationCap,
  Home,
  LayoutDashboard,
  Menu,
  ShoppingBag,
  Sparkles,
  Wallet,
  Users,
} from "lucide-react";

import { NavLink } from "@/components/NavLink";
import StatusBadge from "@/components/dashboard/StatusBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import type { DashboardNavIcon, DashboardNavItem } from "@/lib/dashboard/navigation";

const iconMap: Record<DashboardNavIcon, typeof LayoutDashboard> = {
  panel: LayoutDashboard,
  members: Users,
  ebd: GraduationCap,
  events: Sparkles,
  cells: Home,
  calendar: Calendar,
  store: ShoppingBag,
  ministries: Church,
  finance: Wallet,
};

function DashboardNavList({
  items,
  onNavigate,
}: {
  items: DashboardNavItem[];
  onNavigate?: () => void;
}) {
  return (
    <div className="space-y-2">
      {items.map((item) => {
        const Icon = iconMap[item.icon];

        return (
          <NavLink
            key={item.href}
            href={item.href}
            exact={item.exact}
            onClick={onNavigate}
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
    </div>
  );
}

export function DashboardSidebarNav({ items }: { items: DashboardNavItem[] }) {
  return (
    <Card className="border-border/70">
      <CardHeader>
        <CardTitle className="text-lg">Menu</CardTitle>
      </CardHeader>
      <CardContent>
        <DashboardNavList items={items} />
      </CardContent>
    </Card>
  );
}

export function DashboardMobileNav({ items }: { items: DashboardNavItem[] }) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="lg:hidden">
          <Menu className="h-4 w-4" />
          <span className="sr-only">Abrir menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[88vw] max-w-sm border-border/80 p-0">
        <div className="flex h-full flex-col bg-background">
          <SheetHeader className="border-b border-border/70 px-6 py-5 text-left">
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>
          <div className="flex-1 overflow-y-auto px-4 py-4">
            <DashboardNavList items={items} onNavigate={() => setOpen(false)} />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
