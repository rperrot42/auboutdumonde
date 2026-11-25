// Dates au format local "AAAA-MM-JJ" pour éviter les décalages de fuseau.

export function versCle(d: Date) {
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const jj = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${mm}-${jj}`;
}

export function depuisCle(cle: string) {
  const [a, mo, j] = cle.split("-").map(Number);
  return new Date(a, mo - 1, j);
}

export function ajouterJours(d: Date, n: number) {
  const copie = new Date(d);
  copie.setDate(copie.getDate() + n);
  return copie;
}

export function ajouterMois(d: Date, n: number) {
  const copie = new Date(d);
  copie.setMonth(copie.getMonth() + n);
  return copie;
}

const locales = { fr: "fr-FR", en: "en-GB" } as const;
type Lang = keyof typeof locales;

export const dateLongue = (cle: string, langue: Lang = "fr") =>
  new Intl.DateTimeFormat(locales[langue], { weekday: "long", day: "numeric", month: "long" }).format(
    depuisCle(cle),
  );
export const dateCourte = (iso: string, langue: Lang = "fr") =>
  new Intl.DateTimeFormat(locales[langue], { day: "numeric", month: "long", year: "numeric" }).format(
    iso.length === 10 ? depuisCle(iso) : new Date(iso),
  );
export const jourCourt = (cle: string, langue: Lang = "fr") =>
  new Intl.DateTimeFormat(locales[langue], { weekday: "short" }).format(depuisCle(cle));
export const moisCourt = (cle: string, langue: Lang = "fr") =>
  new Intl.DateTimeFormat(locales[langue], { month: "short" }).format(depuisCle(cle));

export const euros = (n: number) =>
  new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: n % 1 === 0 ? 0 : 2,
  }).format(n);

export const heureLisible = (hhmm: string, langue: Lang = "fr") =>
  langue === "fr" ? hhmm.replace(":", " h ") : hhmm;

export const enMinutes = (hhmm: string) => {
  const [h, min] = hhmm.split(":").map(Number);
  return h * 60 + min;
};

/** Dimanche de Pâques (algorithme de Meeus). */
function paques(annee: number) {
  const a = annee % 19;
  const b = Math.floor(annee / 100);
  const c = annee % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const mm = Math.floor((a + 11 * h + 22 * l) / 451);
  const mois = Math.floor((h + l - 7 * mm + 114) / 31);
  const jour = ((h + l - 7 * mm + 114) % 31) + 1;
  return new Date(annee, mois - 1, jour);
}

export function estFerie(d: Date) {
  const fixes = ["01-01", "05-01", "05-08", "07-14", "08-15", "11-01", "11-11", "12-25"];
  if (fixes.includes(versCle(d).slice(5))) return true;
  const p = paques(d.getFullYear());
  return [1, 39, 50].some((n) => versCle(ajouterJours(p, n)) === versCle(d));
}
