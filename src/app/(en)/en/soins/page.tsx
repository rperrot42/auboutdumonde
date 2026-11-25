import type { Metadata } from "next";
import { Soins } from "@/vues/Contenus";

export const metadata: Metadata = {
  title: "Face and body treatments",
  description:
    "Absolution facial, kobido, detox body treatment and scrubs: tailor-made organic treatments in Lyon.",
};

export default function Page() {
  return <Soins langue="en" />;
}
