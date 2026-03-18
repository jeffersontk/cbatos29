import type { Metadata } from "next";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import "./globals.css";

export const metadata: Metadata = {
  title: "CB Atos 29 | Plataforma da Igreja",
  description:
    "Site institucional e plataforma de gestao da CB Atos 29 para membros, EBD, celulas, ministerios, eventos, calendario e loja.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
