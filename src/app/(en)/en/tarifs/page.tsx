import type { Metadata } from "next";
import { Tarifs } from "@/vues/Contenus";

export const metadata: Metadata = {
  title: "Prices",
  description:
    "All prices at Au bout du monde spa in Lyon: solo and duo massages, hammam rituals, treatments, passes and vouchers.",
};

export default function Page() {
  return <Tarifs langue="en" />;
}
