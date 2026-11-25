import type { Metadata } from "next";
import { Coquille } from "@/components/Coquille";

export const metadata: Metadata = {
  title: {
    default: "Au bout du monde — massages, soins et hammam à Lyon 1er",
    template: "%s — Au bout du monde, Lyon",
  },
  description:
    "Spa indépendant à Lyon 1er depuis 2012 : onze massages du monde, soins bio du visage et du corps, hammam privatif. En solo ou en duo, sur rendez-vous ou en carte cadeau.",
  alternates: { languages: { en: "/en" } },
};

export default function LayoutFr({ children }: { children: React.ReactNode }) {
  return <Coquille langue="fr">{children}</Coquille>;
}
