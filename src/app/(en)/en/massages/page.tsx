import type { Metadata } from "next";
import { ListeMassages } from "@/vues/Massages";

export const metadata: Metadata = {
  title: "Massages",
  description:
    "Eleven massages in the heart of Lyon: Hawaiian, Tuina, Balinese, Californian, Thai, Shiatsu, Swedish, Ayurvedic, barefoot, pregnancy and tailor-made.",
};

export default function Page() {
  return <ListeMassages langue="en" />;
}
