"use client";

import { useSyncExternalStore } from "react";

type Theme = "sombre" | "clair";
const abonnes = new Set<() => void>();

function abonner(f: () => void) {
  abonnes.add(f);
  return () => abonnes.delete(f);
}
const lire = (): Theme =>
  document.documentElement.dataset.theme === "clair" ? "clair" : "sombre";

/** Script exécuté avant l'affichage : applique le thème choisi, sinon celui du système. */
export const scriptTheme = `try{var t=localStorage.getItem("abdm.theme");if(t!=="clair"&&t!=="sombre")t=matchMedia("(prefers-color-scheme: light)").matches?"clair":"sombre";document.documentElement.dataset.theme=t}catch(e){}`;

export function BoutonTheme({
  className = "",
  langue = "fr",
}: {
  className?: string;
  langue?: "fr" | "en";
}) {
  const theme = useSyncExternalStore(abonner, lire, () => "sombre" as Theme);
  const suivant: Theme = theme === "sombre" ? "clair" : "sombre";
  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        document.documentElement.dataset.theme = suivant;
        try {
          localStorage.setItem("abdm.theme", suivant);
        } catch {}
        abonnes.forEach((f) => f());
      }}
    >
      {langue === "fr"
        ? `Thème ${suivant}`
        : suivant === "clair"
          ? "Light theme"
          : "Dark theme"}
    </button>
  );
}
