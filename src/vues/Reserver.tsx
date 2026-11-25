"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { ChoixOffre } from "@/components/ChoixOffre";
import { dureeLisible, getMassage, getOffre, spa } from "@/lib/catalogue";
import { detailOffre, massageEn, nomOffre } from "@/lib/catalogue.en";
import {
  ajouterJours,
  dateLongue,
  depuisCle,
  heureLisible,
  jourCourt,
  moisCourt,
  versCle,
} from "@/lib/dates";
import { chemin, prix, type Langue } from "@/lib/langue";
import {
  creerReservation,
  creneauxDuJour,
  jourOuvert,
  normaliserReference,
  soldeLisible,
  statutCarte,
  useDonnees,
  type Carte,
  type Reservation,
} from "@/lib/store";

const SEMAINES = 8;

const textes = {
  fr: {
    chargement: "Chargement…",
    envoyee: "Demande envoyée",
    confirmation: (email: string, tel: string) =>
      `Nous vous confirmons ce rendez-vous sous 24 h, à l’adresse ${email} ou au ${tel}. Il n’est définitif qu’après notre confirmation.`,
    prestation: "Prestation",
    creneauDemande: "Créneau demandé",
    aPour: (h: string, d: string) => `à ${h}, pour ${d}`,
    empechement: "Un empêchement ? Prévenez-nous au moins 24 h avant, au",
    retour: "Retour à l’accueil",
    etape1: "1. Avez-vous une carte cadeau ?",
    etape1Aide: "Si oui, saisissez sa référence. Sinon, passez à l’étape suivante.",
    reconnue: "Carte reconnue :",
    offertePar: (de: string) => `offerte par ${de}.`,
    solde: (s: string) => `Solde : ${s}.`,
    utilisable: (semaine: boolean) =>
      `Elle s’utilise ${semaine ? "du lundi au vendredi" : "du lundi au samedi"}, hors jours fériés.`,
    plusValable: `Cette carte n’est plus valable. Appelez-nous au ${spa.telephone} pour en parler, ou réservez sans carte.`,
    aVerifier:
      "Nous vérifierons cette référence en confirmant le rendez-vous. Les cartes cadeaux ne s’utilisent ni le dimanche ni les jours fériés.",
    etape2: "2. Votre prestation",
    deLaCarte: "C’est la prestation de votre carte cadeau.",
    etape3: "3. Votre créneau",
    precedente: "Semaine précédente",
    suivante: "Semaine suivante",
    jour: "Jour",
    heure: "Heure de début",
    choisirJour: "Choisissez un jour pour voir les horaires.",
    complet: "Ce jour est complet. Essayez-en un autre.",
    etape4: "4. Vos coordonnées",
    champs: { prenom: "Prénom", nom: "Nom", email: "Adresse e-mail", telephone: "Téléphone" },
    precision: "Une précision ?",
    facultatif: "(facultatif)",
    precisionAide: "Autres disponibilités, grossesse, zone à éviter…",
    accord:
      "J’ai noté que ce formulaire est une demande, confirmée par le spa, et que toute annulation ou modification doit être faite au moins 24 h avant.",
    resume: "Votre demande",
    surPlace: "Massage à choisir sur place",
    duree: "Durée : ",
    creneau: "Créneau",
    jourAChoisir: "Jour à choisir",
    reglement: "Règlement",
    parCarte: (ref: string) => `Carte cadeau ${ref}`,
    surPlacePrix: (p: string) => `${p}, sur place`,
    envoyer: "Envoyer ma demande",
    manque: "Choisissez un jour et une heure pour continuer.",
    appeler: "Vous préférez appeler ?",
  },
  en: {
    chargement: "Loading…",
    envoyee: "Request sent",
    confirmation: (email: string, tel: string) =>
      `We will confirm this appointment within 24 hours, at ${email} or on ${tel}. It is only final once we have confirmed it.`,
    prestation: "Treatment",
    creneauDemande: "Requested time",
    aPour: (h: string, d: string) => `at ${h}, for ${d}`,
    empechement: "Can’t make it? Let us know at least 24 hours before, on",
    retour: "Back to home",
    etape1: "1. Do you have a gift card?",
    etape1Aide: "If so, enter its reference. If not, go to the next step.",
    reconnue: "Card found:",
    offertePar: (de: string) => `a gift from ${de}.`,
    solde: (s: string) => `Balance: ${s}.`,
    utilisable: (semaine: boolean) =>
      `It can be used ${semaine ? "Monday to Friday" : "Monday to Saturday"}, except public holidays.`,
    plusValable: `This card is no longer valid. Call us on ${spa.telephone} to talk about it, or book without a card.`,
    aVerifier:
      "We will check this reference when we confirm your appointment. Gift cards cannot be used on Sundays or public holidays.",
    etape2: "2. Your treatment",
    deLaCarte: "This is the treatment on your gift card.",
    etape3: "3. Your time",
    precedente: "Previous week",
    suivante: "Next week",
    jour: "Day",
    heure: "Start time",
    choisirJour: "Choose a day to see the times.",
    complet: "This day is fully booked. Try another one.",
    etape4: "4. Your details",
    champs: { prenom: "First name", nom: "Last name", email: "Email address", telephone: "Phone" },
    precision: "Anything we should know?",
    facultatif: "(optional)",
    precisionAide: "Other availability, pregnancy, an area to avoid…",
    accord:
      "I understand this form is a request, confirmed by the spa, and that any cancellation or change must be made at least 24 hours before.",
    resume: "Your request",
    surPlace: "Massage chosen on the day",
    duree: "Duration: ",
    creneau: "Time",
    jourAChoisir: "Day to be chosen",
    reglement: "Payment",
    parCarte: (ref: string) => `Gift card ${ref}`,
    surPlacePrix: (p: string) => `${p}, paid at the spa`,
    envoyer: "Send my request",
    manque: "Choose a day and a time to continue.",
    appeler: "Prefer to call?",
  },
};

