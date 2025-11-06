"use client";

import Link from "next/link";
import { Church, MapPin, Clock, Phone, Mail, Facebook, Instagram, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="bg-primary text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-white/20 p-2">
                <Church className="h-6 w-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold">CB Atos 29</span>
                <span className="text-sm opacity-90">Comunidade Batista</span>
              </div>
            </div>
            <p className="text-sm opacity-90">
              Uma igreja para viver o Evangelho todos os dias. Comunhão, ensino e missão.
            </p>
          </div>

          <div>
            <h4 className="mb-4 font-semibold">Links Rápidos</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#sobre" className="transition-opacity opacity-90 hover:opacity-100">Sobre Nós</a></li>
              <li><a href="#ebd" className="transition-opacity opacity-90 hover:opacity-100">EBD</a></li>
              <li><a href="#celulas" className="transition-opacity opacity-90 hover:opacity-100">Células</a></li>
              <li><a href="#eventos" className="transition-opacity opacity-90 hover:opacity-100">Eventos</a></li>
              <li><a href="#ministerios" className="transition-opacity opacity-90 hover:opacity-100">Ministérios</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold">Contato</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0" />
                <span className="opacity-90">
                  Rua Prof. Carlos Boisson, 495
                  <br />Campo Grande, RJ
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="h-4 w-4 flex-shrink-0" />
                <span className="opacity-90">Domingo: 17h e 19h30</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span className="opacity-90">(21) 99999-9999</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span className="opacity-90">contato@cbatos29.com.br</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold">Redes Sociais</h4>
            <div className="flex gap-3">
              <a href="#" className="rounded-lg bg-white/20 p-2 transition-colors hover:bg-white/30" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="rounded-lg bg-white/20 p-2 transition-colors hover:bg-white/30" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="rounded-lg bg-white/20 p-2 transition-colors hover:bg-white/30" aria-label="YouTube">
                <Youtube className="h-5 w-5" />
              </a>
            </div>

            <Button
              onClick={scrollToTop}
              variant="outline"
              className="mt-6 border-white/20 bg-white/10 text-white hover:bg-white/20"
            >
              Voltar ao Topo
            </Button>
          </div>
        </div>

        <div className="border-t border-white/20 pt-6 text-center text-sm opacity-90">
          <p>
            © {new Date().getFullYear()}{" "}
            <Link href="/" className="underline-offset-2 hover:underline">
              CB Atos 29
            </Link>
            . Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
