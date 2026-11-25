import Image from "next/image";
import Link from "next/link";
import {
  lignesAbonnements,
  lignesBons,
  lignesMassages,
  lignesRituels,
  lignesSoins,
  Rappel,
  TableauPrix,
  TitreDePage,
  traduireLignes,
} from "@/components/Blocs";
import { spa } from "@/lib/catalogue";
import { accesEn, faqEn, soinsEn } from "@/lib/catalogue.en";
import { chemin, type Langue } from "@/lib/langue";

// ————— Soins —————

const tSoins = {
  fr: {
    titre: "Soins du visage et du corps",
    intro:
      "Des soins sur mesure, réalisés avec des cosmétiques biologiques choisis pour leurs formules autant que pour leurs valeurs.",
    tarifs: "Tarifs des soins",
    tarifsIntro: "Chaque prix mène à la carte cadeau correspondante. Pour venir vous-même,",
    rdv: "prenez rendez-vous",
    rappel: "Un soin pour vous, ou pour quelqu’un ?",
  },
  en: {
    titre: "Face and body treatments",
    intro:
      "Tailor-made treatments, using organic skincare chosen for its formulas as much as for its values.",
    tarifs: "Treatment prices",
    tarifsIntro: "Each price leads to the matching gift card. To come yourself,",
    rdv: "book a session",
    rappel: "A treatment for you, or for someone else?",
  },
};

export function Soins({ langue }: { langue: Langue }) {
  const t = tSoins[langue];
  return (
    <>
      <TitreDePage titre={t.titre}>
        <p>{t.intro}</p>
      </TitreDePage>

      <section className="conteneur space-y-16 md:space-y-24">
        {soinsEn(langue).map((s, i) => (
          <article key={s.slug} id={s.slug} className="grid items-center gap-8 md:grid-cols-2 md:gap-16">
            <div className={`overflow-hidden rounded-lg bg-surface ${i % 2 ? "md:order-2" : ""}`}>
              <Image
                src={s.image}
                alt=""
                width={1200}
                height={675}
                sizes="(min-width: 768px) 560px, 100vw"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl md:text-5xl">{s.nom}</h2>
              <p className="mt-3 text-accent">{s.resume}</p>
              <p className="mt-4 text-discret">{s.texte}</p>
              {s.aSavoir && (
                <p className="mt-4 border-l-2 border-accent pl-4 text-sm text-discret">
                  {s.aSavoir}
                </p>
              )}
            </div>
          </article>
        ))}
      </section>

      <section id="tarifs" className="conteneur max-w-3xl py-20 md:py-28">
        <h2 className="mb-3 text-3xl md:text-4xl">{t.tarifs}</h2>
        <p className="mb-6 text-discret">
          {t.tarifsIntro}{" "}
          <Link href={chemin(langue, "/reservation")} className="lien">
            {t.rdv}
          </Link>
          .
        </p>
        <TableauPrix langue={langue} lignes={traduireLignes(lignesSoins, langue)} legende={t.tarifs} />
      </section>

      <Rappel langue={langue} titre={t.rappel} />
    </>
  );
}

// ————— Hammam —————

const tHammam = {
  fr: {
    alt: "Deux fauteuils et des bougies devant un mur de brique",
    titre: "Le hammam, pour vous seuls",
    texte: [
      "Seul, à deux ou entre amis, nos rituels se déroulent dans un espace privatif pour une à quatre personnes : votre hammam, son petit salon de détente, son espace de gommage et de massage.",
      "Idéal en toute saison, le hammam détend les muscles et nettoie la peau. C’est le prélude avant un gommage corporel aux fruits de la passion et un massage.",
    ],
    seul: "Le hammam fait partie des rituels : il ne se réserve pas seul.",
    espace: [
      ["Le hammam", "Une salle de vapeur chaude pour relâcher les tensions et purifier la peau."],
      ["Le salon de détente", "Pour prolonger le moment, à l’abri des regards."],
      ["L’espace de soins", "Gommage et massage, sans changer de lieu."],
    ],
    rituels: "Les rituels",
    rituelsIntro:
      "En solo ou en duo. La durée totale comprend le hammam, le gommage s’il est prévu, et le massage.",
    rappel: "Le hammam vous attend",
  },
  en: {
    alt: "Two chairs and candles in front of a brick wall",
    titre: "The hammam, just for you",
    texte: [
      "Alone, as a couple or with friends, our rituals take place in a private space for one to four people: your own hammam, its small lounge, and its scrub and massage area.",
      "Ideal in any season, the hammam relaxes the muscles and cleanses the skin. It is the prelude to a passion fruit body scrub and a massage.",
    ],
    seul: "The hammam is part of the rituals: it cannot be booked on its own.",
    espace: [
      ["The hammam", "A warm steam room to release tension and purify the skin."],
      ["The lounge", "To make the moment last, away from view."],
      ["The treatment area", "Scrub and massage, without changing rooms."],
    ],
    rituels: "The rituals",
    rituelsIntro:
      "Solo or duo. The total time includes the hammam, the scrub if included, and the massage.",
    rappel: "The hammam is waiting for you",
  },
};

