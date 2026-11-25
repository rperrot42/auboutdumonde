import type { Metadata } from "next";
import { Gestion } from "./Gestion";

export const metadata: Metadata = {
  title: "Espace de gestion",
  robots: { index: false },
};

export default function PageGestion() {
  return (
    <div className="conteneur pb-20 pt-10 md:pt-14">
      <h1 className="text-4xl md:text-5xl">Espace de gestion</h1>
      <p className="mt-3 max-w-2xl text-discret">
        Les rendez-vous demandés et les cartes cadeaux vendues. Sans backend, ces données
        vivent dans ce navigateur : cette page n’est pas encore protégée par un mot de
        passe.
      </p>
      <Gestion />
    </div>
  );
}
