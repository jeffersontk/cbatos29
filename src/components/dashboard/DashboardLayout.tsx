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
  eyebrow?: string;
  actions?: DashboardAction[];
}

export default function DashboardLayout({
  children,
  title,
  subtitle,
  eyebrow = "Gestão da igreja",
  actions,
}: DashboardLayoutProps) {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-3">
          <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            {eyebrow}
          </span>
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">{title}</h1>
            {subtitle ? <p className="max-w-3xl text-base text-muted-foreground">{subtitle}</p> : null}
          </div>
        </div>

        {actions?.length ? (
          <div className="flex flex-wrap gap-3">
            {actions.map((action) => (
              <Button key={action.href} asChild variant={action.variant ?? "default"}>
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