export function Reserver({ langue = "fr" }: { langue?: Langue }) {
  const donnees = useDonnees();
  if (!donnees)
    return <p className="conteneur pb-24 text-discret">{textes[langue].chargement}</p>;
  return (
    <Formulaire langue={langue} cartes={donnees.cartes} reservations={donnees.reservations} />
  );
}

function Formulaire({
  langue,
  cartes,
  reservations,
}: {
  langue: Langue;
  cartes: Carte[];
  reservations: Reservation[];
}) {
  const t = textes[langue];
  const params = useSearchParams();
  const [refCarte, setRefCarte] = useState(params.get("carte") ?? "");
  const [offreChoisie, setOffreChoisie] = useState(
    getOffre(params.get("offre"))?.reservable ? params.get("offre")! : "massage-solo-60",
  );
  const [destination, setDestination] = useState(
    getMassage(params.get("destination"))?.slug ?? "",
  );
  const [semaine, setSemaine] = useState(0);
  const [date, setDate] = useState("");
  const [heure, setHeure] = useState("");
  const [coord, setCoord] = useState({ prenom: "", nom: "", email: "", telephone: "", note: "" });
  const [accord, setAccord] = useState(false);
  const [envoyee, setEnvoyee] = useState<Reservation | null>(null);

  // La carte cadeau, si la référence saisie correspond à une carte connue.
  const refNormalisee = refCarte.trim() ? normaliserReference(refCarte) : "";
  const carte = cartes.find((c) => c.reference === refNormalisee);
  const carteValable = carte ? statutCarte(carte) === "active" : false;
  const offreDeLaCarte = carte && carteValable ? getOffre(carte.offreId) : undefined;
  // Une carte pour une prestation précise fixe le choix ; un bon ou un abonnement le laisse libre.
  const verrouillee = Boolean(offreDeLaCarte?.reservable);

  const offreId = verrouillee ? offreDeLaCarte!.id : offreChoisie;
  const offre = getOffre(offreId)!;
  const destinationEffective =
    verrouillee && carte?.destination ? carte.destination : destination;
  const nomMassage = (slug?: string) => (slug ? massageEn(slug, langue)?.nom : undefined);

  const regles = {
    carte: Boolean(refNormalisee),
    semaineSeulement: Boolean(carteValable && carte?.semaineSeulement),
  };

  const jours = useMemo(() => {
    const demain = ajouterJours(new Date(), 1);
    return Array.from({ length: 7 }, (_, i) => versCle(ajouterJours(demain, semaine * 7 + i)));
  }, [semaine]);

  const dateValide = date && jourOuvert(date, regles) ? date : "";
  const creneaux = dateValide ? creneauxDuJour(dateValide, offreId, reservations) : [];
  const heureValide = creneaux.some((c) => c.heure === heure && c.libre) ? heure : "";

  function envoyer(e: React.FormEvent) {
    e.preventDefault();
    if (!dateValide || !heureValide) return;
    setEnvoyee(
      creerReservation({
        offreId,
        destination: offre.categorie === "massage" ? destinationEffective || undefined : undefined,
        date: dateValide,
        heure: heureValide,
        carte: refNormalisee || undefined,
        ...coord,
      }),
    );
    window.scrollTo({ top: 0 });
  }

  if (envoyee) {
    const offreEnvoyee = getOffre(envoyee.offreId)!;
    return (
      <div className="conteneur max-w-3xl pb-24" role="status">
        <div className="rounded-2xl border border-accent/50 bg-surface p-8 md:p-12">
          <h2 className="text-3xl md:text-4xl">{t.envoyee}</h2>
          <p className="mt-3 text-texte/85">{t.confirmation(envoyee.email, envoyee.telephone)}</p>
          <dl className="mt-8 grid gap-5 sm:grid-cols-2">
            <div>
              <dt className="text-sm text-discret">{t.prestation}</dt>
              <dd className="font-titre text-2xl font-light">{nomOffre(offreEnvoyee, langue)}</dd>
              {envoyee.destination && (
                <dd className="text-texte/85">{nomMassage(envoyee.destination)}</dd>
              )}
            </div>
            <div>
              <dt className="text-sm text-discret">{t.creneauDemande}</dt>
              <dd className="font-titre text-2xl font-light first-letter:uppercase">
                {dateLongue(envoyee.date, langue)}
              </dd>
              <dd className="text-texte/85">
                {t.aPour(heureLisible(envoyee.heure, langue), dureeLisible(envoyee.duree))}
              </dd>
            </div>
          </dl>
        </div>
        <p className="mt-6 text-discret">
          {t.empechement}{" "}
          <a href={`tel:${spa.telephoneLien}`} className="lien">
            {spa.telephone}
          </a>
          .
        </p>
        <Link href={chemin(langue, "/")} className="btn btn-contour mt-6">
          {t.retour}
        </Link>
      </div>
    );
  }

  return (
    <form
      onSubmit={envoyer}
      className="conteneur grid gap-12 pb-20 lg:grid-cols-[1fr_22rem] lg:gap-16"
    >
      <div className="space-y-12">
        <section aria-labelledby="etape-carte">
          <h2 id="etape-carte" className="mb-2 text-2xl md:text-3xl">
            {t.etape1}
          </h2>
          <label htmlFor="carte" className="etiquette font-normal text-discret">
            {t.etape1Aide}
          </label>
          <input
            id="carte"
            className="champ max-w-sm uppercase"
            value={refCarte}
            onChange={(e) => setRefCarte(e.target.value)}
            placeholder="ABDM-XXXX-XXXX"
            autoComplete="off"
            aria-describedby="carte-etat"
          />
          <div id="carte-etat" aria-live="polite" className="mt-3 max-w-xl text-sm">
            {carte && carteValable && (
              <p className="rounded-xl bg-surface p-4">
                <strong className="font-medium">{t.reconnue}</strong>{" "}
                {offreDeLaCarte ? nomOffre(offreDeLaCarte, langue) : carte.intitule},{" "}
                {t.offertePar(carte.de)}{" "}
                {carte.quantite > 1 && `${t.solde(soldeLisible(carte, langue))} `}
                {t.utilisable(Boolean(carte.semaineSeulement))}
              </p>
            )}
            {carte && !carteValable && (
              <p role="alert" className="rounded-xl border border-accent bg-surface p-4">
                {t.plusValable}
              </p>
            )}
            {!carte && refNormalisee && <p className="rounded-xl bg-surface p-4">{t.aVerifier}</p>}
          </div>
        </section>

        <section aria-labelledby="etape-prestation">
          <h2 id="etape-prestation" className="mb-5 text-2xl md:text-3xl">
            {t.etape2}
          </h2>
          {verrouillee ? (
            <p className="rounded-xl border border-trait p-4">
              <strong className="font-medium">{nomOffre(offre, langue)}</strong>
              {offre.detail && ` (${detailOffre(offre, langue)})`}. {t.deLaCarte}
            </p>
          ) : (
            <ChoixOffre
              langue={langue}
              usage="rendez-vous"
              offreId={offreId}
              destination={destination}
              onChange={(o, d) => {
                setOffreChoisie(o);
                setDestination(d);
              }}
            />
          )}
        </section>

        <section aria-labelledby="etape-creneau">
          <h2 id="etape-creneau" className="mb-5 text-2xl md:text-3xl">
            {t.etape3}
          </h2>
          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              className="btn btn-contour btn-petit"
              disabled={semaine === 0}
              onClick={() => setSemaine((s) => s - 1)}
            >
              {t.precedente}
            </button>
            <button
              type="button"
              className="btn btn-contour btn-petit"
              disabled={semaine >= SEMAINES - 1}
              onClick={() => setSemaine((s) => s + 1)}
            >
              {t.suivante}
            </button>
          </div>
          <div role="group" aria-label={t.jour} className="mt-4 grid grid-cols-4 gap-2 sm:grid-cols-7">
            {jours.map((cle) => {
              const ouvert = jourOuvert(cle, regles);
              return (
                <button
                  key={cle}
                  type="button"
                  disabled={!ouvert}
                  aria-pressed={dateValide === cle}
                  aria-label={dateLongue(cle, langue)}
                  onClick={() => {
                    setDate(cle);
                    setHeure("");
                  }}
                  className="choix !flex-col !gap-0 !px-1 !py-2 !no-underline"
                >
                  <span className="text-xs font-normal capitalize opacity-75">
                    {jourCourt(cle, langue)}
                  </span>
                  <span className="font-titre text-2xl leading-tight">
                    {depuisCle(cle).getDate()}
                  </span>
                  <span className="text-xs font-normal opacity-75">{moisCourt(cle, langue)}</span>
                </button>
              );
            })}
          </div>

          <div className="mt-6" aria-live="polite">
            {!dateValide ? (
              <p className="text-discret">{t.choisirJour}</p>
            ) : (
              <>
                <p className="mb-3 font-medium first-letter:uppercase">
                  {dateLongue(dateValide, langue)}
                </p>
                <div
                  role="group"
                  aria-label={t.heure}
                  className="grid grid-cols-4 gap-2 sm:grid-cols-7"
                >
                  {creneaux.map((c) => (
                    <button
                      key={c.heure}
                      type="button"
                      disabled={!c.libre}
                      aria-pressed={heureValide === c.heure}
                      onClick={() => setHeure(c.heure)}
                      className="choix tabular-nums !px-1"
                    >
                      {heureLisible(c.heure, langue)}
                    </button>
                  ))}
                </div>
                {creneaux.every((c) => !c.libre) && (
                  <p className="mt-3 text-discret">{t.complet}</p>
                )}
              </>
            )}
          </div>
        </section>

        <section aria-labelledby="etape-coord">
          <h2 id="etape-coord" className="mb-5 text-2xl md:text-3xl">
            {t.etape4}
          </h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {(
              [
                ["prenom", "text", "given-name"],
                ["nom", "text", "family-name"],
                ["email", "email", "email"],
                ["telephone", "tel", "tel"],
              ] as const
            ).map(([cle, type, auto]) => (
              <div key={cle}>
                <label htmlFor={cle} className="etiquette">
                  {t.champs[cle]}
                </label>
                <input
                  id={cle}
                  type={type}
                  className="champ"
                  required
                  autoComplete={auto}
                  value={coord[cle]}
                  onChange={(e) => setCoord({ ...coord, [cle]: e.target.value })}
                />
              </div>
            ))}
            <div className="sm:col-span-2">
              <label htmlFor="note" className="etiquette">
                {t.precision} <span className="font-normal text-discret">{t.facultatif}</span>
              </label>
              <textarea
                id="note"
                rows={3}
                className="champ"
                value={coord.note}
                onChange={(e) => setCoord({ ...coord, note: e.target.value })}
                placeholder={t.precisionAide}
              />
            </div>
          </div>
          <label className="mt-5 flex max-w-xl cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              required
              checked={accord}
              onChange={(e) => setAccord(e.target.checked)}
              className="mt-1 h-5 w-5 shrink-0 accent-accent"
            />
            <span className="text-sm">{t.accord}</span>
          </label>
        </section>
      </div>

      <aside className="lg:sticky lg:top-32 lg:self-start">
        <div className="rounded-2xl border border-trait bg-surface p-6">
          <h2 className="text-2xl">{t.resume}</h2>
          <dl className="mt-4 space-y-4">
            <div>
              <dt className="text-sm text-discret">{t.prestation}</dt>
              <dd className="font-medium">{nomOffre(offre, langue)}</dd>
              {offre.categorie === "massage" && (
                <dd className="text-sm text-discret">
                  {nomMassage(destinationEffective) ?? t.surPlace}
                </dd>
              )}
              <dd className="text-sm text-discret">
                {t.duree}
                {dureeLisible(offre.duree ?? 0)}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-discret">{t.creneau}</dt>
              <dd className="font-medium first-letter:uppercase">
                {dateValide ? dateLongue(dateValide, langue) : t.jourAChoisir}
                {heureValide && `, ${heureLisible(heureValide, langue)}`}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-discret">{t.reglement}</dt>
              <dd className="font-medium">
                {refNormalisee
                  ? t.parCarte(refNormalisee)
                  : t.surPlacePrix(prix(langue, offre.prix))}
              </dd>
            </div>
          </dl>
          <button
            type="submit"
            className="btn btn-accent mt-6 w-full"
            disabled={!dateValide || !heureValide}
          >
            {t.envoyer}
          </button>
          {(!dateValide || !heureValide) && (
            <p className="mt-2 text-center text-sm text-discret">{t.manque}</p>
          )}
        </div>
        <p className="mt-4 text-sm text-discret">
          {t.appeler}{" "}
          <a href={`tel:${spa.telephoneLien}`} className="lien">
            {spa.telephone}
          </a>
        </p>
      </aside>
    </form>
  );
}
