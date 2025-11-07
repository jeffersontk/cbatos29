"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Users,
  Home,
  BookOpen,
  Calendar,
  DollarSign,
  TrendingUp,
  LucideIcon,
} from "lucide-react";

type Stat = {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
  color: string;
};

type MenuItem = {
  title: string;
  icon: LucideIcon;
  path: string;
};

export default function DashboardPage() {
  const router = useRouter();

  const stats: Stat[] = [
    { title: "Membros Ativos", value: "342", change: "+12 este mês", icon: Users, color: "text-primary" },
    { title: "Células", value: "18", change: "+2 novas", icon: Home, color: "text-blue-600" },
    { title: "Alunos EBD", value: "156", change: "+8 matrículas", icon: BookOpen, color: "text-green-600" },
    { title: "Eventos Próximos", value: "7", change: "Próximos 30 dias", icon: Calendar, color: "text-orange-600" },
  ];

  const menuItems: MenuItem[] = [
    { title: "Gestão de Membros", icon: Users, path: "/dashboard/members" },
    { title: "Gestão de Células", icon: Home, path: "/dashboard/cells" },
    { title: "Gestão de EBD", icon: BookOpen, path: "/dashboard/ebd" },
    { title: "Gestão de Eventos", icon: Calendar, path: "/dashboard/events" },
    { title: "Gestão Financeira", icon: DollarSign, path: "/dashboard/finance" },
    { title: "Comunicação", icon: TrendingUp, path: "/dashboard/communication" },
  ];

  return (
    <div className="min-h-screen bg-background">
  {/*     <Navigation /> */}
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard Administrativo</h1>
          <p className="text-muted-foreground">CB Atos 29 - Painel de Gestão</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 mb-12">
          {stats.map(({ title, value, change, icon: Icon, color }, idx) => (
            <Card key={idx} className="transition-smooth hover:shadow-medium">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
                <Icon className={`h-5 w-5 ${color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">{value}</div>
                <p className="mt-1 text-xs text-muted-foreground">{change}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {menuItems.map(({ title, icon: Icon, path }, idx) => (
            <Card
              key={idx}
              role="button"
              tabIndex={0}
              onClick={() => router.push(path)}
              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && router.push(path)}
              className="cursor-pointer transition-smooth group hover:shadow-medium focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="rounded-lg p-3 bg-primary/10 group-hover:scale-110 transition-smooth">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                {/* Alternativa com Link acessível */}
                <Link href={path} className="block">
                  <Button variant="outline" className="w-full">
                    Acessar
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Activity */}
        <Card className="mt-12">
          <CardHeader>
            <CardTitle>Atividades Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4 rounded-lg bg-muted/50 p-3">
                <div className="rounded bg-primary/10 p-2">
                  <Users className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Novo membro cadastrado</p>
                  <p className="text-xs text-muted-foreground">Maria Silva - há 2 horas</p>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-lg bg-muted/50 p-3">
                <div className="rounded bg-blue-100 p-2">
                  <Home className="h-4 w-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Nova célula criada</p>
                  <p className="text-xs text-muted-foreground">Célula Acácia - há 5 horas</p>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-lg bg-muted/50 p-3">
                <div className="rounded bg-green-100 p-2">
                  <Calendar className="h-4 w-4 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Evento publicado</p>
                  <p className="text-xs text-muted-foreground">Retiro de Jovens 2024 - há 1 dia</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
