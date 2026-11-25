// Deux langues : le français à la racine du site, l'anglais sous /en.

export type Langue = "fr" | "en";

/** Pages traduites. L'espace de gestion, réservé à l'équipe, reste en français. */
const traduites = [
  "/massages",
  "/soins",
  "/hammam",
  "/tarifs",
  "/le-spa",
  "/carte-cadeau",
  "/reservation",
];

export function estTraduite(href: string) {
  const chemin = href.split(/[?#]/)[0];
  return chemin === "/" || traduites.some((t) => chemin === t || chemin.startsWith(`${t}/`));
}

/** Adresse d'une page dans la langue demandée. */
export function chemin(langue: Langue, href: string) {
  if (langue === "fr" || !estTraduite(href)) return href;
  return href === "/" ? "/en" : `/en${href}`;
}

export function langueDe(pathname: string): Langue {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "fr";
}

/** La même page dans l'autre langue, ou l'accueil si elle n'est pas traduite. */
export function autreLangue(pathname: string) {
  const langue = langueDe(pathname);
  if (langue === "en") return pathname.replace(/^\/en/, "") || "/";
  return estTraduite(pathname) ? chemin("en", pathname) : "/en";
}

const formats = {
  fr: new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }),
  en: new Intl.NumberFormat("en-IE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }),
};
export const prix = (langue: Langue, montant: number) => formats[langue].format(montant);
