import type { ReactNode } from "react";

import Link from "next/link";
import Image, { type ImageProps } from "next/image";
import { ArrowLeft, Church, HeartHandshake, LogOut, UserRound } from "lucide-react";

import StatusBadge from "@/components/dashboard/StatusBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { hasDashboardAccess, type AppSession } from "@/lib/auth/session";

type AuthShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  highlights?: string[];
  infoCards?: Array<{
    icon: ReactNode;
    title: string;
    description: string;
  }>;
  currentSession: AppSession | null;
  sessionBadgeLabel?: string;
  sessionBadgeTone?: "neutral" | "success" | "warning" | "info";
  backgroundImage?: ImageProps["src"];
  backgroundOverlayClassName?: string;
  showShellBackLink?: boolean;
  showShellSessionControls?: boolean;
  showIntroContent?: boolean;
  mobileOverlayCard?: boolean;
  children: ReactNode;
};


export default function AuthShell({
  eyebrow,
  title,
  description,
  highlights,
  infoCards,
  currentSession,
  sessionBadgeLabel,
  sessionBadgeTone,
  backgroundImage,
  backgroundOverlayClassName,
  showShellBackLink = true,
  showShellSessionControls = true,
  showIntroContent = true,
  mobileOverlayCard = false,
  children,
}: AuthShellProps) {
  const resolvedSessionBadgeLabel = sessionBadgeLabel ?? "Conectado";
  const resolvedSessionBadgeTone = sessionBadgeTone ?? (hasDashboardAccess(currentSession) ? "warning" : "success");
  const shouldShowShellHeader = showShellBackLink || (showShellSessionControls && Boolean(currentSession));

  return (
    <div className="min-h-screen bg-muted/30 px-4 py-10">
      <div className={`mx-auto max-w-7xl ${mobileOverlayCard ? "lg:grid lg:gap-8 lg:grid-cols-[1fr_1.05fr]" : "grid gap-8 lg:grid-cols-[1fr_1.05fr]"}`}>
        <section
          className={`relative flex flex-col justify-between overflow-hidden rounded-[32px] px-6 py-8 text-primary-foreground shadow-strong md:px-8 ${
            backgroundImage ? "bg-slate-950" : "bg-primary"
          } ${mobileOverlayCard ? "min-h-[50svh] lg:min-h-0" : ""}`}
        >
          {backgroundImage ? (
            <>
              <Image src={backgroundImage} alt="" fill priority className="object-cover object-center" />
              <div className="absolute inset-0 bg-slate-950/35" />
              <div
                className={`absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(96,165,250,0.40),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(29,78,216,0.42),transparent_40%)] backdrop-blur-[3px] ${
                  backgroundOverlayClassName ?? ""
                }`}
              />
            </>
          ) : null}

          <div className="relative z-10 space-y-8">
            {shouldShowShellHeader ? (
              <div className="flex items-center justify-between gap-4">
                {showShellBackLink ? (
                  <Link href="/" className="inline-flex items-center gap-2 text-sm text-primary-foreground/85 transition-opacity hover:opacity-80">
                    <ArrowLeft className="h-4 w-4" />
                    Voltar ao site
                  </Link>
                ) : (
                  <div />
                )}

                {showShellSessionControls && currentSession ? (
                  <div className="flex items-center gap-2">
                    <StatusBadge label={resolvedSessionBadgeLabel} tone={resolvedSessionBadgeTone} />
                    <Button asChild size="sm" variant="outline" className="border-white/20 bg-white/10 text-white hover:bg-white/20">
                      <Link href="/logout">
                        <LogOut className="h-4 w-4" />
                        Sair
                      </Link>
                    </Button>
                  </div>
                ) : null}
              </div>
            ) : null}

            {showIntroContent ? (
              <div className="space-y-8">
                <div className="space-y-6">
                  <div className="inline-flex rounded-2xl bg-white/10 p-4">
                    <Church className="h-7 w-7" />
                  </div>

                  <div className="space-y-4">
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary-foreground/75">{eyebrow}</p>
                    <h1 className="max-w-xl text-4xl font-semibold tracking-tight md:text-5xl">{title}</h1>
                    <p className="max-w-2xl text-base text-primary-foreground/85 md:text-lg">{description}</p>
                  </div>
                </div>

                {highlights?.length ? (
                  <div className="grid gap-4 md:grid-cols-2">
                    {highlights.map((highlight) => (
                      <div key={highlight} className="rounded-3xl border border-white/15 bg-white/10 p-5">
                        <p className="text-sm text-primary-foreground/85">{highlight}</p>
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>

          {infoCards && infoCards.length ? (
            <div className="relative z-10 mt-8 grid gap-4 md:grid-cols-2">
              {infoCards.map((card) => (
                <Card key={card.title} className="border-white/15 bg-white/10 text-white">
                  <CardContent className="flex items-start gap-3 p-5">
                    {card.icon}
                    <div className="space-y-2">
                      <p className="font-semibold">{card.title}</p>
                      <p className="text-sm text-white/80">{card.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : null}
        </section>

        <section className={`${mobileOverlayCard ? "relative z-20 -mt-32 flex px-4 sm:-mt-36 lg:mt-0 lg:px-0 lg:items-center" : "flex items-center"}`}>{children}</section>
      </div>
    </div>
  );
}
