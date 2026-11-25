import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  lignesAbonnements,
  lignesMassages,
  Rappel,
  TableauPrix,
  TitreDePage,
  traduireLignes,
} from "@/components/Blocs";
import { ListeMassages as Liste } from "@/components/ListeMassages";
import { massageEn, massagesEn } from "@/lib/catalogue.en";
import { chemin, type Langue } from "@/lib/langue";

const textes = {
  fr: {
    titre: "Onze massages",
    intro:
      "Tous au même tarif, en solo ou en duo dans la même salle. Vous pouvez choisir le vôtre maintenant ou le jour du rendez-vous.",
    unTarif: "Un seul tarif pour tous les massages",
    durees:
      "30 minutes pour une ou deux zones, 60 minutes pour tout le corps, 90 minutes pour prendre le temps de s’attarder.",
    abonnements: "Les abonnements",
    abonnementsTexte:
      "Des heures de massage à dépenser à votre rythme pendant un an, du lundi au vendredi.",
    rappel: "Choisissez la durée, nous faisons le reste",
    legendeMassages: "Tarifs des massages",
    legendeAbonnements: "Tarifs des abonnements",
    reserver: "Réserver ce massage",
    offrir: "L’offrir en carte cadeau",
    tarifs: "Tarifs",
    suivant: "Massage suivant",
    envie: "Envie de ce massage ?",
    guillemets: ["« ", " »"],
  },
  en: {
    titre: "Eleven massages",
    intro:
      "All at the same price, solo or as a duo in the same room. Choose yours now or on the day.",
    unTarif: "One price for every massage",
    durees:
      "30 minutes for one or two areas, 60 minutes for the whole body, 90 minutes to take the time to linger.",
    abonnements: "Passes",
    abonnementsTexte:
      "Hours of massage to use at your own pace over one year, Monday to Friday.",
    rappel: "Choose the duration, we take care of the rest",
    legendeMassages: "Massage prices",
    legendeAbonnements: "Pass prices",
    reserver: "Book this massage",
    offrir: "Give it as a gift card",
    tarifs: "Prices",
    suivant: "Next massage",
    envie: "Feel like this massage?",
    guillemets: ["“", "”"],
  },
};

export function ListeMassages({ langue }: { langue: Langue }) {
  const t = textes[langue];
  const abonnements = traduireLignes(lignesAbonnements, langue);
  return (
    <>
      <TitreDePage titre={t.titre}>
        <p>{t.intro}</p>
      </TitreDePage>

      <section className="conteneur">
        <Liste massages={massagesEn(langue)} langue={langue} />
      </section>

      <section id="tarifs" className="conteneur grid gap-12 py-16 md:py-24 lg:grid-cols-2 lg:gap-16">
        <div>
          <h2 className="text-3xl md:text-4xl">{t.unTarif}</h2>
          <p className="mb-6 mt-3 text-discret">{t.durees}</p>
          <TableauPrix langue={langue} lignes={traduireLignes(lignesMassages, langue)} legende={t.legendeMassages} />
        </div>
        <div>
          <h2 className="text-3xl md:text-4xl">{t.abonnements}</h2>
          <p className="mb-6 mt-3 text-discret">{t.abonnementsTexte}</p>
          <TableauPrix langue={langue} lignes={abonnements} legende={t.legendeAbonnements} />
        </div>
      </section>

      <Rappel langue={langue} titre={t.rappel} />
    </>
  );
}

export function FicheMassage({ langue, slug }: { langue: Langue; slug: string }) {
  const t = textes[langue];
  const massage = massageEn(slug, langue);
  if (!massage) notFound();
  const tous = massagesEn(langue);
  const suivant = tous[(tous.findIndex((m) => m.slug === slug) + 1) % tous.length];

  return (
    <>
      <div className="conteneur grid gap-10 pb-16 pt-10 md:grid-cols-[minmax(0,5fr)_6fr] md:gap-16 md:pb-24 md:pt-16">
        <Image
          src={`/images/massages/${massage.slug}.webp`}
          alt=""
          width={1200}
          height={675}
          priority
          sizes="(min-width: 768px) 520px, 100vw"
          className="aspect-[4/5] w-full rounded-lg object-cover md:sticky md:top-32 md:self-start"
        />

        <div>
          <p>
            <Link href={chemin(langue, "/massages")} className="lien">
              Massages
            </Link>
          </p>
          <h1 className="mt-3 text-4xl md:text-6xl">{massage.nom}</h1>
          {massage.citation && (
            <p className="mt-4 font-titre text-2xl text-accent">
              {t.guillemets[0]}
              {massage.citation}
              {t.guillemets[1]}
            </p>
          )}
          <ul className="mt-6 flex flex-wrap gap-2">
            {massage.bienfaits.map((b) => (
              <li
                key={b}
                className="rounded-full border border-accent/50 px-4 py-1.5 text-sm text-accent"
              >
                {b}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-discret">{massage.pression}</p>

          <div className="mt-7 max-w-2xl space-y-4 text-lg">
            {massage.texte.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          {massage.aSavoir && (
            <p className="mt-6 max-w-2xl border-l-2 border-accent pl-4 text-discret">
              {massage.aSavoir}
            </p>
          )}

          <div className="mt-9 flex flex-wrap gap-3">
            <Link href={chemin(langue, `/reservation?destination=${massage.slug}`)} className="btn btn-accent">
              {t.reserver}
            </Link>
            <Link href={chemin(langue, `/carte-cadeau?destination=${massage.slug}`)} className="btn btn-contour">
              {t.offrir}
            </Link>
          </div>

          <div className="mt-12 max-w-xl">
            <h2 className="mb-4 text-2xl">{t.tarifs}</h2>
            <TableauPrix
              langue={langue}
              lignes={traduireLignes(lignesMassages, langue)}
              legende={`${t.tarifs} : ${massage.nom}`}
            />
          </div>

          <Link
            href={chemin(langue, `/massages/${suivant.slug}`)}
            className="mt-12 flex max-w-xl items-center gap-5 rounded-xl border border-trait p-4 transition-colors duration-300 hover:border-accent"
          >
            <Image
              src={`/images/massages/${suivant.slug}.webp`}
              alt=""
              width={1200}
              height={675}
              sizes="128px"
              className="w-32 rounded-lg"
            />
            <span>
              <span className="block text-sm text-discret">{t.suivant}</span>
              <span className="font-titre text-xl">{suivant.nom}</span>
            </span>
          </Link>
        </div>
      </div>
      <Rappel langue={langue} titre={t.envie} offre={`destination=${massage.slug}`} />
    </>
  );
}
