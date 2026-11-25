import { Albert_Sans, Outfit } from "next/font/google";
import { Suspense } from "react";
import { BarreMobile, EnTete } from "@/components/EnTete";
import { PiedDePage } from "@/components/PiedDePage";
import { scriptTheme } from "@/components/Theme";
import type { Langue } from "@/lib/langue";
import "@/app/globals.css";

const albert = Albert_Sans({ variable: "--font-albert", subsets: ["latin"] });
const outfit = Outfit({ variable: "--font-outfit", subsets: ["latin"] });

/** Structure de toutes les pages : en-tête, contenu, pied de page. */
export function Coquille({ langue, children }: { langue: Langue; children: React.ReactNode }) {
  return (
    <html
      lang={langue}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${albert.variable} ${outfit.variable} antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: scriptTheme }} />
      </head>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#contenu"
          className="btn btn-accent sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50"
        >
          {langue === "fr" ? "Aller au contenu" : "Skip to content"}
        </a>
        <Suspense fallback={<div className="h-24 bg-fond" />}>
          <EnTete />
        </Suspense>
        <main id="contenu" className="flex-1">
          {children}
        </main>
        <PiedDePage langue={langue} />
        <Suspense fallback={null}>
          <BarreMobile />
        </Suspense>
      </body>
    </html>
  );
}
