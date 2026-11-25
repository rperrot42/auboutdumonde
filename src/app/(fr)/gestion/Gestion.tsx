"use client";

import Link from "next/link";
import { useState } from "react";
import { ChoixOffre } from "@/components/ChoixOffre";
import { getMassage } from "@/lib/catalogue";
import { dateCourte, dateLongue, euros, heureLisible } from "@/lib/dates";
import {
  annulerCarte,
  changerStatutReservation,
  chargerExemples,
  creerCarte,
  debiterCarte,
  prolongerCarte,
  recrediterCarte,
  soldeLisible,
  statutCarte,
  toutEffacer,
  useDonnees,
  type Carte,
  type Reservation,
  type StatutCarte,
  type StatutReservation,
} from "@/lib/store";

const nomsReservation: Record<StatutReservation, string> = {
  "en-attente": "À confirmer",
  confirmee: "Confirmé",
  terminee: "Terminé",
  annulee: "Annulé",
};
const nomsCarte: Record<StatutCarte, string> = {
  active: "Valable",
  utilisee: "Utilisée",
  expiree: "Expirée",
  annulee: "Annulée",
};

function Pastille({ nom, ton }: { nom: string; ton: "fort" | "ok" | "neutre" }) {
  const classes = {
    fort: "bg-accent text-fond",
    ok: "border border-accent/60 text-accent",
    neutre: "bg-trait text-texte",
  };
  return (
    <span className={`inline-block whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-medium ${classes[ton]}`}>
      {nom}
    </span>
  );
}

export function Gestion() {
  const donnees = useDonnees();
  const [onglet, setOnglet] = useState<"rdv" | "cartes">("rdv");
  if (!donnees) return <p className="mt-10 text-discret">Chargement…</p>;

  const { cartes, reservations } = donnees;
  const actives = cartes.filter((c) => statutCarte(c) === "active");
  const enAttente = reservations.filter((r) => r.statut === "en-attente").length;
  const enCirculation = actives.reduce((s, c) => s + (c.prix * c.restant) / c.quantite, 0);

  return (
    <>
      <dl className="mt-8 grid gap-4 sm:grid-cols-3">
        {[
          ["Rendez-vous à confirmer", String(enAttente)],
          ["Cartes valables", String(actives.length)],
          ["Valeur restant à honorer", euros(Math.round(enCirculation))],
        ].map(([nom, valeur]) => (
          <div key={nom} className="rounded-xl bg-surface p-5">
            <dt className="text-sm text-discret">{nom}</dt>
            <dd className="font-titre text-4xl">{valeur}</dd>
          </div>
        ))}
      </dl>

      <div role="tablist" aria-label="Rubriques" className="mt-10 flex gap-2 border-b border-trait">
        {(
          [
            ["rdv", `Rendez-vous (${reservations.length})`],
            ["cartes", `Cartes cadeaux (${cartes.length})`],
          ] as const
        ).map(([id, nom]) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={onglet === id}
            onClick={() => setOnglet(id)}
            className="-mb-px border-b-[3px] border-transparent px-3 py-3 font-medium text-discret aria-selected:border-accent aria-selected:text-texte"
          >
            {nom}
          </button>
        ))}
      </div>

      <div className="mt-8">
        {onglet === "rdv" ? (
          <RendezVous reservations={reservations} />
        ) : (
          <Cartes cartes={cartes} />
        )}
      </div>

      <div className="mt-16 flex flex-wrap items-center gap-3 border-t border-trait pt-6 text-sm">
        <span className="text-discret">Pour tester :</span>
        <button type="button" className="btn btn-contour btn-petit" onClick={chargerExemples}>
          Ajouter des données d’exemple
        </button>
        <button
          type="button"
          className="btn btn-contour btn-petit"
          onClick={() => {
            if (window.confirm("Effacer toutes les cartes et tous les rendez-vous de ce navigateur ?"))
              toutEffacer();
          }}
        >
          Tout effacer
        </button>
      </div>
    </>
  );
}

