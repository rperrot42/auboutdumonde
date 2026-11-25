import type { Metadata } from "next";
import { Suspense } from "react";
import { massages } from "@/lib/catalogue";
import { massageEn } from "@/lib/catalogue.en";
import { FicheMassage } from "@/vues/Massages";

type Props = PageProps<"/en/massages/[slug]">;

export function generateStaticParams() {
  return massages.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const massage = massageEn((await params).slug, "en");
  return massage ? { title: massage.nom, description: massage.accroche } : {};
}

export default function Page({ params }: Props) {
  return (
    <Suspense fallback={<p className="conteneur min-h-[60vh] py-16 text-discret">Loading…</p>}>
      <Contenu params={params} />
    </Suspense>
  );
}

async function Contenu({ params }: Pick<Props, "params">) {
  return <FicheMassage langue="en" slug={(await params).slug} />;
}
