"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Church } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Sobre", href: "#sobre" },
  { name: "EBD", href: "#ebd" },
  { name: "Células", href: "#celulas" },
  { name: "Eventos", href: "#eventos" },
  { name: "Ministérios", href: "#ministerios" },
  { name: "Doar", href: "#doar" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm shadow-soft">
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-3">
            <div className="rounded-lg bg-primary p-2 transition-transform group-hover:scale-105">
              <Church className="h-6 w-6 text-primary-foreground" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-foreground">CB Atos 29</span>
              <span className="text-xs text-muted-foreground">Comunidade Batista</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="font-medium text-foreground transition-colors hover:text-primary"
              >
                {link.name}
              </a>
            ))}

            <Link href="/dashboard" aria-current={pathname?.startsWith("/dashboard") ? "page" : undefined}>
              <Button
                variant={pathname?.startsWith("/dashboard") ? "default" : "secondary"}
                size="sm"
                className={cn(pathname?.startsWith("/dashboard") && "ring-2 ring-primary/50")}
              >
                Dashboard
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen((s) => !s)}
            className="p-2 text-foreground transition-colors hover:text-primary md:hidden"
            aria-label="Abrir menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-border py-4">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 font-medium text-foreground transition-colors hover:text-primary"
                >
                  {link.name}
                </a>
              ))}

              <Link href="/dashboard" className="px-4" onClick={() => setIsOpen(false)}>
                <Button variant={pathname?.startsWith("/dashboard") ? "default" : "secondary"} className="w-full">
                  Dashboard
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
