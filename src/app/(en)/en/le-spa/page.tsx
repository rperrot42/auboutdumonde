import type { Metadata } from "next";
import { LeSpa } from "@/vues/Contenus";

export const metadata: Metadata = {
  title: "The spa, the team and getting here",
  description:
    "Au bout du monde, an independent spa founded in 2012 in Lyon: the team, the place, opening hours, directions and answers to your questions.",
};

export default function Page() {
  return <LeSpa langue="en" />;
}
