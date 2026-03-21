"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Church, Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";

const sectionLinks = [
  { name: "Sobre", hash: "#sobre" },
  { name: "Palavra", hash: "#ebd" },
  { name: "Vida na vida", hash: "#celulas" },
  { name: "Celebracoes", hash: "#eventos" },
  { name: "Servico", hash: "#ministerios" },
];

function resolveHash(pathname: string, hash: string) {
  return pathname === "/" ? hash : `/${hash}`;
}

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname() ?? "/";

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/95 shadow-soft backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="group flex items-center gap-3">
            <div className="rounded-2xl bg-primary p-2.5 transition-transform group-hover:scale-105">
              <Church className="h-6 w-6 text-primary-foreground" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-foreground">CB Atos 29</span>
              <span className="text-xs text-muted-foreground">Comunidade Batista</span>
            </div>
          </Link>

          <div className="hidden items-center gap-6 md:flex">
            {sectionLinks.map((link) => (
              <Link
                key={link.name}
                href={resolveHash(pathname, link.hash)}
                className="text-sm font-medium text-foreground transition-colors hover:text-primary"
              >
                {link.name}
              </Link>
            ))}

            <Link href="/calendar" className="text-sm font-medium text-foreground transition-colors hover:text-primary">
              Agenda
            </Link>

            <Button asChild variant={pathname === "/login" ? "default" : "outline"} size="sm">
              <Link href="/login">Login</Link>
            </Button>
          </div>

          <button
            onClick={() => setIsOpen((open) => !open)}
            className="rounded-lg p-2 text-foreground transition-colors hover:bg-accent md:hidden"
            aria-label="Abrir menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isOpen ? (
          <div className="border-t border-border py-4 md:hidden">
            <div className="flex flex-col gap-2">
              {sectionLinks.map((link) => (
                <Link
                  key={link.name}
                  href={resolveHash(pathname, link.hash)}
                  onClick={() => setIsOpen(false)}
                  className="rounded-xl px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
                >
                  {link.name}
                </Link>
              ))}

              <Link
                href="/calendar"
                onClick={() => setIsOpen(false)}
                className="rounded-xl px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
              >
                Agenda
              </Link>

              <div className="px-4 pt-2">
                <Button asChild className="w-full">
                  <Link href="/login" onClick={() => setIsOpen(false)}>
                    Login
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </nav>
  );
}
