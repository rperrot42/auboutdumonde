import type { Metadata } from "next";
import { LeSpa } from "@/vues/Contenus";

export const metadata: Metadata = {
  title: "Le spa, l’équipe et l’accès",
  description:
    "Au bout du monde, spa indépendant créé en 2012 à Lyon 1er : l’équipe, le lieu, les horaires, l’accès et les réponses à vos questions.",
};

export default function Page() {
  return <LeSpa langue="fr" />;
}
