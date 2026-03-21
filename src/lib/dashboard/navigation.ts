export type DashboardNavIcon =
  | "panel"
  | "members"
  | "ebd"
  | "events"
  | "cells"
  | "calendar"
  | "store"
  | "ministries"
  | "finance";

export type DashboardNavItem = {
  href: string;
  label: string;
  icon: DashboardNavIcon;
  exact: boolean;
};

export const dashboardNavItems: DashboardNavItem[] = [
  { href: "/dashboard", label: "Painel", icon: "panel", exact: true },
  { href: "/dashboard/members", label: "Membros", icon: "members", exact: true },
  { href: "/dashboard/ebd", label: "EBD", icon: "ebd", exact: true },
  { href: "/dashboard/events", label: "Eventos", icon: "events", exact: true },
  { href: "/dashboard/cells", label: "Celulas", icon: "cells", exact: true },
  { href: "/dashboard/calendar", label: "Calendario", icon: "calendar", exact: true },
  { href: "/dashboard/store", label: "Loja", icon: "store", exact: true },
  { href: "/dashboard/ministries", label: "Ministerios", icon: "ministries", exact: true },
  { href: "/dashboard/finance", label: "Financeiro", icon: "finance", exact: true },
];
