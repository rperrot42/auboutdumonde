import type { Metadata } from "next";
import { Suspense } from "react";
import { TitreDePage } from "@/components/Blocs";
import { Composer } from "@/vues/Composer";

export const metadata: Metadata = {
  title: "Offrir une carte cadeau",
  description:
    "Offrez un massage, un soin, un rituel hammam ou un bon d’achat au spa Au bout du monde à Lyon. Carte cadeau reçue immédiatement, valable 6 mois.",
};

export default function Page() {
  return (
    <>
      <TitreDePage titre="Offrir une carte cadeau">
        <p>
          Vous choisissez le soin, la personne choisit la date. La carte arrive tout de suite, prête à imprimer ou à envoyer.
        </p>
      </TitreDePage>
      <Suspense fallback={<p className="conteneur pb-24 text-discret">Chargement…</p>}>
        <Composer langue="fr" />
      </Suspense>
    </>
  );
}
