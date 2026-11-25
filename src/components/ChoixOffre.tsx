"use client";

import {
  categories,
  getOffre,
  offres,
  type Categorie,
  type Formule,
} from "@/lib/catalogue";
import { categoriesEn, detailOffre, massagesEn, nomOffre } from "@/lib/catalogue.en";
import { prix, type Langue } from "@/lib/langue";

type Props = {
  /** "carte" propose tout le catalogue ; "rendez-vous" seulement ce qui se réserve. */
  usage: "carte" | "rendez-vous";
  offreId: string;
  destination: string;
  onChange: (offreId: string, destination: string) => void;
  langue?: Langue;
};

const parDefaut: Record<Categorie, string> = {
  massage: "massage-solo-60",
  rituel: "rituel-hgm-solo-60",
  soin: "soin-absolution-60",
  bon: "bon-100",
};

/** Choisir une prestation : la catégorie, puis deux ou trois gestes. */
export function ChoixOffre({ usage, offreId, destination, onChange, langue = "fr" }: Props) {
  const fr = langue === "fr";
  const cat = (id: Categorie) =>
    fr ? categories.find((c) => c.id === id)! : categoriesEn[id];
  const offre = getOffre(offreId) ?? getOffre(parDefaut.massage)!;
  const disponibles = offres.filter((o) => usage === "carte" || o.reservable);
  const onglets = categories.filter((c) => disponibles.some((o) => o.categorie === c.id));
  const categorie = offre.categorie;
  const abonnement = offre.unite === "minutes";
  const duree = offre.duree ?? 60;
  const formule: Formule = offre.formule ?? "solo";

  return (
    <div>
      <div role="tablist" aria-label={fr ? "Type de prestation" : "Type of treatment"} className="flex flex-wrap gap-2">
        {onglets.map((c) => (
          <button
            key={c.id}
            type="button"
            role="tab"
            aria-selected={categorie === c.id}
            onClick={() => onChange(parDefaut[c.id], destination)}
            className="rounded-full border-[1.5px] border-trait px-4 py-2 font-medium hover:border-texte aria-selected:border-accent aria-selected:bg-accent aria-selected:text-fond"
          >
            {cat(c.id).nom}
          </button>
        ))}
      </div>
      <p className="mt-4 text-discret">
        {cat(categorie).intro}
      </p>

      {categorie === "massage" ? (
        <div className="mt-6 space-y-6">
          <fieldset>
            <legend className="etiquette">{fr ? "Durée" : "Duration"}</legend>
            <div className="flex flex-wrap gap-2">
              {[30, 60, 90].map((d) => (
                <button
                  key={d}
                  type="button"
                  className="choix"
                  aria-pressed={!abonnement && duree === d}
                  onClick={() => onChange(`massage-${formule}-${d}`, destination)}
                >
                  {d} min
                </button>
              ))}
              {usage === "carte" &&
                ["abonnement-6h", "abonnement-12h"].map((id) => (
                  <button
                    key={id}
                    type="button"
                    className="choix"
                    aria-pressed={offre.id === id}
                    onClick={() => onChange(id, "")}
                  >
                    {id === "abonnement-6h"
                      ? fr
                        ? "Abonnement 6 h"
                        : "6-hour pass"
                      : fr
                        ? "Abonnement 12 h"
                        : "12-hour pass"}
                  </button>
                ))}
            </div>
          </fieldset>

          {abonnement ? (
            <p className="rounded-xl bg-surface p-4 text-sm">
              {fr
                ? "Des heures de massage à dépenser en séances de 30, 60 ou 90 minutes. Valable 1 an, du lundi au vendredi."
                : "Hours of massage to use in sessions of 30, 60 or 90 minutes. Valid for 1 year, Monday to Friday."}
            </p>
          ) : (
            <>
              <fieldset>
                <legend className="etiquette">
                  {fr ? "Pour combien de personnes ?" : "For how many people?"}
                </legend>
                <div className="flex flex-wrap gap-2">
                  {(["solo", "duo"] as const).map((f) => (
                    <button
                      key={f}
                      type="button"
                      className="choix"
                      aria-pressed={formule === f}
                      onClick={() => onChange(`massage-${f}-${duree}`, destination)}
                    >
                      {f === "solo" ? "Solo" : fr ? "Duo, dans la même salle" : "Duo, in the same room"}
                    </button>
                  ))}
                </div>
              </fieldset>
              <div>
                <label htmlFor="destination" className="etiquette">
                  {fr ? "Massage souhaité" : "Preferred massage"}{" "}
                  <span className="font-normal text-discret">{fr ? "(facultatif)" : "(optional)"}</span>
                </label>
                <select
                  id="destination"
                  className="champ max-w-md"
                  value={destination}
                  onChange={(e) => onChange(offre.id, e.target.value)}
                >
                  <option value="">
                    {fr ? "À choisir le jour du rendez-vous" : "Choose on the day"}
                  </option>
                  {massagesEn(langue).map((m) => (
                    <option key={m.slug} value={m.slug}>
                      {m.nom}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}
        </div>
      ) : (
        <div role="radiogroup" aria-label={fr ? "Prestation" : "Treatment"} className="mt-6 grid gap-2 sm:grid-cols-2">
          {disponibles
            .filter((o) => o.categorie === categorie)
            .map((o) => (
              <button
                key={o.id}
                type="button"
                role="radio"
                aria-checked={offre.id === o.id}
                onClick={() => onChange(o.id, "")}
                className="choix !justify-between gap-4 !py-3 text-left"
              >
                <span>
                  {nomOffre(o, langue)}
                  {o.detail && (
                    <span className="block text-sm font-normal opacity-75">
                      {detailOffre(o, langue)}
                    </span>
                  )}
                </span>
                <span className="shrink-0 tabular-nums">{prix(langue, o.prix)}</span>
              </button>
            ))}
        </div>
      )}
    </div>
  );
}
