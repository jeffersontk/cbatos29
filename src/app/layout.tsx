import type { Metadata } from "next";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import "./globals.css";

export const metadata: Metadata = {
  title: "CB Atos 29 | Comunidade Batista",
  description: "Igreja em Campo Grande, RJ, vivendo o Evangelho no dia a dia, em comunhao, discipulado e servico.",
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
