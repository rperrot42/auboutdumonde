import Image from "next/image";
import Link from "next/link";
import { Lueur } from "@/components/Accueil";
import { Billet } from "@/components/Billet";
import { ListeMassages } from "@/components/ListeMassages";
import { prixMini } from "@/components/Blocs";
import { spa } from "@/lib/catalogue";
import { massagesEn } from "@/lib/catalogue.en";
import { chemin, prix, type Langue } from "@/lib/langue";

const textes = {
  fr: {
    titre: "Une heure pour relâcher tout ce que vous portez.",
    intro: (p: string) => `Massages, soins et hammam privatif à Lyon 1er. À partir de ${p}.`,
    rdv: "Prendre rendez-vous",
    offrir: "Offrir une carte",
    altHero:
      "Deux mains posées sur le visage d’une personne allongée, les yeux fermés, à la lueur des bougies",
    massages: "Onze massages.",
    tarif: (a: string, b: string, c: string) =>
      `Un seul tarif, en solo ou en duo : 30 min ${a}, 60 min ${b}, 90 min ${c}.`,
    hesite: "Vous hésitez ?",
    hesiteTexte:
      "Réservez une durée. Vous choisirez le massage sur place, avec la personne qui s’occupe de vous.",
    autres: "Soins et hammam",
    soins: ["Soins", "Visage et corps, en cosmétiques bio.", "Un soin du visage à la lueur des bougies"],
    hammam: [
      "Hammam privatif",
      "La vapeur pour vous seuls, puis gommage et massage.",
      "Deux fauteuils et des bougies devant un mur de brique",
    ],
    aPartir: (p: string) => `À partir de ${p}`,
    carteTitre: "Offrir du calme.",
    carteTexte:
      "Vous choisissez le soin et écrivez votre mot. La carte arrive tout de suite. La personne prend rendez-vous quand elle veut, pendant six mois.",
    bons: "Bons d’achat dès 50 €",
    lieu: "Quai de la Pêcherie, à cinq minutes des Terreaux.",
    altLieu: "L’accueil du spa : murs de pierre, lampe allumée et fauteuils",
    adresse: "Adresse",
    surRdv: "Sur rendez-vous",
    telephone: "Téléphone",
    decouvrir: "Découvrir le lieu",
  },
  en: {
    titre: "One hour to let go of everything you carry.",
    intro: (p: string) => `Massage, treatments and a private hammam in the heart of Lyon. From ${p}.`,
    rdv: "Book a session",
    offrir: "Give a gift card",
    altHero: "Two hands resting on the face of a person lying down, eyes closed, by candlelight",
    massages: "Eleven massages.",
    tarif: (a: string, b: string, c: string) =>
      `One price for all, solo or duo: 30 min ${a}, 60 min ${b}, 90 min ${c}.`,
    hesite: "Not sure which one?",
    hesiteTexte:
      "Book a duration. You will choose the massage on the day, with the person looking after you.",
    autres: "Treatments and hammam",
    soins: ["Treatments", "Face and body, with organic skincare.", "A facial by candlelight"],
    hammam: [
      "Private hammam",
      "The steam room to yourselves, then a scrub and a massage.",
      "Two chairs and candles in front of a brick wall",
    ],
    aPartir: (p: string) => `From ${p}`,
    carteTitre: "Give the gift of calm.",
    carteTexte:
      "You choose the treatment and write your note. The card arrives straight away. They book whenever they like, within six months.",
    bons: "Vouchers from €50",
    lieu: "Quai de la Pêcherie, five minutes from Place des Terreaux.",
    altLieu: "The spa reception: stone walls, a lit lamp and armchairs",
    adresse: "Address",
    surRdv: "By appointment",
    telephone: "Phone",
    decouvrir: "Discover the place",
  },
};

