import type { Metadata } from "next";
import { Suspense } from "react";
import { MaCarte } from "@/vues/MaCarte";

export const metadata: Metadata = {
  title: "Ma carte cadeau",
  robots: { index: false },
};

export default function Page() {
  return (
    <div className="conteneur max-w-4xl pb-20 pt-12 md:pt-16">
      <Suspense fallback={<p className="text-discret">Chargement…</p>}>
        <MaCarte langue="fr" />
      </Suspense>
    </div>
  );
}
