"use client";

// Stockage des cartes cadeaux et des réservations.
//
// Il n'y a pas encore de backend : tout est enregistré dans le navigateur
// (localStorage). Le reste du site ne passe que par les fonctions exportées
// ici ; le jour où une API existe, seul ce fichier est à réécrire.

import { useSyncExternalStore } from "react";
import { getOffre, libelleOffre, type Formule, type Unite } from "./catalogue";
import {
  ajouterJours,
  ajouterMois,
  depuisCle,
  enMinutes,
  estFerie,
  versCle,
} from "./dates";

export type Carte = {
  reference: string;
  offreId: string | null;
  intitule: string;
  prix: number;
  formule?: Formule;
  destination?: string; // slug du massage choisi, facultatif
  unite: Unite;
  quantite: number;
  restant: number;
  semaineSeulement?: boolean;
  de: string;
  pour: string;
  message: string;
  email: string;
  origine: "site" | "salon";
  creeLe: string; // ISO
  expireLe: string; // AAAA-MM-JJ
  annulee: boolean;
};

export type StatutCarte = "active" | "utilisee" | "expiree" | "annulee";

export type StatutReservation = "en-attente" | "confirmee" | "terminee" | "annulee";

export type Reservation = {
  id: string;
  creeLe: string;
  offreId: string;
  intitule: string;
  destination?: string;
  date: string; // AAAA-MM-JJ
  heure: string; // HH:MM
  duree: number;
  prenom: string;
  nom: string;
  email: string;
  telephone: string;
  carte?: string; // référence de carte cadeau
  note: string;
  statut: StatutReservation;
};

type Donnees = { cartes: Carte[]; reservations: Reservation[] };

const CLE = "abdm.donnees.v1";
const VIDE: Donnees = { cartes: [], reservations: [] };

let cache: Donnees = VIDE;
let cacheBrut: string | null = null;
const abonnes = new Set<() => void>();

function lire(): Donnees {
  if (typeof window === "undefined") return VIDE;
  let brut: string | null = null;
  try {
    brut = window.localStorage.getItem(CLE);
  } catch {
    return cache;
  }
  if (brut === cacheBrut) return cache;
  cacheBrut = brut;
  try {
    const lu = brut ? (JSON.parse(brut) as Partial<Donnees>) : {};
    cache = { cartes: lu.cartes ?? [], reservations: lu.reservations ?? [] };
  } catch {
    cache = VIDE;
  }
  return cache;
}

function ecrire(suivant: Donnees) {
  cache = suivant;
  cacheBrut = JSON.stringify(suivant);
  try {
    window.localStorage.setItem(CLE, cacheBrut);
  } catch {
    // Stockage indisponible (navigation privée) : on garde l'état en mémoire.
  }
  abonnes.forEach((f) => f());
}

function abonner(f: () => void) {
  abonnes.add(f);
  const surStockage = (e: StorageEvent) => e.key === CLE && f();
  window.addEventListener("storage", surStockage);
  return () => {
    abonnes.delete(f);
    window.removeEventListener("storage", surStockage);
  };
}

/** Données en direct. Vaut `null` tant que la page n'est pas chargée côté navigateur. */
export function useDonnees(): Donnees | null {
  return useSyncExternalStore(abonner, lire, () => null);
}

// ————— Cartes cadeaux —————

const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

function nouvelleReference() {
  const octets = crypto.getRandomValues(new Uint8Array(8));
  const code = Array.from(octets, (o) => ALPHABET[o % ALPHABET.length]).join("");
  return `ABDM-${code.slice(0, 4)}-${code.slice(4)}`;
}

export function normaliserReference(saisie: string) {
  const brut = saisie.toUpperCase().replace(/[^A-Z0-9]/g, "");
  const corps = brut.startsWith("ABDM") ? brut.slice(4) : brut;
  if (corps.length !== 8) return saisie.trim().toUpperCase();
  return `ABDM-${corps.slice(0, 4)}-${corps.slice(4)}`;
}

export function statutCarte(c: Carte, aujourdHui = versCle(new Date())): StatutCarte {
  if (c.annulee) return "annulee";
  if (c.restant <= 0) return "utilisee";
  if (c.expireLe < aujourdHui) return "expiree";
  return "active";
}

export function soldeLisible(
  c: Pick<Carte, "unite" | "restant" | "quantite">,
  langue: "fr" | "en" = "fr",
) {
  const fr = langue === "fr";
  const sur = fr ? "sur" : "of";
  if (c.unite === "euros") return `${c.restant} € ${sur} ${c.quantite} €`;
  if (c.unite === "minutes") {
    const h = (n: number) =>
      n % 60 === 0 ? `${n / 60} h` : `${Math.floor(n / 60)} h ${n % 60}`;
    return `${h(c.restant)} ${sur} ${h(c.quantite)}`;
  }
  if (c.restant === 0) return fr ? "aucune séance restante" : "no sessions left";
  if (c.quantite === 1) return fr ? "1 séance" : "1 session";
  return fr ? `${c.restant} séances sur ${c.quantite}` : `${c.restant} of ${c.quantite} sessions`;
}

