import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tidi Thai Team | Academia de Artes Marciais",
  description: "Muay Thai, Jiu-Jitsu, Boxe, Personal Training, area do aluno e painel administrativo da Tidi Thai Team.",
  icons: {
    icon: "/icon.jpg",
    shortcut: "/icon.jpg",
    apple: "/icon.jpg"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