export function Accueil({ langue }: { langue: Langue }) {
  const t = textes[langue];
  const p = (n: number) => prix(langue, n);
  const autres = [
    { href: "/soins", mots: t.soins, prix: prixMini("soin"), image: "/images/soins/kobido.webp" },
    { href: "/hammam", mots: t.hammam, prix: prixMini("rituel"), image: "/images/spa/spa-4.jpg" },
  ];

  return (
    <>
      <Lueur />

      <section className="theme-sombre relative isolate flex min-h-[calc(100svh-6rem)] items-end overflow-hidden">
        <Image
          src="/images/soins/kobido-large.webp"
          alt={t.altHero}
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover object-[60%_35%]"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-gradient-to-t from-fond via-fond/50 to-transparent"
        />
        <div className="conteneur entree pb-14 pt-48 md:pb-20">
          <h1 className="max-w-4xl text-5xl md:text-7xl lg:text-[5.5rem]">{t.titre}</h1>
          <div className="mt-8 flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
            <p className="max-w-lg text-lg text-texte/85">{t.intro(p(prixMini("massage")))}</p>
            <div className="flex flex-wrap gap-3">
              <Link href={chemin(langue, "/reservation")} className="btn btn-accent">
                {t.rdv}
              </Link>
              <Link href={chemin(langue, "/carte-cadeau")} className="btn btn-contour">
                {t.offrir}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="conteneur py-24 md:py-36">
        <div className="apparait flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <h2 className="text-4xl md:text-6xl">{t.massages}</h2>
          <p className="max-w-md text-discret">{t.tarif(p(60), p(90), p(115))}</p>
        </div>

        <div className="mt-14">
          <ListeMassages massages={massagesEn(langue)} langue={langue} />
        </div>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-md text-discret">
            <span className="text-texte">{t.hesite}</span> {t.hesiteTexte}
          </p>
          <Link href={chemin(langue, "/reservation")} className="btn btn-accent shrink-0">
            {t.rdv}
          </Link>
        </div>
      </section>

      <section aria-label={t.autres} className="theme-sombre grid md:grid-cols-2">
        {autres.map((u) => (
          <Link
            key={u.href}
            href={u.href}
            className="apparait group relative isolate flex min-h-[70svh] items-end overflow-hidden"
          >
            <Image
              src={u.image}
              alt={u.mots[2]}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="-z-20 object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-105"
            />
            <div
              aria-hidden
              className="absolute inset-0 -z-10 bg-gradient-to-t from-fond via-fond/30 to-transparent"
            />
            <div className="p-8 md:p-12">
              <h2 className="text-4xl md:text-6xl">{u.mots[0]}</h2>
              <p className="mt-3 text-texte/85">{u.mots[1]}</p>
              <p className="mt-3 text-accent">{t.aPartir(p(u.prix))}</p>
            </div>
          </Link>
        ))}
      </section>

      <section className="conteneur grid items-center gap-14 py-24 md:py-36 lg:grid-cols-2">
        <div className="apparait relative mx-auto w-full max-w-lg">
          <div aria-hidden className="respire absolute -inset-10 rounded-full bg-accent/15 blur-3xl" />
          <Billet
            langue={langue}
            carte={{
              offreId: "massage-solo-60",
              intitule: "Massage 60 min",
              pour: "Camille",
              de: "Inès",
              message: "",
              prix: 90,
            }}
          />
        </div>
        <div>
          <h2 className="apparait text-4xl md:text-6xl">{t.carteTitre}</h2>
          <p className="mt-5 max-w-md text-lg text-discret">{t.carteTexte}</p>
          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link href={chemin(langue, "/carte-cadeau")} className="btn btn-accent">
              {t.offrir}
            </Link>
            <Link href={chemin(langue, "/carte-cadeau?offre=bon-50")} className="lien">
              {t.bons}
            </Link>
          </div>
        </div>
      </section>

      <section className="theme-sombre relative isolate overflow-hidden">
        <Image
          src="/images/spa/accueil.jpg"
          alt={t.altLieu}
          fill
          sizes="100vw"
          className="-z-20 object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-gradient-to-t from-fond via-fond/65 to-fond/25"
        />
        <div className="conteneur flex min-h-[85svh] flex-col justify-end py-16 md:py-24">
          <h2 className="apparait max-w-3xl text-4xl md:text-6xl">{t.lieu}</h2>
          <dl className="mt-10 grid gap-8 sm:grid-cols-3">
            <div>
              <dt className="text-accent">{t.adresse}</dt>
              <dd className="mt-1">
                {spa.adresse}
                <br />
                {spa.ville}
              </dd>
            </div>
            <div>
              <dt className="text-accent">{t.surRdv}</dt>
              {spa.horaires.map((h) => (
                <dd key={h.jours} className="mt-1">
                  {langue === "fr" ? `${h.jours}, ${h.heures}` : `${h.days}, ${h.hours}`}
                </dd>
              ))}
            </div>
            <div>
              <dt className="text-accent">{t.telephone}</dt>
              <dd className="mt-1">
                <a href={`tel:${spa.telephoneLien}`} className="lien">
                  {spa.telephone}
                </a>
              </dd>
            </div>
          </dl>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href={chemin(langue, "/reservation")} className="btn btn-accent">
              {t.rdv}
            </Link>
            <Link href={chemin(langue, "/le-spa")} className="btn btn-contour">
              {t.decouvrir}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
