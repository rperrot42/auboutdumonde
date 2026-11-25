"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Billet } from "@/components/Billet";
import { getOffre, spa } from "@/lib/catalogue";
import { nomOffre } from "@/lib/catalogue.en";
import { dateCourte } from "@/lib/dates";
import { chemin, type Langue } from "@/lib/langue";
import {
  normaliserReference,
  soldeLisible,
  statutCarte,
  useDonnees,
  type StatutCarte,
} from "@/lib/store";

const textes = {
  fr: {
    chargement: "Chargement…",
    consulter: "Consulter ma carte cadeau",
    introuvable: (ref: string) =>
      `Aucune carte « ${ref} » n’est enregistrée dans ce navigateur. Vérifiez la référence ou appelez-nous au ${spa.telephone} : les cartes achetées avant ce nouveau site restent valables.`,
    reference: "Référence de la carte",
    afficher: "Afficher la carte",
    pasEncore: "Pas encore de carte ?",
    offrir: "Offrir une carte cadeau",
    prete: "Votre carte est prête",
    votreCarte: "Votre carte cadeau",
    jusquau: (d: string) => `jusqu’au ${d}`,
    noter: ["Imprimez-la ou enregistrez-la en PDF pour l’offrir. Notez la référence", ": elle sera demandée à la prise de rendez-vous."],
    regles: (semaine: boolean) =>
      `Sur rendez-vous uniquement, ${semaine ? "du lundi au vendredi" : "du lundi au samedi"}, hors jours fériés. Toute annulation moins de 24 h avant le rendez-vous entraîne la perte de la carte. Merci d’arriver 5 minutes en avance.`,
    imprimer: "Imprimer ou enregistrer en PDF",
    reserver: "Prendre rendez-vous avec cette carte",
    etats: { active: "Valable", utilisee: "Utilisée", expiree: "Expirée", annulee: "Annulée" },
  },
  en: {
    chargement: "Loading…",
    consulter: "Check my gift card",
    introuvable: (ref: string) =>
      `No card “${ref}” is saved in this browser. Check the reference or call us on ${spa.telephone}: cards bought before this new site remain valid.`,
    reference: "Card reference",
    afficher: "Show the card",
    pasEncore: "No card yet?",
    offrir: "Give a gift card",
    prete: "Your card is ready",
    votreCarte: "Your gift card",
    jusquau: (d: string) => `until ${d}`,
    noter: ["Print it or save it as a PDF to give it. Keep the reference", ": you will need it to book."],
    regles: (semaine: boolean) =>
      `By appointment only, ${semaine ? "Monday to Friday" : "Monday to Saturday"}, except public holidays. Cancelling less than 24 hours before the appointment means losing the card. Please arrive 5 minutes early.`,
    imprimer: "Print or save as PDF",
    reserver: "Book with this card",
    etats: { active: "Valid", utilisee: "Used", expiree: "Expired", annulee: "Cancelled" },
  },
};

const classes: Record<StatutCarte, string> = {
  active: "bg-accent text-fond",
  utilisee: "bg-trait text-texte",
  expiree: "bg-trait text-texte",
  annulee: "bg-trait text-texte",
};

export function MaCarte({ langue = "fr" }: { langue?: Langue }) {
  const t = textes[langue];
  const router = useRouter();
  const params = useSearchParams();
  const donnees = useDonnees();
  const ref = params.get("ref");
  const nouvelle = params.get("nouvelle") === "1";
  const [saisie, setSaisie] = useState("");

  if (!donnees) return <p className="text-discret">{t.chargement}</p>;

  const carte = ref
    ? donnees.cartes.find((c) => c.reference === normaliserReference(ref))
    : undefined;

  if (!carte) {
    return (
      <>
        <h1 className="text-4xl md:text-5xl">{t.consulter}</h1>
        {ref && (
          <p role="alert" className="mt-6 rounded-xl border border-accent bg-surface p-4">
            {t.introuvable(ref)}
          </p>
        )}
        <form
          className="mt-8 flex max-w-lg flex-col gap-3 sm:flex-row sm:items-end"
          onSubmit={(e) => {
            e.preventDefault();
            router.push(
              chemin(langue, `/carte-cadeau/billet?ref=${encodeURIComponent(saisie.trim())}`),
            );
          }}
        >
          <div className="flex-1">
            <label htmlFor="ref" className="etiquette">
              {t.reference}
            </label>
            <input
              id="ref"
              className="champ uppercase"
              required
              value={saisie}
              onChange={(e) => setSaisie(e.target.value)}
              placeholder="ABDM-XXXX-XXXX"
              autoComplete="off"
            />
          </div>
          <button type="submit" className="btn btn-accent">
            {t.afficher}
          </button>
        </form>
        <p className="mt-10 text-discret">
          {t.pasEncore}{" "}
          <Link href={chemin(langue, "/carte-cadeau")} className="lien">
            {t.offrir}
          </Link>
        </p>
      </>
    );
  }

  const statut = statutCarte(carte);
  const offre = getOffre(carte.offreId);
  const reservable = statut === "active" && offre?.categorie !== "bon";

  return (
    <>
      <div className="print:hidden">
        <h1 className="text-4xl md:text-5xl">{nouvelle ? t.prete : t.votreCarte}</h1>
        <p className="mt-4 flex flex-wrap items-center gap-3 text-discret">
          <span className={`rounded-full px-3 py-1 text-sm font-medium ${classes[statut]}`}>
            {t.etats[statut]}
          </span>
          {statut === "active" && <span>{t.jusquau(dateCourte(carte.expireLe, langue))}</span>}
        </p>
        {nouvelle && (
          <p className="mt-4 max-w-2xl">
            {t.noter[0]} <strong className="tabular-nums">{carte.reference}</strong>
            {t.noter[1]}
          </p>
        )}
      </div>

      <Billet
        langue={langue}
        className="mt-8 print:mt-0"
        carte={{
          ...carte,
          intitule: offre ? nomOffre(offre, langue) : carte.intitule,
          expireLe: carte.expireLe,
          solde: carte.quantite > 1 ? soldeLisible(carte, langue) : undefined,
        }}
      />

      <div className="mt-6 text-sm text-discret">
        <p>{t.regles(Boolean(carte.semaineSeulement))}</p>
        <p className="mt-1">
          {spa.nom}, {spa.adresse}, {spa.ville}. {spa.telephone}
        </p>
      </div>

      <div className="mt-8 flex flex-wrap gap-3 print:hidden">
        <button type="button" className="btn btn-accent" onClick={() => window.print()}>
          {t.imprimer}
        </button>
        {reservable && (
          <Link
            href={chemin(langue, `/reservation?carte=${carte.reference}`)}
            className="btn btn-contour"
          >
            {t.reserver}
          </Link>
        )}
      </div>
    </>
  );
}
