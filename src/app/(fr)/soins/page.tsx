import type { Metadata } from "next";
import { Soins } from "@/vues/Contenus";

export const metadata: Metadata = {
  title: "Soins du visage et du corps",
  description:
    "Soin du visage Absolution, kobido, soin corps détox et gommages : des soins bio sur mesure à Lyon 1er.",
};

export default function Page() {
  return <Soins langue="fr" />;
}
