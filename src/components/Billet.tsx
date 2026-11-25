import { Logo } from "@/components/Logo";
import { massageEn } from "@/lib/catalogue.en";
import { dateCourte } from "@/lib/dates";
import { prix, type Langue } from "@/lib/langue";

export type DonneesBillet = {
  offreId: string | null;
  intitule: string;
  destination?: string; // slug du massage choisi, facultatif
  pour: string;
  de: string;
  message: string;
  reference?: string;
  expireLe?: string;
  validiteMois?: number;
  solde?: string;
  prix: number;
};

/** La carte cadeau : un objet sobre, or sur fond sombre. */
export function Billet({
  carte,
  className = "",
  langue = "fr",
}: {
  carte: DonneesBillet;
  className?: string;
  langue?: Langue;
}) {
  const fr = langue === "fr";
  const massage = carte.destination ? massageEn(carte.destination, langue) : undefined;
  return (
    <article
      aria-label={fr ? "Carte cadeau" : "Gift card"}
      className={`carte-cadeau relative flex min-h-80 flex-col justify-between gap-10 rounded-2xl border border-accent/50 bg-surface p-7 text-texte sm:p-9 ${className}`}
    >
      <div className="flex items-start justify-between gap-4">
        <Logo alt="Au bout du monde" className="h-14 w-auto" />
        <p className="text-sm text-accent">{fr ? "Carte cadeau" : "Gift card"}</p>
      </div>

      <div>
        <p className="font-titre text-3xl font-light leading-tight sm:text-4xl">
          {carte.intitule}
        </p>
        {massage && <p className="mt-1.5 text-accent">{massage.nom}</p>}
        <p className="mt-4 break-words text-discret">
          {fr ? "Pour" : "For"} <span className="text-texte">{carte.pour || "…"}</span>
          {fr ? ", de la part de " : ", from "}
          <span className="text-texte">{carte.de || "…"}</span>
        </p>
        {carte.message && (
          <p className="mt-3 break-words text-sm italic text-texte/85">« {carte.message} »</p>
        )}
      </div>

      <dl className="flex flex-wrap items-end gap-x-8 gap-y-3 border-t border-trait pt-5 text-sm">
        <div>
          <dt className="text-discret">{fr ? "Référence" : "Reference"}</dt>
          <dd className="tabular-nums tracking-wide">
            {carte.reference ?? (fr ? "Attribuée à la création" : "Assigned on purchase")}
          </dd>
        </div>
        <div>
          <dt className="text-discret">{fr ? "Valable jusqu’au" : "Valid until"}</dt>
          <dd>
            {carte.expireLe
              ? dateCourte(carte.expireLe)
              : carte.validiteMois === 12
                ? fr
                  ? "1 an après l’achat"
                  : "1 year after purchase"
                : fr
                  ? "6 mois après l’achat"
                  : "6 months after purchase"}
          </dd>
        </div>
        {carte.solde && (
          <div>
            <dt className="text-discret">{fr ? "Solde" : "Balance"}</dt>
            <dd>{carte.solde}</dd>
          </div>
        )}
        <div className="ml-auto">
          <dt className="sr-only">{fr ? "Valeur" : "Value"}</dt>
          <dd className="font-titre text-3xl font-light text-accent">{prix(langue, carte.prix)}</dd>
        </div>
      </dl>
    </article>
  );
}
