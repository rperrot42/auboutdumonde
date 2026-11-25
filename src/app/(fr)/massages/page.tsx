import type { Metadata } from "next";
import { ListeMassages } from "@/vues/Massages";

export const metadata: Metadata = {
  title: "Massages du monde",
  description:
    "Onze massages du monde à Lyon 1er : hawaïen, tuina, balinais, californien, thaïlandais, shiatsu, suédois, ayurvédique, barefoot, femme enceinte et sur mesure.",
};

export default function Page() {
  return <ListeMassages langue="fr" />;
}
