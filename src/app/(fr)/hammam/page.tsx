import type { Metadata } from "next";
import { Hammam } from "@/vues/Contenus";

export const metadata: Metadata = {
  title: "Hammam privatif",
  description:
    "Rituels hammam, gommage et massage dans un espace privatif pour 1 à 4 personnes, à Lyon 1er.",
};

export default function Page() {
  return <Hammam langue="fr" />;
}
