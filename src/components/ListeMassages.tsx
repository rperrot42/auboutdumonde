"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Massage } from "@/lib/catalogue";
import { chemin, type Langue } from "@/lib/langue";

// Photos du lieu, à la bougie. Une par massage ; elles se répètent volontairement.
const ambiances = [
  { src: "/images/soins/kobido-large.webp", w: 1200, h: 798 },
  { src: "/images/spa/equipe.jpg", w: 1080, h: 1080 },
  { src: "/images/spa/spa-5.jpg", w: 1346, h: 924 },
  { src: "/images/soins/absolution.jpg", w: 600, h: 402 },
  { src: "/images/spa/spa-4.jpg", w: 1970, h: 1310 },
  { src: "/images/soins/detox.webp", w: 1200, h: 675 },
  { src: "/images/spa/accueil.jpg", w: 1500, h: 998 },
];

/** « Massage balinais » devient « Balinais » : le mot répété alourdit la liste. */
function nomCourt(nom: string) {
  const court = nom.replace(/^Massage /, "").replace(/ massage(?= |$)/i, "");
  return court.charAt(0).toUpperCase() + court.slice(1);
}

/**
 * Les massages en liste, sans grille de photos : les noms portent la page.
 * Sur ordinateur, une photo du lieu change au survol ou au focus d'un nom.
 */
export function ListeMassages({ massages, langue }: { massages: Massage[]; langue: Langue }) {
  const [actif, setActif] = useState(0);
  const image = (i: number) => i % ambiances.length;

  return (
    <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
      <ul className="border-b border-trait">
        {massages.map((m, i) => (
          <li key={m.slug} className="border-t border-trait">
            <Link
              href={chemin(langue, `/massages/${m.slug}`)}
              onMouseEnter={() => setActif(i)}
              onFocus={() => setActif(i)}
              aria-current={undefined}
              className="group flex flex-col gap-2 py-6 md:flex-row md:items-baseline md:justify-between md:gap-8 md:py-7"
            >
              <span
                className={`font-titre text-3xl font-light leading-tight transition-colors duration-500 md:text-[2.6rem] ${
                  actif === i ? "lg:text-accent" : ""
                } group-hover:text-accent`}
              >
                {nomCourt(m.nom)}
              </span>
              <span className="text-sm text-discret md:max-w-[15rem] md:text-right">
                {m.bienfaits.join(", ")}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <div aria-hidden className="relative hidden lg:block">
        <div className="sticky top-32 aspect-[4/5] overflow-hidden rounded-lg bg-surface">
          {ambiances.map((a, i) => (
            <Image
              key={a.src}
              src={a.src}
              alt=""
              width={a.w}
              height={a.h}
              sizes="40vw"
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-out ${
                image(actif) === i ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
          <p className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-6 pt-16 text-[#f3eadc]">
            {massages[actif].accroche}
          </p>
        </div>
      </div>
    </div>
  );
}
