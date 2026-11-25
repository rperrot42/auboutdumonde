import type { Metadata } from "next";
import { Hammam } from "@/vues/Contenus";

export const metadata: Metadata = {
  title: "Private hammam",
  description:
    "Hammam, scrub and massage rituals in a private space for 1 to 4 people, in Lyon.",
};

export default function Page() {
  return <Hammam langue="en" />;
}
