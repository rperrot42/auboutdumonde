import type { Metadata } from "next";
import { Suspense } from "react";
import { TitreDePage } from "@/components/Blocs";
import { Composer } from "@/vues/Composer";

export const metadata: Metadata = {
  title: "Give a gift card",
  description:
    "Give a massage, a treatment, a hammam ritual or a voucher at Au bout du monde spa in Lyon. The gift card arrives straight away and is valid for 6 months.",
};

export default function Page() {
  return (
    <>
      <TitreDePage titre="Give a gift card">
        <p>
          You choose the treatment, they choose the date. The card arrives straight away, ready to print or send.
        </p>
      </TitreDePage>
      <Suspense fallback={<p className="conteneur pb-24 text-discret">Loading…</p>}>
        <Composer langue="en" />
      </Suspense>
    </>
  );
}