export type NouvelleCarte = {
  offreId: string;
  destination?: string;
  de: string;
  pour: string;
  message: string;
  email: string;
  origine: "site" | "salon";
};

export function creerCarte(saisie: NouvelleCarte): Carte {
  const offre = getOffre(saisie.offreId);
  if (!offre) throw new Error("Offre inconnue");
  const maintenant = new Date();
  const carte: Carte = {
    reference: nouvelleReference(),
    offreId: offre.id,
    intitule: libelleOffre(offre),
    prix: offre.prix,
    formule: offre.formule,
    destination: offre.categorie === "massage" ? saisie.destination : undefined,
    unite: offre.unite,
    quantite: offre.quantite,
    restant: offre.quantite,
    semaineSeulement: offre.semaineSeulement,
    de: saisie.de.trim(),
    pour: saisie.pour.trim(),
    message: saisie.message.trim(),
    email: saisie.email.trim(),
    origine: saisie.origine,
    creeLe: maintenant.toISOString(),
    expireLe: versCle(ajouterMois(maintenant, offre.validiteMois)),
    annulee: false,
  };
  const d = lire();
  ecrire({ ...d, cartes: [carte, ...d.cartes] });
  return carte;
}

export function trouverCarte(reference: string) {
  const ref = normaliserReference(reference);
  return lire().cartes.find((c) => c.reference === ref);
}

function modifierCarte(reference: string, f: (c: Carte) => Carte) {
  const d = lire();
  ecrire({
    ...d,
    cartes: d.cartes.map((c) => (c.reference === reference ? f(c) : c)),
  });
}

export function debiterCarte(reference: string, montant: number) {
  modifierCarte(reference, (c) => ({
    ...c,
    restant: Math.max(0, c.restant - Math.max(0, montant)),
  }));
}

export function recrediterCarte(reference: string) {
  modifierCarte(reference, (c) => ({ ...c, restant: c.quantite }));
}

export function prolongerCarte(reference: string, mois: number) {
  modifierCarte(reference, (c) => ({
    ...c,
    expireLe: versCle(ajouterMois(depuisCle(c.expireLe), mois)),
  }));
}

export function annulerCarte(reference: string, annulee: boolean) {
  modifierCarte(reference, (c) => ({ ...c, annulee }));
}

// ————— Réservations —————

export const HEURES_SEMAINE = { ouverture: "10:00", dernierDepart: "20:00" };
export const HEURES_DIMANCHE = { ouverture: "10:00", dernierDepart: "18:00" };
/** Nombre de rendez-vous simultanés possibles (hors hammam, limité à un). */
const SALLES = 3;

export type Creneau = { heure: string; libre: boolean };

export type ReglesJour = { carte: boolean; semaineSeulement: boolean };

/** Un jour est-il ouvert à la réservation, compte tenu des règles des cartes ? */
export function jourOuvert(cle: string, regles: ReglesJour) {
  const d = depuisCle(cle);
  const jour = d.getDay();
  if (regles.carte && (jour === 0 || estFerie(d))) return false;
  if (regles.semaineSeulement && (jour === 0 || jour === 6)) return false;
  return true;
}

export function creneauxDuJour(
  cle: string,
  offreId: string,
  reservations: Reservation[],
): Creneau[] {
  const offre = getOffre(offreId);
  if (!offre?.duree) return [];
  const dimanche = depuisCle(cle).getDay() === 0;
  const { ouverture, dernierDepart } = dimanche ? HEURES_DIMANCHE : HEURES_SEMAINE;
  const duJour = reservations.filter((r) => r.date === cle && r.statut !== "annulee");
  const hammam = offre.categorie === "rituel";
  const creneaux: Creneau[] = [];
  for (let t = enMinutes(ouverture); t <= enMinutes(dernierDepart); t += 30) {
    const chevauche = (r: Reservation) =>
      enMinutes(r.heure) < t + offre.duree! && t < enMinutes(r.heure) + r.duree;
    const occupes = duJour.filter(chevauche);
    const hammamPris =
      hammam && occupes.some((r) => getOffre(r.offreId)?.categorie === "rituel");
    const heure = `${String(Math.floor(t / 60)).padStart(2, "0")}:${String(t % 60).padStart(2, "0")}`;
    creneaux.push({ heure, libre: !hammamPris && occupes.length < SALLES });
  }
  return creneaux;
}

export type NouvelleReservation = Omit<
  Reservation,
  "id" | "creeLe" | "statut" | "intitule" | "duree"
>;

