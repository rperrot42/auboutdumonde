import type { Metadata } from "next";
import { Suspense } from "react";
import { TitreDePage } from "@/components/Blocs";
import { Reserver } from "@/vues/Reserver";

export const metadata: Metadata = {
  title: "Book a session",
  description:
    "Request an appointment at Au bout du monde spa in Lyon: choose your treatment and time, and we confirm within 24 hours.",
};

export default function Page() {
  return (
    <>
      <TitreDePage titre="Book a session">
        <p>
          Choose a treatment and a time. We confirm your appointment within 24 hours, by email or phone.
        </p>
      </TitreDePage>
      <Suspense fallback={<p className="conteneur pb-24 text-discret">Loading…</p>}>
        <Reserver langue="en" />
      </Suspense>
    </>
  );
}