function RendezVous({ reservations }: { reservations: Reservation[] }) {
  const [filtre, setFiltre] = useState<StatutReservation | "tous">("tous");
  const liste = reservations
    .filter((r) => filtre === "tous" || r.statut === filtre)
    .sort((a, b) => (a.date + a.heure).localeCompare(b.date + b.heure));

  if (reservations.length === 0)
    return (
      <p className="text-discret">
        Aucune demande pour l’instant. Elles apparaîtront ici dès qu’un client utilisera
        la page{" "}
        <Link href="/reservation" className="lien">
          Prendre rendez-vous
        </Link>
        .
      </p>
    );

  return (
    <>
      <div className="flex flex-wrap gap-2">
        {(["tous", "en-attente", "confirmee", "terminee", "annulee"] as const).map((f) => (
          <button
            key={f}
            type="button"
            className="choix !min-h-9 !py-1 text-sm"
            aria-pressed={filtre === f}
            onClick={() => setFiltre(f)}
          >
            {f === "tous" ? "Tous" : nomsReservation[f]}
          </button>
        ))}
      </div>
      <ul className="mt-6 space-y-3">
        {liste.map((r) => (
          <li
            key={r.id}
            className="grid gap-4 rounded-xl border border-trait p-5 md:grid-cols-[13rem_1fr_auto] md:items-start"
          >
            <div>
              <p className="font-titre text-xl first-letter:uppercase">{dateLongue(r.date)}</p>
              <p className="tabular-nums text-discret">{heureLisible(r.heure)}</p>
              <p className="mt-2">
                <Pastille
                  nom={nomsReservation[r.statut]}
                  ton={r.statut === "en-attente" ? "fort" : r.statut === "confirmee" ? "ok" : "neutre"}
                />
              </p>
            </div>
            <div className="min-w-0">
              <p className="font-medium">
                {r.intitule}
                {r.destination && `, ${getMassage(r.destination)?.nom.toLowerCase()}`}
              </p>
              <p>
                {r.prenom} {r.nom}
              </p>
              <p className="break-words text-sm text-discret">
                {r.telephone}, {r.email}
              </p>
              {r.carte && (
                <p className="mt-1 text-sm">
                  Carte{" "}
                  <Link href={`/carte-cadeau/billet?ref=${r.carte}`} className="lien tabular-nums">
                    {r.carte}
                  </Link>
                </p>
              )}
              {r.note && <p className="mt-2 text-sm italic">« {r.note} »</p>}
            </div>
            <div className="flex flex-wrap gap-2 md:flex-col">
              {r.statut === "en-attente" && (
                <button
                  type="button"
                  className="btn btn-accent btn-petit"
                  onClick={() => changerStatutReservation(r.id, "confirmee")}
                >
                  Confirmer
                </button>
              )}
              {r.statut === "confirmee" && (
                <button
                  type="button"
                  className="btn btn-accent btn-petit"
                  onClick={() => changerStatutReservation(r.id, "terminee")}
                >
                  Marquer terminé
                </button>
              )}
              {(r.statut === "en-attente" || r.statut === "confirmee") && (
                <button
                  type="button"
                  className="btn btn-contour btn-petit"
                  onClick={() => changerStatutReservation(r.id, "annulee")}
                >
                  Annuler
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
      {liste.length === 0 && <p className="mt-6 text-discret">Aucun rendez-vous dans ce filtre.</p>}
    </>
  );
}

function Cartes({ cartes }: { cartes: Carte[] }) {
  const [recherche, setRecherche] = useState("");
  const [creation, setCreation] = useState(false);
  const terme = recherche.trim().toLowerCase();
  const liste = cartes.filter(
    (c) =>
      !terme ||
      [c.reference, c.pour, c.de, c.email, c.intitule].some((v) => v.toLowerCase().includes(terme)),
  );

  return (
    <>
      <div className="flex flex-wrap items-end gap-3">
        <div className="min-w-56 flex-1">
          <label htmlFor="recherche" className="etiquette">
            Rechercher une carte
          </label>
          <input
            id="recherche"
            type="search"
            className="champ"
            value={recherche}
            onChange={(e) => setRecherche(e.target.value)}
            placeholder="Référence, prénom, e-mail…"
          />
        </div>
        <button
          type="button"
          className="btn btn-accent"
          aria-expanded={creation}
          onClick={() => setCreation((c) => !c)}
        >
          {creation ? "Fermer" : "Créer une carte"}
        </button>
      </div>

      {creation && <NouvelleCarte onCreee={() => setCreation(false)} />}

      {cartes.length === 0 ? (
        <p className="mt-8 text-discret">
          Aucune carte pour l’instant. Créez-en une ici pour une vente au salon, ou depuis
          la page{" "}
          <Link href="/carte-cadeau" className="lien">
            Offrir une carte
          </Link>
          .
        </p>
      ) : (
        <ul className="mt-6 space-y-3">
          {liste.map((c) => (
            <LigneCarte key={c.reference} carte={c} />
          ))}
        </ul>
      )}
      {cartes.length > 0 && liste.length === 0 && (
        <p className="mt-6 text-discret">Aucune carte ne correspond à « {recherche} ».</p>
      )}
    </>
  );
}

function LigneCarte({ carte: c }: { carte: Carte }) {
  const [montant, setMontant] = useState("");
  const statut = statutCarte(c);
  const unite = c.unite === "euros" ? "€" : c.unite === "minutes" ? "min" : "séance";

  return (
    <li className="grid gap-4 rounded-xl border border-trait p-5 lg:grid-cols-[14rem_1fr_auto] lg:items-start">
      <div>
        <Link
          href={`/carte-cadeau/billet?ref=${c.reference}`}
          className="lien font-medium tabular-nums"
        >
          {c.reference}
        </Link>
        <p className="mt-2 flex flex-wrap gap-1.5">
          <Pastille nom={nomsCarte[statut]} ton={statut === "active" ? "ok" : "neutre"} />
          <Pastille nom={c.origine === "site" ? "Site" : "Salon"} ton="neutre" />
        </p>
      </div>
      <div className="min-w-0">
        <p className="font-medium">
          {c.intitule}
          {c.destination && `, ${getMassage(c.destination)?.nom.toLowerCase()}`}
          <span className="font-normal text-discret"> ({euros(c.prix)})</span>
        </p>
        <p>
          Pour {c.pour || "?"}, de la part de {c.de || "?"}
        </p>
        <p className="break-words text-sm text-discret">
          {c.email && `${c.email}, `}achetée le {dateCourte(c.creeLe)}, valable jusqu’au{" "}
          {dateCourte(c.expireLe)}
        </p>
        <p className="mt-1 text-sm">
          <strong>Solde :</strong> {soldeLisible(c)}
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-2 lg:max-w-64 lg:justify-end">
        {statut === "active" && c.unite !== "seances" && (
          <form
            className="flex items-center gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              debiterCarte(c.reference, Number(montant));
              setMontant("");
            }}
          >
            <label className="sr-only" htmlFor={`debit-${c.reference}`}>
              Montant à débiter en {unite}
            </label>
            <input
              id={`debit-${c.reference}`}
              type="number"
              min={1}
              max={c.restant}
              required
              className="champ !min-h-9 w-24 !py-1"
              placeholder={unite}
              value={montant}
              onChange={(e) => setMontant(e.target.value)}
            />
            <button type="submit" className="btn btn-accent btn-petit">
              Débiter
            </button>
          </form>
        )}
        {statut === "active" && c.unite === "seances" && (
          <button
            type="button"
            className="btn btn-accent btn-petit"
            onClick={() => debiterCarte(c.reference, 1)}
          >
            {c.quantite > 1 ? "Débiter une séance" : "Marquer utilisée"}
          </button>
        )}
        {statut === "utilisee" && (
          <button
            type="button"
            className="btn btn-contour btn-petit"
            onClick={() => recrediterCarte(c.reference)}
          >
            Recréditer
          </button>
        )}
        {(statut === "active" || statut === "expiree") && (
          <button
            type="button"
            className="btn btn-contour btn-petit"
            onClick={() => prolongerCarte(c.reference, 1)}
          >
            Prolonger d’un mois
          </button>
        )}
        {statut !== "utilisee" && (
          <button
            type="button"
            className="btn btn-contour btn-petit"
            onClick={() => annulerCarte(c.reference, !c.annulee)}
          >
            {c.annulee ? "Réactiver" : "Annuler"}
          </button>
        )}
      </div>
    </li>
  );
}

function NouvelleCarte({ onCreee }: { onCreee: () => void }) {
  const [offreId, setOffreId] = useState("massage-solo-60");
  const [destination, setDestination] = useState("");
  const [champs, setChamps] = useState({ pour: "", de: "", email: "", message: "" });

  return (
    <form
      className="mt-6 space-y-6 rounded-2xl bg-surface p-6"
      onSubmit={(e) => {
        e.preventDefault();
        creerCarte({ offreId, destination, ...champs, origine: "salon" });
        onCreee();
      }}
    >
      <h2 className="text-2xl">Nouvelle carte vendue au salon</h2>
      <ChoixOffre
        usage="carte"
        offreId={offreId}
        destination={destination}
        onChange={(o, d) => {
          setOffreId(o);
          setDestination(d);
        }}
      />
      <div className="grid gap-4 sm:grid-cols-3">
        {(
          [
            ["pour", "Pour", true],
            ["de", "De la part de", true],
            ["email", "E-mail de l’acheteur (facultatif)", false],
          ] as const
        ).map(([cle, nom, requis]) => (
          <div key={cle}>
            <label htmlFor={`nc-${cle}`} className="etiquette">
              {nom}
            </label>
            <input
              id={`nc-${cle}`}
              type={cle === "email" ? "email" : "text"}
              className="champ"
              required={requis}
              value={champs[cle]}
              onChange={(e) => setChamps({ ...champs, [cle]: e.target.value })}
            />
          </div>
        ))}
      </div>
      <button type="submit" className="btn btn-accent">
        Enregistrer la carte
      </button>
    </form>
  );
}
