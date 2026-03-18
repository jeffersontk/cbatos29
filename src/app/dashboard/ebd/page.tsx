import { BookOpenText, ClipboardCheck, Presentation } from "lucide-react";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import KpiCard from "@/components/dashboard/KpiCard";
import StatusBadge from "@/components/dashboard/StatusBadge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ebdClasses } from "@/lib/platform/data";

export default function EbdPage() {
  const totalEnrolled = ebdClasses.reduce((acc, item) => acc + item.enrolled, 0);
  const totalCapacity = ebdClasses.reduce((acc, item) => acc + item.capacity, 0);

  return (
    <DashboardLayout
      title="Escola Biblica Dominical"
      subtitle="Aqui esta o nucleo da EBD: inscricao, material, chamada, professores e visao rapida da saude das turmas."
      actions={[
        { label: "Ver membros", href: "/dashboard/members", variant: "outline" },
        { label: "Ver calendario", href: "/dashboard/calendar", variant: "secondary" },
      ]}
    >
      <section className="grid gap-4 md:grid-cols-3">
        <KpiCard title="Turmas ativas" value={String(ebdClasses.length)} helper="Com professores, materiais e agenda definidos." icon={Presentation} />
        <KpiCard title="Alunos inscritos" value={String(totalEnrolled)} helper={`Capacidade total atual: ${totalCapacity} vagas.`} icon={BookOpenText} />
        <KpiCard title="Frequencia media" value="87%" helper="Base para o fluxo de presenca por codigo ou QR." icon={ClipboardCheck} />
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        {ebdClasses.map((ebdClass) => {
          const occupancy = Math.round((ebdClass.enrolled / ebdClass.capacity) * 100);

          return (
            <Card key={ebdClass.id} className="border-border/70">
              <CardHeader className="flex flex-row items-start justify-between gap-4">
                <div className="space-y-2">
                  <CardTitle className="text-xl">{ebdClass.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{ebdClass.audience}</p>
                </div>
                <StatusBadge label={`${occupancy}% ocupada`} tone={occupancy > 80 ? "warning" : "success"} />
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-border/70 bg-background p-4">
                    <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Professor</p>
                    <p className="mt-2 font-semibold text-foreground">{ebdClass.teacher}</p>
                  </div>
                  <div className="rounded-2xl border border-border/70 bg-background p-4">
                    <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Agenda</p>
                    <p className="mt-2 font-semibold text-foreground">{ebdClass.schedule}</p>
                    <p className="text-sm text-muted-foreground">{ebdClass.room}</p>
                  </div>
                </div>

                <div className="rounded-2xl border border-border/70 bg-background p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Proxima aula</p>
                  <p className="mt-2 font-semibold text-foreground">{ebdClass.nextLesson}</p>
                  <p className="text-sm text-muted-foreground">Frequencia atual: {ebdClass.attendanceRate}</p>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-semibold text-foreground">Materiais disponiveis</p>
                  <div className="flex flex-wrap gap-2">
                    {ebdClass.materials.map((material) => (
                      <StatusBadge key={material} label={material} tone="info" />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </section>
    </DashboardLayout>
  );
}
