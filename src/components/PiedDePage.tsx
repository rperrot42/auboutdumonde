import { Logo } from "@/components/Logo";
import Link from "next/link";
import { spa } from "@/lib/catalogue";
import { chemin, type Langue } from "@/lib/langue";

export function PiedDePage({ langue }: { langue: Langue }) {
  const fr = langue === "fr";
  return (
    <footer className="border-t border-trait bg-fond text-texte print:hidden">
      <div className="conteneur grid gap-10 py-14 md:grid-cols-[1.2fr_1fr_1fr_1fr]">
        <div>
          <Logo alt="Au bout du monde" className="h-24 w-auto" />
          <p className="mt-4 max-w-xs text-sm text-discret">
            {fr
              ? "Spa indépendant sur les quais de Saône, à Lyon 1er, depuis 2012."
              : "An independent spa on the banks of the Saône, in Lyon, since 2012."}
          </p>
        </div>

        <div>
          <h2 className="text-lg">{fr ? "Venir" : "Find us"}</h2>
          <address className="mt-3 text-sm not-italic leading-7">
            {spa.adresse}
            <br />
            {spa.ville}
            <br />
            <a href={`tel:${spa.telephoneLien}`} className="underline underline-offset-4">
              {spa.telephone}
            </a>
          </address>
          <a href={spa.plan} className="mt-2 inline-block text-sm underline underline-offset-4">
            {fr ? "Voir sur le plan" : "View on the map"}
          </a>
        </div>

        <div>
          <h2 className="text-lg">{fr ? "Horaires" : "Opening hours"}</h2>
          <dl className="mt-3 text-sm leading-7">
            {spa.horaires.map((h) => (
              <div key={h.jours}>
                <dt className="inline">{fr ? `${h.jours} : ` : `${h.days}: `}</dt>
                <dd className="inline">{fr ? h.heures : h.hours}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-1 text-sm text-discret">{fr ? "Sur rendez-vous." : "By appointment."}</p>
        </div>

        <nav aria-label={fr ? "Pied de page" : "Footer"}>
          <h2 className="text-lg">{fr ? "Le site" : "The site"}</h2>
          <ul className="mt-3 space-y-1.5 text-sm">
            {[
              ["/reservation", "Prendre rendez-vous", "Book a session"],
              ["/carte-cadeau", "Offrir une carte cadeau", "Give a gift card"],
              ["/carte-cadeau/billet", "Consulter ma carte", "Check my gift card"],
              ["/tarifs", "Tarifs", "Prices"],
              ["/le-spa#questions", "Questions fréquentes", "Common questions"],
              ["/gestion", "Espace de gestion", "Staff area"],
            ].map(([href, nomFr, nomEn]) => (
              <li key={href}>
                <Link href={chemin(langue, href)} className="hover:underline hover:underline-offset-4">
                  {fr ? nomFr : nomEn}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="border-t border-trait">
        <div className="conteneur flex flex-wrap gap-x-6 gap-y-2 py-5 text-sm text-discret">
          <a href={spa.instagram} className="hover:underline">
            Instagram
          </a>
          <a href={spa.facebook} className="hover:underline">
            Facebook
          </a>
          <span className="ml-auto">Au bout du monde, {spa.adresse}, {spa.ville}</span>
        </div>
      </div>
    </footer>
  );
}
