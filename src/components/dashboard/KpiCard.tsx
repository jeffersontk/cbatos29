import type { LucideIcon } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type KpiCardProps = {
  title: string;
  value: string;
  helper: string;
  icon: LucideIcon;
};

export default function KpiCard({ title, value, helper, icon: Icon }: KpiCardProps) {
  return (
    <Card className="h-full border-border/70 bg-card/90">
      <CardHeader className="flex flex-row items-start justify-between gap-3 space-y-0 p-4 sm:p-6">
        <div className="space-y-2">
          <CardTitle className="text-sm sm:text-base">{title}</CardTitle>
          <p className="text-xs text-muted-foreground sm:text-sm">{helper}</p>
        </div>
        <div className="rounded-xl bg-primary/10 p-2.5 text-primary sm:p-3">
          <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0 sm:p-6 sm:pt-0">
        <div className="break-words text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">{value}</div>
      </CardContent>
    </Card>
  );
}
