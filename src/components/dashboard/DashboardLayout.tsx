import type { ReactNode } from "react";

import Link from "next/link";

import { Button, type ButtonProps } from "@/components/ui/button";

type DashboardAction = {
  label: string;
  href: string;
  variant?: ButtonProps["variant"];
};

interface DashboardLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  actions?: DashboardAction[];
}

export default function DashboardLayout({ children, title, subtitle, actions }: DashboardLayoutProps) {
  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl md:text-4xl">{title}</h1>
          {subtitle ? <p className="max-w-3xl text-sm text-muted-foreground sm:text-base">{subtitle}</p> : null}
        </div>

        {actions?.length ? (
          <div className="grid gap-3 sm:flex sm:flex-wrap lg:w-auto">
            {actions.map((action) => (
              <Button key={action.href} asChild variant={action.variant ?? "default"} className="w-full sm:w-auto">
                <Link href={action.href}>{action.label}</Link>
              </Button>
            ))}
          </div>
        ) : null}
      </div>

      {children}
    </div>
  );
}