export function Hammam({ langue }: { langue: Langue }) {
  const t = tHammam[langue];
  return (
    <>
      <div className="conteneur grid gap-10 pb-16 pt-10 md:grid-cols-[minmax(0,5fr)_6fr] md:gap-16 md:pt-16">
        <Image
          src="/images/spa/spa-4.jpg"
          alt={t.alt}
          width={1970}
          height={1310}
          priority
          sizes="(min-width: 768px) 520px, 100vw"
          className="aspect-[4/5] w-full rounded-lg object-cover"
        />
        <div>
          <h1 className="text-4xl md:text-6xl">{t.titre}</h1>
          <div className="mt-6 max-w-2xl space-y-4 text-lg">
            {t.texte.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <p className="mt-6 max-w-2xl border-l-2 border-accent pl-4 text-discret">{t.seul}</p>
          <dl className="mt-10 grid max-w-2xl gap-6 sm:grid-cols-3">
            {t.espace.map(([nom, texte]) => (
              <div key={nom}>
                <dt className="font-titre text-xl font-light">{nom}</dt>
                <dd className="mt-1 text-sm text-discret">{texte}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <section id="tarifs" className="bg-surface">
        <div className="conteneur max-w-3xl py-16 md:py-20">
          <h2 className="mb-3 text-3xl md:text-4xl">{t.rituels}</h2>
          <p className="mb-6 text-discret">{t.rituelsIntro}</p>
          <TableauPrix langue={langue} lignes={traduireLignes(lignesRituels, langue)} legende={t.rituels} />
        </div>
      </section>

      <Rappel langue={langue} titre={t.rappel} offre="offre=rituel-hgm-solo-60" />
    </>
  );
}

// ————— Tarifs —————

const tTarifs = {
  fr: {
    titre: "Tarifs",
    intro: "Tous les prix sont en euros. Cliquez sur un prix pour l’offrir en carte cadeau.",
    nav: "Dans cette page",
    sections: ["Massages", "Abonnements", "Rituels hammam", "Soins", "Bons d’achat"],
    regles: [
      "Les cartes cadeaux (massages, soins, rituels et bons d’achat) sont valables 6 mois.",
      "Elles s’utilisent sur rendez-vous, du lundi au samedi, hors jours fériés.",
      "Les abonnements sont valables 1 an, du lundi au vendredi, hors jours fériés.",
      "Toute annulation ou modification doit nous parvenir au moins 24 h avant le rendez-vous.",
    ],
  },
  en: {
    titre: "Prices",
    intro: "All prices are in euros. Click a price to give it as a gift card.",
    nav: "On this page",
    sections: ["Massages", "Passes", "Hammam rituals", "Treatments", "Vouchers"],
    regles: [
      "Gift cards (massages, treatments, rituals and vouchers) are valid for 6 months.",
      "They are used by appointment, Monday to Saturday, except public holidays.",
      "Passes are valid for 1 year, Monday to Friday, except public holidays.",
      "Any cancellation or change must reach us at least 24 hours before the appointment.",
    ],
  },
};

export function Tarifs({ langue }: { langue: Langue }) {
  const t = tTarifs[langue];
  const sections = [
    { id: "massages", lignes: lignesMassages },
    { id: "abonnements", lignes: lignesAbonnements },
    { id: "rituels", lignes: lignesRituels },
    { id: "soins", lignes: lignesSoins },
    { id: "bons", lignes: lignesBons },
  ].map((s, i) => ({ ...s, titre: t.sections[i], lignes: traduireLignes(s.lignes, langue) }));

  return (
    <>
      <TitreDePage titre={t.titre}>
        <p>{t.intro}</p>
      </TitreDePage>

      <div className="conteneur grid gap-12 pb-16 md:pb-24 lg:grid-cols-[12rem_1fr] lg:gap-16">
        <nav aria-label={t.nav} className="lg:sticky lg:top-32 lg:self-start">
          <ul className="flex flex-wrap gap-x-5 gap-y-2 lg:flex-col">
            {sections.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="lien">
                  {s.titre}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="max-w-3xl space-y-14">
          {sections.map((s) => (
            <section key={s.id} id={s.id}>
              <h2 className="mb-4 text-3xl">{s.titre}</h2>
              <TableauPrix langue={langue} lignes={s.lignes} legende={s.titre} />
            </section>
          ))}
          <ul className="list-disc space-y-2 border-t border-trait pl-5 pt-8 text-discret">
            {t.regles.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </div>
      </div>

      <Rappel langue={langue} />
    </>
  );
}

// ————— Le spa —————

const tSpa = {
  fr: {
    titre: "Un spa indépendant, depuis 2012",
    intro:
      "Créé par Aurélie, Lionel et Mikaël, Au bout du monde est né d’une envie simple : un lieu urbain, indépendant et non genré, entièrement dédié à la détente.",
    alts: [
      "Une praticienne ouvre le rideau d’une salle de soin",
      "Serviettes pliées devant une lampe et un mur de pierre",
      "L’accueil du spa",
      "Le salon où l’infusion est servie après le soin",
      "Un fauteuil club en cuir et un livre",
    ],
    citation: "« Prenez soin de votre corps, c’est le seul endroit où vous êtes obligé de vivre. »",
    texte: [
      "Au fil des années, l’équipe s’est construite autour de personnes qui partagent la même vision. Les trois praticiens sont aujourd’hui entourés d’une équipe stable, complétée par des indépendants qui les accompagnent depuis longtemps.",
      "La priorité n’a jamais changé : prendre soin de vous et faire de chaque visite une parenthèse agréable, dans un environnement sain, respectueux et bienveillant.",
      "Rester indépendants, c’est aussi rester accessibles. Depuis 2014, les tarifs n’ont évolué qu’à deux reprises. Et depuis le début, nous privilégions des cosmétiques bio et engagés.",
    ],
    citation2:
      "« Depuis 2012, l’équipe a grandi, les années ont passé, mais notre attitude est restée la même : vous accueillir avec simplicité, respect et bienveillance. »",
    joindre: "Nous joindre",
    ou: "ou",
    sms: "Nous ne répondons pas aux SMS.",
    plan: "Ouvrir le plan",
    horaires: "Horaires",
    surRdv: "Ouverture sur rendez-vous.",
    acces: "Accès",
    questions: "Vos questions",
  },
  en: {
    titre: "An independent spa, since 2012",
    intro:
      "Founded by Aurélie, Lionel and Mikaël, Au bout du monde grew from a simple wish: an urban, independent, gender-neutral place dedicated entirely to relaxation.",
    alts: [
      "A practitioner opens the curtain of a treatment room",
      "Folded towels in front of a lamp and a stone wall",
      "The spa reception",
      "The lounge where herbal tea is served after treatments",
      "A leather club chair and a book",
    ],
    citation: "“Take care of your body. It’s the only place you have to live.”",
    texte: [
      "Over the years, the team has grown around people who share the same vision. The three practitioners now work with a stable team, joined by freelancers who have been with them for a long time.",
      "The priority has never changed: to take care of you and make every visit a pleasant pause, in a healthy, respectful and caring setting.",
      "Staying independent also means staying affordable. Since 2014, prices have only changed twice. And from the start, we have chosen organic, committed skincare.",
    ],
    citation2:
      "“Since 2012, the team has grown and the years have passed, but our attitude has stayed the same: to welcome you simply, with respect and kindness.”",
    joindre: "Contact us",
    ou: "or",
    sms: "We do not reply to text messages.",
    plan: "Open the map",
    horaires: "Opening hours",
    surRdv: "Open by appointment.",
    acces: "Getting here",
    questions: "Your questions",
  },
};

export function LeSpa({ langue }: { langue: Langue }) {
  const t = tSpa[langue];
  const photos = [
    { src: "/images/spa/equipe.jpg", w: 1080, h: 1080, classe: "rounded-lg" },
    { src: "/images/spa/spa-5.jpg", w: 1346, h: 924, classe: "h-full rounded-lg object-cover" },
    { src: "/images/spa/accueil.jpg", w: 1500, h: 998, classe: "col-span-2 rounded-lg" },
    { src: "/images/spa/spa-2.jpg", w: 1046, h: 693, classe: "h-full rounded-lg object-cover" },
    { src: "/images/spa/spa-3.jpg", w: 1354, h: 904, classe: "h-full rounded-lg object-cover" },
  ];
  return (
    <>
      <TitreDePage titre={t.titre}>
        <p>{t.intro}</p>
      </TitreDePage>

      <section className="conteneur grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div className="grid grid-cols-2 gap-3 self-start">
          {photos.map((p, i) => (
            <Image
              key={p.src}
              src={p.src}
              alt={t.alts[i]}
              width={p.w}
              height={p.h}
              sizes={i === 2 ? "(min-width: 1024px) 530px, 100vw" : "(min-width: 1024px) 260px, 50vw"}
              className={p.classe}
            />
          ))}
        </div>

        <div className="max-w-xl space-y-5 text-lg">
          <blockquote className="font-titre text-2xl font-light text-accent md:text-3xl">
            {t.citation}
          </blockquote>
          {t.texte.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <blockquote className="border-l-2 border-accent pl-4 text-discret">{t.citation2}</blockquote>
        </div>
      </section>

      <section id="acces" className="conteneur py-16 md:py-24">
        <div className="grid gap-10 rounded-2xl border border-trait bg-surface p-8 md:grid-cols-3 md:p-12">
          <div>
            <h2 className="text-3xl">{t.joindre}</h2>
            <address className="mt-4 space-y-1 not-italic">
              <p>
                {spa.adresse}, {spa.ville}
              </p>
              <p>
                <a href={`tel:${spa.telephoneLien}`} className="lien">
                  {spa.telephone}
                </a>{" "}
                {t.ou} {spa.mobile}
              </p>
              <p className="text-sm text-discret">{t.sms}</p>
              <p>
                <a href={`mailto:${spa.email}`} className="lien">
                  {spa.email}
                </a>
              </p>
            </address>
            <a href={spa.plan} className="btn btn-contour btn-petit mt-5">
              {t.plan}
            </a>
          </div>
          <div>
            <h2 className="text-3xl">{t.horaires}</h2>
            <dl className="mt-4 space-y-2">
              {spa.horaires.map((h) => (
                <div key={h.jours}>
                  <dt className="font-medium">{langue === "fr" ? h.jours : h.days}</dt>
                  <dd className="text-discret">{langue === "fr" ? h.heures : h.hours}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-3 text-sm text-discret">{t.surRdv}</p>
          </div>
          <div>
            <h2 className="text-3xl">{t.acces}</h2>
            <dl className="mt-4 space-y-2">
              {accesEn(langue).map((a) => (
                <div key={a.mode} className="flex gap-3">
                  <dt className="w-20 shrink-0 font-medium">{a.mode}</dt>
                  <dd className="text-discret">{a.detail}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section id="questions" className="conteneur max-w-3xl pb-16 md:pb-24">
        <h2 className="text-3xl md:text-5xl">{t.questions}</h2>
        <div className="mt-8 border-t border-trait">
          {faqEn(langue).map((q) => (
            <details key={q.question} className="group border-b border-trait">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-titre text-xl font-light [&::-webkit-details-marker]:hidden">
                {q.question}
                <span
                  aria-hidden
                  className="text-2xl text-accent transition-transform duration-300 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <div className="space-y-3 pb-6 text-discret">
                {q.reponse.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </details>
          ))}
        </div>
      </section>

      <Rappel langue={langue} />
    </>
  );
}