export function creerReservation(saisie: NouvelleReservation): Reservation {
  const offre = getOffre(saisie.offreId);
  if (!offre?.duree) throw new Error("Prestation non réservable");
  const reservation: Reservation = {
    ...saisie,
    carte: saisie.carte ? normaliserReference(saisie.carte) : undefined,
    id: crypto.randomUUID(),
    creeLe: new Date().toISOString(),
    intitule: libelleOffre(offre),
    duree: offre.duree,
    statut: "en-attente",
  };
  const d = lire();
  ecrire({ ...d, reservations: [reservation, ...d.reservations] });
  return reservation;
}

export function changerStatutReservation(id: string, statut: StatutReservation) {
  const d = lire();
  const cible = d.reservations.find((r) => r.id === id);
  if (!cible || cible.statut === statut) return;
  let cartes = d.cartes;
  // Terminer un rendez-vous réglé par carte débite une séance de cette carte.
  if (statut === "terminee" && cible.carte) {
    cartes = cartes.map((c) =>
      c.reference === cible.carte && c.unite === "seances" && c.restant > 0
        ? { ...c, restant: c.restant - 1 }
        : c,
    );
  }
  ecrire({
    cartes,
    reservations: d.reservations.map((r) => (r.id === id ? { ...r, statut } : r)),
  });
}

// ————— Outils de démonstration —————

export function chargerExemples() {
  const base = new Date();
  const jour = (n: number) => versCle(ajouterJours(base, n));
  const carte = (
    reference: string,
    offreId: string,
    pour: string,
    de: string,
    ilYAJours: number,
    extra: Partial<Carte> = {},
  ): Carte => {
    const offre = getOffre(offreId)!;
    const cree = ajouterJours(base, -ilYAJours);
    return {
      reference,
      offreId,
      intitule: libelleOffre(offre),
      prix: offre.prix,
      formule: offre.formule,
      unite: offre.unite,
      quantite: offre.quantite,
      restant: offre.quantite,
      semaineSeulement: offre.semaineSeulement,
      de,
      pour,
      message: "",
      email: "exemple@auboutdumonde.eu",
      origine: "site",
      creeLe: cree.toISOString(),
      expireLe: versCle(ajouterMois(cree, offre.validiteMois)),
      annulee: false,
      ...extra,
    };
  };
  const cartes = [
    carte("ABDM-EXEM-PLE1", "massage-duo-60", "Camille et Noé", "Inès", 12, {
      destination: "balinais",
      message: "Joyeux anniversaire à vous deux !",
    }),
    carte("ABDM-EXEM-PLE2", "rituel-hgm-solo-60", "Maman", "Théo", 40),
    carte("ABDM-EXEM-PLE3", "bon-100", "Sacha", "L’équipe", 75, { restant: 35 }),
    carte("ABDM-EXEM-PLE4", "abonnement-6h", "Jeanne", "Jeanne", 120, {
      restant: 210,
      origine: "salon",
    }),
    carte("ABDM-EXEM-PLE5", "massage-solo-90", "Louis", "Anna", 200),
    carte("ABDM-EXEM-PLE6", "soin-kobido-5", "Margaux", "Margaux", 30, {
      restant: 3,
      origine: "salon",
    }),
  ];
  const resa = (
    n: number,
    heure: string,
    offreId: string,
    prenom: string,
    nom: string,
    statut: StatutReservation,
    extra: Partial<Reservation> = {},
  ): Reservation => {
    const offre = getOffre(offreId)!;
    return {
      id: crypto.randomUUID(),
      creeLe: base.toISOString(),
      offreId,
      intitule: libelleOffre(offre),
      date: jour(n),
      heure,
      duree: offre.duree!,
      prenom,
      nom,
      email: `${prenom.toLowerCase()}@exemple.fr`,
      telephone: "06 00 00 00 00",
      note: "",
      statut,
      ...extra,
    };
  };
  const reservations = [
    resa(2, "14:00", "massage-duo-60", "Camille", "Roux", "en-attente", {
      carte: "ABDM-EXEM-PLE1",
      destination: "balinais",
    }),
    resa(3, "11:30", "soin-kobido-60", "Margaux", "Petit", "confirmee", {
      carte: "ABDM-EXEM-PLE6",
    }),
    resa(4, "17:00", "rituel-hgm-solo-60", "Hélène", "Marchand", "en-attente", {
      carte: "ABDM-EXEM-PLE2",
      note: "Plutôt en fin de journée si possible.",
    }),
    resa(5, "10:00", "massage-solo-60", "Karim", "Benali", "confirmee", {
      destination: "tuina",
    }),
  ];
  const d = lire();
  const connues = new Set(d.cartes.map((c) => c.reference));
  ecrire({
    cartes: [...d.cartes, ...cartes.filter((c) => !connues.has(c.reference))],
    reservations: [...reservations, ...d.reservations],
  });
}

export function toutEffacer() {
  ecrire(VIDE);
}
