import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BROI - Nieruchomosci | Skup, Sprzedaz, Remonty",
  description: "Profesjonalne uslugi na rynku nieruchomosci w Wielkopolsce. Kupujemy, remontujemy i sprzedajemy nieruchomosci. Pomagamy inwestorom osiagac najlepszy ROI.",
  keywords: ["nieruchomosci", "skup nieruchomosci", "sprzedaz mieszkan", "remonty", "Szamotuly", "Poznan", "Wielkopolska", "inwestycje", "ROI"],
  authors: [{ name: "BROI Sp. z o.o." }],
  openGraph: {
    title: "BROI - Nieruchomosci | Skup, Sprzedaz, Remonty",
    description: "Profesjonalne uslugi na rynku nieruchomosci w Wielkopolsce.",
    url: "https://broi.pl",
    siteName: "BROI Nieruchomosci",
    locale: "pl_PL",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
