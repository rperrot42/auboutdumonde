import type { Metadata } from "next";
import { Tarifs } from "@/vues/Contenus";

export const metadata: Metadata = {
  title: "Tarifs",
  description:
    "Tous les tarifs du spa Au bout du monde à Lyon : massages solo et duo, rituels hammam, soins, abonnements et bons d’achat.",
};

export default function Page() {
  return <Tarifs langue="fr" />;
}
