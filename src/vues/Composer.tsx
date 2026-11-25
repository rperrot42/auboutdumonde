"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Billet } from "@/components/Billet";
import { ChoixOffre } from "@/components/ChoixOffre";
import { getMassage, getOffre } from "@/lib/catalogue";
import { nomOffre } from "@/lib/catalogue.en";
import { chemin, prix, type Langue } from "@/lib/langue";
import { creerCarte } from "@/lib/store";

const textes = {
  fr: {
    etape1: "1. Que voulez-vous offrir ?",
    etape2: "2. Votre mot",
    pour: "Pour",
    pourAide: "Le prénom du ou de la destinataire",
    de: "De la part de",
    deAide: "Votre prénom",
    message: "Message",
    facultatif: "(facultatif)",
    etape3: "3. Recevoir la carte",
    email: "Votre adresse e-mail",
    emailAide: "vous@exemple.fr",
    emailPourquoi: "Elle nous sert à retrouver votre carte si vous la perdez.",
    pasDePaiement: "Paiement en ligne pas encore branché",
    pasDePaiementTexte:
      "Cette version du site crée la carte sans encaisser. Elle est enregistrée dans ce navigateur uniquement.",
    creation: "Création de la carte…",
    creer: (p: string) => `Créer la carte de ${p}`,
    validite: (an: boolean, semaine: boolean) =>
      `Valable ${an ? "1 an" : "6 mois"}, ${semaine ? "du lundi au vendredi" : "du lundi au samedi"}, hors jours fériés.`,
    apercu: "Aperçu de votre carte",
    deja: "Vous avez déjà une carte ?",
    consulter: "Consultez-la",
    ou: "ou",
    rdv: "prenez rendez-vous",
  },
  en: {
    etape1: "1. What would you like to give?",
    etape2: "2. Your note",
    pour: "For",
    pourAide: "The recipient’s first name",
    de: "From",
    deAide: "Your first name",
    message: "Message",
    facultatif: "(optional)",
    etape3: "3. Receive the card",
    email: "Your email address",
    emailAide: "you@example.com",
    emailPourquoi: "We use it to find your card if you lose it.",
    pasDePaiement: "Online payment not connected yet",
    pasDePaiementTexte:
      "This version of the site creates the card without taking payment. It is saved in this browser only.",
    creation: "Creating the card…",
    creer: (p: string) => `Create the ${p} card`,
    validite: (an: boolean, semaine: boolean) =>
      `Valid for ${an ? "1 year" : "6 months"}, ${semaine ? "Monday to Friday" : "Monday to Saturday"}, except public holidays.`,
    apercu: "Preview of your card",
    deja: "Already have a card?",
    consulter: "View it",
    ou: "or",
    rdv: "book a session",
  },
};

export function Composer({ langue = "fr" }: { langue?: Langue }) {
  const t = textes[langue];
  const router = useRouter();
  const params = useSearchParams();
  const destinationInitiale = getMassage(params.get("destination"))?.slug ?? "";

  const [offreId, setOffreId] = useState(
    getOffre(params.get("offre"))?.id ?? "massage-solo-60",
  );
  const [destination, setDestination] = useState(destinationInitiale);
  const [pour, setPour] = useState("");
  const [de, setDe] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [envoi, setEnvoi] = useState(false);

  const offre = getOffre(offreId)!;

  function payer(e: React.FormEvent) {
    e.preventDefault();
    setEnvoi(true);
    const carte = creerCarte({ offreId, destination, pour, de, message, email, origine: "site" });
    router.push(chemin(langue, `/carte-cadeau/billet?ref=${carte.reference}&nouvelle=1`));
  }

  return (
    <form
      onSubmit={payer}
      className="conteneur grid gap-12 pb-20 lg:grid-cols-[1fr_minmax(0,30rem)] lg:gap-16"
    >
      <div className="space-y-12">
        <section aria-labelledby="etape-offre">
          <h2 id="etape-offre" className="mb-5 text-2xl md:text-3xl">
            {t.etape1}
          </h2>
          <ChoixOffre
            langue={langue}
            usage="carte"
            offreId={offreId}
            destination={destination}
            onChange={(o, d) => {
              setOffreId(o);
              setDestination(d);
            }}
          />
        </section>

        <section aria-labelledby="etape-mot">
          <h2 id="etape-mot" className="mb-5 text-2xl md:text-3xl">
            {t.etape2}
          </h2>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="pour" className="etiquette">
                {t.pour}
              </label>
              <input
                id="pour"
                className="champ"
                required
                maxLength={40}
                value={pour}
                onChange={(e) => setPour(e.target.value)}
                placeholder={t.pourAide}
              />
            </div>
            <div>
              <label htmlFor="de" className="etiquette">
                {t.de}
              </label>
              <input
                id="de"
                className="champ"
                required
                maxLength={40}
                value={de}
                onChange={(e) => setDe(e.target.value)}
                placeholder={t.deAide}
                autoComplete="given-name"
              />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="message" className="etiquette">
                {t.message} <span className="font-normal text-discret">{t.facultatif}</span>
              </label>
              <textarea
                id="message"
                className="champ"
                rows={3}
                maxLength={160}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <p className="mt-1 text-right text-sm text-discret">
                {message.length} / 160
              </p>
            </div>
          </div>
        </section>

        <section aria-labelledby="etape-paiement">
          <h2 id="etape-paiement" className="mb-5 text-2xl md:text-3xl">
            {t.etape3}
          </h2>
          <label htmlFor="email" className="etiquette">
            {t.email}
          </label>
          <input
            id="email"
            type="email"
            className="champ max-w-md"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            placeholder={t.emailAide}
          />
          <p className="mt-2 max-w-md text-sm text-discret">
            {t.emailPourquoi}
          </p>

          <div className="mt-8 rounded-xl border-[1.5px] border-dashed border-accent bg-surface p-5">
            <p className="font-medium">{t.pasDePaiement}</p>
            <p className="mt-1 text-sm text-discret">
              {t.pasDePaiementTexte}
            </p>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
            <button type="submit" className="btn btn-accent" disabled={envoi}>
              {envoi ? t.creation : t.creer(prix(langue, offre.prix))}
            </button>
            <p className="text-sm text-discret">
              {t.validite(offre.validiteMois === 12, Boolean(offre.semaineSeulement))}
            </p>
          </div>
        </section>
      </div>

      <aside className="lg:sticky lg:top-32 lg:self-start" aria-label={t.apercu}>
        <p className="mb-3 text-sm font-medium text-discret">{t.apercu}</p>
        <Billet
          langue={langue}
          carte={{
            offreId,
            intitule: nomOffre(offre, langue),
            destination,
            pour,
            de,
            message,
            prix: offre.prix,
            validiteMois: offre.validiteMois,
          }}
        />
        <p className="mt-5 text-sm text-discret">
          {t.deja}{" "}
          <Link href={chemin(langue, "/carte-cadeau/billet")} className="lien">
            {t.consulter}
          </Link>{" "}
          {t.ou}{" "}
          <Link href={chemin(langue, "/reservation")} className="lien">
            {t.rdv}
          </Link>
          .
        </p>
      </aside>
    </form>
  );
}
