import Link from "next/link";
import { offres, type Categorie, type Offre } from "@/lib/catalogue";
import { detailOffre, nomOffre } from "@/lib/catalogue.en";
import { chemin, prix, type Langue } from "@/lib/langue";

/** Titre de page, commun à toutes les pages intérieures. */
export function TitreDePage({
  titre,
  children,
}: {
  titre: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="conteneur pb-10 pt-12 md:pb-14 md:pt-20">
      <h1 className="max-w-3xl text-4xl md:text-6xl">{titre}</h1>
      {children && (
        <div className="mt-5 max-w-2xl text-lg text-discret">{children}</div>
      )}
    </div>
  );
}

/** Les deux actions du site, rappelées à la fin de chaque page. */
export function Rappel({
  titre,
  offre,
  langue = "fr",
}: {
  titre?: string;
  offre?: string;
  langue?: Langue;
}) {
  const suffixe = offre ? `?${offre}` : "";
  const fr = langue === "fr";
  return (
    <section className="bg-surface print:hidden">
      <div className="conteneur flex flex-col items-start gap-6 py-14 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl md:text-4xl">
            {titre ?? (fr ? "On vous attend." : "We are expecting you.")}
          </h2>
          <p className="mt-2 text-discret">
            {fr
              ? "Réponse sous 24 h pour les rendez-vous. Carte cadeau reçue tout de suite."
              : "We confirm bookings within 24 hours. Gift cards arrive straight away."}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href={chemin(langue, `/reservation${suffixe}`)} className="btn btn-accent">
            {fr ? "Prendre rendez-vous" : "Book a session"}
          </Link>
          <Link href={chemin(langue, `/carte-cadeau${suffixe}`)} className="btn btn-contour">
            {fr ? "Offrir une carte" : "Give a gift card"}
          </Link>
        </div>
      </div>
    </section>
  );
}

export const prixMini = (categorie: Categorie) =>
  Math.min(...offres.filter((o) => o.categorie === categorie).map((o) => o.prix));

/** Tableau de prix solo / duo ; chaque prix mène à la carte cadeau correspondante. */
export function TableauPrix({
  lignes,
  legende,
  langue = "fr",
}: {
  lignes: { nom: string; detail?: string; solo?: Offre; duo?: Offre }[];
  legende: string;
  langue?: Langue;
}) {
  const fr = langue === "fr";
  const avecDuo = lignes.some((l) => l.duo);
  const cellule = (o?: Offre) =>
    o ? (
      <Link
        href={chemin(langue, `/carte-cadeau?offre=${o.id}`)}
        className="inline-block rounded-md px-2 py-1 font-medium tabular-nums underline decoration-accent decoration-2 underline-offset-4 hover:bg-surface hover:decoration-accent"
        aria-label={`${prix(langue, o.prix)}, ${fr ? "offrir" : "give"} ${o.nom}${o.formule ? ` ${o.formule}` : ""}`}
      >
        {prix(langue, o.prix)}
      </Link>
    ) : (
      <span className="text-discret">–</span>
    );
  return (
    <table className="w-full text-left">
      <caption className="sr-only">{legende}</caption>
      <thead>
        <tr className="border-b-2 border-texte text-sm">
          <th scope="col" className="py-3 pr-4 font-medium">
            {fr ? "Prestation" : "Treatment"}
          </th>
          <th scope="col" className="w-[4.5rem] py-3 text-right font-medium sm:w-24">
            {avecDuo ? "Solo" : fr ? "Prix" : "Price"}
          </th>
          {avecDuo && (
            <th scope="col" className="w-[4.5rem] py-3 text-right font-medium sm:w-24">
              Duo
            </th>
          )}
        </tr>
      </thead>
      <tbody>
        {lignes.map((l) => (
          <tr key={l.nom + (l.detail ?? "")} className="border-b border-trait">
            <th scope="row" className="py-3.5 pr-4 font-normal">
              {l.nom}
              {l.detail && <span className="block text-sm text-discret">{l.detail}</span>}
            </th>
            <td className="py-3.5 text-right">{cellule(l.solo)}</td>
            {avecDuo && <td className="py-3.5 text-right">{cellule(l.duo)}</td>}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const o = (id: string) => offres.find((x) => x.id === id);

export const lignesMassages = [30, 60, 90].map((d) => ({
  nom: `Massage ${d} min`,
  solo: o(`massage-solo-${d}`),
  duo: o(`massage-duo-${d}`),
}));

export const lignesAbonnements = [
  { nom: "Abonnement 6 h de massage", detail: "Soit 81,50 € l’heure", solo: o("abonnement-6h") },
  { nom: "Abonnement 12 h de massage", detail: "Soit 73 € l’heure", solo: o("abonnement-12h") },
];

export const lignesRituels = [
  ...[30, 60, 90].map((d) => ({
    nom: `Hammam, gommage et massage ${d} min`,
    detail: o(`rituel-hgm-solo-${d}`)?.detail,
    solo: o(`rituel-hgm-solo-${d}`),
    duo: o(`rituel-hgm-duo-${d}`),
  })),
  ...[30, 60, 90].map((d) => ({
    nom: `Hammam et massage ${d} min`,
    detail: o(`rituel-hm-duo-${d}`)?.detail,
    solo: o(`rituel-hm-solo-${d}`),
    duo: o(`rituel-hm-duo-${d}`),
  })),
];

export const lignesSoins = offres
  .filter((x) => x.categorie === "soin")
  .map((x) => ({ nom: x.nom, detail: x.detail, solo: x }));

export const lignesBons = offres
  .filter((x) => x.categorie === "bon")
  .map((x) => ({ nom: x.nom, solo: x }));

/** Les lignes d'un tableau de prix, dans la langue demandée. */
export function traduireLignes(
  lignes: { nom: string; detail?: string; solo?: Offre; duo?: Offre }[],
  langue: Langue,
) {
  if (langue === "fr") return lignes;
  const parHeure: Record<string, string> = {
    "abonnement-6h": "€81.50 per hour",
    "abonnement-12h": "€73 per hour",
  };
  return lignes.map((l) => {
    const o = (l.solo ?? l.duo)!;
    return {
      ...l,
      nom: nomOffre({ ...o, formule: undefined }, langue),
      detail: parHeure[o.id] ?? detailOffre(o, langue),
    };
  });
}
