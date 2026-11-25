"use client";

import { Logo } from "@/components/Logo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BoutonTheme } from "@/components/Theme";
import { autreLangue, chemin as adresse, langueDe } from "@/lib/langue";

const liens = [
  { href: "/massages", fr: "Massages", en: "Massages" },
  { href: "/soins", fr: "Soins", en: "Treatments" },
  { href: "/hammam", fr: "Hammam", en: "Hammam" },
  { href: "/tarifs", fr: "Tarifs", en: "Prices" },
  { href: "/le-spa", fr: "Le spa", en: "The spa" },
];

const mots = {
  fr: { offrir: "Offrir une carte", rdv: "Prendre rendez-vous", menu: "Menu", fermer: "Fermer", nav: "Navigation principale", accueil: "Au bout du monde, accueil", autre: "English" },
  en: { offrir: "Give a gift card", rdv: "Book a session", menu: "Menu", fermer: "Close", nav: "Main navigation", accueil: "Au bout du monde, home", autre: "Français" },
};

export function EnTete() {
  const chemin = usePathname();
  const langue = langueDe(chemin);
  const t = mots[langue];
  const [ouvert, setOuvert] = useState(false);
  const actif = (href: string) => {
    const page = chemin.replace(/^\/en(?=\/|$)/, "") || "/";
    return page === href || page.startsWith(`${href}/`);
  };
  // Changer de langue recharge la page : chaque langue a sa propre balise <html lang>.
  const bascule = (
    <a href={autreLangue(chemin)} hrefLang={langue === "fr" ? "en" : "fr"} lang={langue === "fr" ? "en" : "fr"}>
      {t.autre}
    </a>
  );

  return (
    <header className="sticky top-0 z-40 border-b border-trait bg-fond/90 text-texte backdrop-blur-md print:hidden">
      <div className="conteneur flex h-24 items-center gap-8">
        <Link href={adresse(langue, "/")} className="shrink-0" onClick={() => setOuvert(false)}>
          <Logo alt={t.accueil} className="h-[4.25rem] w-auto" />
        </Link>

        <nav aria-label={t.nav} className="ml-auto hidden lg:block">
          <ul className="flex items-center gap-8 text-[1.05rem]">
            {liens.map((l) => (
              <li key={l.href}>
                <Link
                  href={adresse(langue, l.href)}
                  aria-current={actif(l.href) ? "page" : undefined}
                  className="border-b border-transparent py-2 text-texte/85 hover:text-texte aria-[current=page]:border-accent aria-[current=page]:text-texte"
                >
                  {l[langue]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:ml-0">
          <span className="hidden px-1 text-[0.95rem] text-discret underline-offset-4 hover:text-texte hover:underline md:block">
            {bascule}
          </span>
          <BoutonTheme langue={langue} className="hidden px-1 text-[0.95rem] text-discret underline-offset-4 hover:text-texte hover:underline md:block" />
          <Link href={adresse(langue, "/carte-cadeau")} className="btn btn-contour hidden sm:inline-flex">
            {t.offrir}
          </Link>
          <Link href={adresse(langue, "/reservation")} className="btn btn-accent hidden sm:inline-flex">
            {t.rdv}
          </Link>
          <button
            type="button"
            className="btn btn-contour lg:hidden"
            aria-expanded={ouvert}
            aria-controls="menu-mobile"
            onClick={() => setOuvert((o) => !o)}
          >
            {ouvert ? t.fermer : t.menu}
          </button>
        </div>
      </div>

      {ouvert && (
        <nav
          id="menu-mobile"
          aria-label={t.nav}
          className="border-t border-trait bg-fond lg:hidden"
        >
          <ul className="conteneur py-3">
            {liens.map((l) => (
              <li key={l.href}>
                <Link
                  href={adresse(langue, l.href)}
                  onClick={() => setOuvert(false)}
                  aria-current={actif(l.href) ? "page" : undefined}
                  className="block border-b border-trait py-3.5 font-titre text-xl last:border-0 aria-[current=page]:text-accent"
                >
                  {l[langue]}
                </Link>
              </li>
            ))}
            <li className="flex gap-6 pt-4 text-discret underline underline-offset-4">
              {bascule}
              <BoutonTheme langue={langue} className="underline underline-offset-4" />
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}

/** Sur mobile, les deux actions restent sous le pouce pendant toute la visite. */
export function BarreMobile() {
  const chemin = usePathname();
  const langue = langueDe(chemin);
  const t = mots[langue];
  const masquee = ["/reservation", "/carte-cadeau", "/gestion"].some((p) =>
    chemin.startsWith(p),
  );
  if (masquee) return null;
  return (
    <>
      <div className="h-[4.5rem] sm:hidden print:hidden" aria-hidden />
      <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2 border-t border-trait bg-fond/95 p-3 text-texte backdrop-blur sm:hidden print:hidden">
        <Link href={adresse(langue, "/carte-cadeau")} className="btn btn-contour !px-2 text-[0.9rem]">
          {t.offrir}
        </Link>
        <Link href={adresse(langue, "/reservation")} className="btn btn-accent !px-2 text-[0.9rem]">
          {t.rdv}
        </Link>
      </div>
    </>
  );
}
