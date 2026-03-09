import type { Metadata } from "next";
import {
  Bonheur_Royale,
  Bebas_Neue,
  JetBrains_Mono,
} from "next/font/google";
import { LenisProvider } from "@/components/LenisProvider";
import "./globals.css";

const bonheurRoyale = Bonheur_Royale({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bonheur",
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Andre Rasi — Depth Explorer",
  description:
    "Software Developer and Cloud Engineer. Driven by curiosity, built on persistence.",
  icons: {
    icon: "/compass.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bonheurRoyale.variable} ${bebasNeue.variable} ${jetbrainsMono.variable}`}
    >
      <body className="font-mono antialiased bg-black text-body">
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
