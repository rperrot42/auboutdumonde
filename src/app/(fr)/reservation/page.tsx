import type { Metadata } from "next";
import { Suspense } from "react";
import { TitreDePage } from "@/components/Blocs";
import { Reserver } from "@/vues/Reserver";

export const metadata: Metadata = {
  title: "Prendre rendez-vous",
  description:
    "Demandez un rendez-vous au spa Au bout du monde à Lyon 1er : choisissez votre prestation et votre créneau, nous confirmons sous 24 h.",
};

export default function Page() {
  return (
    <>
      <TitreDePage titre="Prendre rendez-vous">
        <p>
          Choisissez la prestation et un créneau. Nous confirmons votre rendez-vous sous 24 h, par e-mail ou par téléphone.
        </p>
      </TitreDePage>
      <Suspense fallback={<p className="conteneur pb-24 text-discret">Chargement…</p>}>
        <Reserver langue="fr" />
      </Suspense>
    </>
  );
}
