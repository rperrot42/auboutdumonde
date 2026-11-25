// English version of the massage descriptions. Same slugs as catalogue.ts.

import {
  dureeLisible,
  getMassage,
  libelleOffre,
  massages,
  faq,
  soins,
  spa,
  type Categorie,
  type Massage,
  type Offre,
  type Soin,
} from "./catalogue";
import type { Langue } from "./langue";

type Traduction = Pick<Massage, "nom" | "accroche" | "pression" | "bienfaits" | "texte"> &
  Partial<Pick<Massage, "citation" | "aSavoir">>;

const en: Record<string, Traduction> = {
  "hawaien-lomi-lomi": {
    nom: "Hawaiian massage – Lomi lomi",
    accroche: "Fluid and enveloping: the forearms move over the body like waves.",
    pression: "Light, medium and deep pressure",
    bienfaits: ["Deep relaxation", "A feeling of being held", "Releases tension"],
    texte: [
      "To the rhythm of the waves, by turns deep and powerful or soft and soothing, this massage carries you away. Hands and forearms glide over your body in long, flowing movements.",
      "You reach a state of deep relaxation. The massage is given with the respect and kindness of the Hawaiian tradition. Aloha.",
    ],
  },
  tuina: {
    nom: "Tuina massage",
    accroche: "Precise and effective. Ideal for clearing stress and energy blockages.",
    pression: "Deep pressure",
    bienfaits: ["Clears stress", "Unknots tension", "Restores energy"],
    texte: [
      "Tuina has been part of Chinese culture for thousands of years and is based on balancing Qi, the vital energy. This targeted massage can be dynamic and deep. It releases tension caused by stress, anxiety or poor posture.",
      "Combining pressure, light strokes and percussion, it is a massage to tailor to you. You leave feeling lighter and moving more freely.",
    ],
  },
  balinais: {
    nom: "Balinese massage",
    accroche: "A blend of Asian influences: stretching, kneading and pressure.",
    pression: "Medium pressure",
    bienfaits: ["Loosens the joints", "Makes the body supple", "Calms the mind"],
    texte: [
      "Indonesia is a mosaic of peoples who brought a mix of techniques to Balinese massage. It combines three: Ayurvedic massage from traditional Indian medicine, Tuina from Chinese energy medicine, and Thai massage.",
      "The massage alternates supple and precise gestures: friction and stretching to loosen your joints, acupressure and light strokes from the tips of your toes to your scalp to calm your mind.",
    ],
  },
  californien: {
    nom: "Californian massage",
    accroche: "Gentle and enveloping. An invitation to let go.",
    pression: "Light pressure",
    bienfaits: ["Letting go", "Deep relaxation", "Quiets the mind"],
    texte: [
      "Californian massage was developed in the 1960s at the Esalen Institute in Big Sur, near San Francisco. It is also known as Esalen massage.",
      "It combines slow, gentle, enveloping movements. Its very soft approach makes it a deeply relaxing moment.",
    ],
  },
  thailandais: {
    nom: "Thai massage",
    accroche: "Slow, deep pressure that helps release physical and mental tension.",
    pression: "Medium to deep pressure",
    bienfaits: ["Stretches and loosens", "Releases tension", "Gets energy flowing"],
    texte: [
      "This massage was born in India more than 2,500 years ago. It is often attributed to Shivago, a famous physician said to have been a close friend of the Buddha.",
      "Traditional Thai massage sees the body as energy, crossed by energy lines. When that flow is blocked, the imbalance brings stress and tension.",
      "The northern style alternates gentle stretches with pressure on precise points, using thumbs and palms. Elbows, feet or knees are sometimes used.",
    ],
  },
  shiatsu: {
    nom: "Shiatsu massage",
    accroche: "Acupressure massage that brings your energy back into balance.",
    pression: "Light to medium pressure",
    bienfaits: ["Rebalances energy", "Deep calm", "Soothes body and mind"],
    citation: "The way of balance",
    texte: [
      "Shiatsu, literally “finger pressure”, is a traditional Japanese art. Drawing on traditional Chinese wisdom, it looks at a person’s health as a whole: physical, emotional and mental.",
      "It is practised with pressure and stretches along the body, following the energy pathways of traditional Chinese medicine. A deep calm gradually settles in.",
    ],
  },
  suedois: {
    nom: "Swedish massage",
    accroche: "An invigorating massage that targets muscle tension.",
    pression: "Deep pressure",
    bienfaits: ["Relieves the muscles", "Tones", "Invigorates"],
    texte: [
      "Often seen as a sports technique, Swedish massage is now a classic, just like Californian massage.",
      "Founded by the physician Per Henrik Ling (1776–1839), it was first designed to improve athletes’ physical performance. It combines kneading and percussion with long gliding oil strokes on targeted areas.",
    ],
  },
  ayurvedique: {
    nom: "Ayurvedic massage",
    accroche: "Alternating quick, toning movements that balance body and mind.",
    pression: "Light to medium pressure",
    bienfaits: ["Balances body and mind", "Tones", "Relaxes deeply"],
    texte: [
      "Ayurvedic massage is an ancestral practice from traditional Indian medicine, like yoga and meditation. In Sanskrit, Ayurveda means “science of life”.",
      "The abhyanga massage offered at our spa means “oil massage of the body”. Given with warm oils, it rebalances body and mind through pressure, friction, acupressure and stretching.",
    ],
  },
  "sur-mesure": {
    nom: "Tailor-made massage",
    accroche: "A massage that blends techniques to suit how you feel today.",
    pression: "Light, medium and deep pressure",
    bienfaits: ["Adapts to what you need", "Blends several techniques", "Never the same twice"],
    texte: [
      "The practitioner builds the massage with you, blending one or several techniques according to what your body needs that day.",
      "An unexpected, surprising massage that lets you discover different techniques in a single session.",
    ],
  },
  "barefoot-ashiatsu": {
    nom: "Barefoot massage – Ashiatsu",
    accroche: "For those who always want more pressure.",
    pression: "Medium to very deep pressure",
    bienfaits: ["Very deep pressure", "Stretches the back", "Unknots deeply"],
    citation: "The gentlest of deep massages",
    aSavoir: "One room of the spa is dedicated entirely to barefoot massage: a house speciality.",
    texte: [
      "Ashiatsu, “foot pressure”, is a modern Western adaptation of the foot massages found across Asia, India, Africa and the Pacific.",
      "Holding overhead bars for balance, the practitioner begins with pressure, rocking and deep stretches, then moves into long gliding strokes. You will not find a deeper massage.",
    ],
  },
  "femme-enceinte": {
    nom: "Pregnancy massage",
    accroche: "For mothers-to-be: the gentleness and benefits of prenatal massage.",
    pression: "Light pressure",
    bienfaits: ["Relieves the legs", "Helps you sleep", "Releases tension"],
    aSavoir: "Available from the 4th month of pregnancy. Please tell us when you book.",
    texte: [
      "Pregnancy brings many physical and emotional changes. Prenatal massage is an ideal companion for this time: it brings harmony, calm and serenity, for you and your baby.",
      "Adapted to each stage of pregnancy, it releases muscle tension, improves circulation in the legs, helps you sleep and offers a special moment between mother and baby.",
    ],
  },
};

export function massagesEn(langue: Langue): Massage[] {
  return langue === "fr" ? massages : massages.map((m) => ({ ...m, ...en[m.slug] }));
}

export function massageEn(slug: string, langue: Langue) {
  const massage = getMassage(slug);
  if (!massage) return undefined;
  return langue === "fr" ? massage : { ...massage, ...en[slug] };
}

// ————— Offers in English —————

const nomsEn: Record<string, string> = {
  "abonnement-6h": "6-hour massage pass",
  "abonnement-12h": "12-hour massage pass",
  "soin-absolution-30": "Absolution tailor-made facial",
  "soin-absolution-60": "Absolution tailor-made facial",
  "soin-kobido-60": "Kobido facial",
  "soin-kobido-5": "Kobido facial, 5 sessions",
  "soin-kobido-10": "Kobido facial, 10 sessions",
  "soin-detox-90": "Tailor-made detox body scrub",
  "soin-detox-60": "Detox body scrub",
  "soin-express-30": "Express radiance body scrub",
};

/** Name of an offer, in the chosen language, with solo or duo. */
export function nomOffre(o: Offre, langue: Langue) {
  if (langue === "fr") return libelleOffre(o);
  let nom = nomsEn[o.id];
  if (!nom && o.categorie === "massage") nom = `${o.duree} min massage`;
  if (!nom && o.categorie === "rituel")
    nom = o.id.includes("-hgm-")
      ? `Hammam, scrub and ${o.id.split("-").pop()} min massage`
      : `Hammam and ${o.id.split("-").pop()} min massage`;
  if (!nom && o.categorie === "bon") nom = `€${o.prix} voucher`;
  return o.formule ? `${nom}, ${o.formule}` : (nom ?? o.nom);
}

/** Short detail under an offer name (duration, sessions). */
export function detailOffre(o: Offre, langue: Langue) {
  if (!o.detail || langue === "fr") return o.detail;
  if (o.categorie === "rituel") return `${dureeLisible(o.duree!)} in total`;
  if (o.quantite > 1) return `${o.quantite} sessions of ${o.duree} min`;
  return `${o.duree} min`;
}

export const categoriesEn: Record<Categorie, { nom: string; intro: string }> = {
  massage: {
    nom: "Massages",
    intro: "All massages are the same price. Choose yours now or on the day.",
  },
  rituel: {
    nom: "Hammam rituals",
    intro: "Private hammam, passion fruit body scrub and a massage.",
  },
  soin: { nom: "Treatments", intro: "Face and body treatments, with organic skincare." },
  bon: { nom: "Vouchers", intro: "Not sure what to give? Let them choose." },
};

// ————— Treatments, FAQ and access in English —————

const soinsTexteEn: Record<string, Pick<Soin, "nom" | "resume" | "texte"> & { aSavoir?: string }> = {
  absolution: {
    nom: "Absolution facial",
    resume: "A blend of organic plants, wild flowers, minerals and vitamins.",
    texte:
      "Draining, stimulating and anti-ageing, rebalancing, soothing and hydrating: a new breath for tired skin. Offered in two rituals depending on your mood, it brings out your skin’s radiance and calms the most stressed skin.",
  },
  kobido: {
    nom: "Kobido lifting facial",
    resume: "Anti-ageing, firming, plumping and lifting.",
    texte:
      "This facial massage inspired by kobido alternates kneading, light strokes and percussion, from quick, light movements to slow, deep gestures. A natural lift that works best over several sessions.",
    aSavoir: "Not recommended if you are having cosmetic medical treatment (Botox injections).",
  },
  "detox-sur-mesure": {
    nom: "Tailor-made detox body treatment",
    resume: "Draining, firming, detoxifying, relaxing.",
    texte:
      "In 1 h 30: stretching, a body scrub and a deeply relaxing draining massage. It drains, firms, boosts circulation and gives you back your energy. Given with an Ecocert-certified organic range.",
  },
  "gommage-detox": {
    nom: "Detox body scrub",
    resume: "Body scrub and draining massage, 60 minutes.",
    texte:
      "The organic Absolution scrub gently exfoliates the skin and leaves it cleansed and nourished. Its oily texture turns milky when rinsed, followed by a draining massage that extends the relaxation.",
  },
  "gommage-express": {
    nom: "Express radiance body scrub",
    resume: "The bare minimum for new-feeling skin, in 30 minutes.",
    texte: "For those in a hurry: a body scrub that clears away impurities and leaves the skin satin-smooth.",
  },
};

export function soinsEn(langue: Langue): Soin[] {
  return langue === "fr" ? soins : soins.map((s) => ({ ...s, ...soinsTexteEn[s.slug] }));
}

const faqEnglish = [
  {
    question: "What happens during a session?",
    reponse: [
      "Before we start, we ask which areas to focus on and which to avoid. You settle on a heated massage table, in soft light. Disposable underwear is available.",
      "Throughout the session, a towel covers every part of the body that is not being massaged: your privacy is always respected.",
      "When the massage is over, we leave quietly to give you time to come back. You can stay a little longer with an herbal tea in our lounge.",
    ],
  },
  {
    question: "What is the difference between 30, 60 and 90 minutes?",
    reponse: [
      "30 minutes: a massage on one or two areas.",
      "60 minutes: a full-body massage.",
      "90 minutes: the full body, with time to linger on specific areas.",
    ],
  },
  {
    question: "How does a duo massage work?",
    reponse: [
      "You are massaged in the same room by two practitioners. Each of you chooses your massage (except floor massages), the pressure and the areas to avoid or focus on.",
      "Practitioners adapt to each of you: we have banned set routines in favour of personal massages.",
    ],
  },
  {
    question: "How do I receive and use a gift card?",
    reponse: [
      "You order the card on the site and receive it straight away, to print or keep on your phone. You can then pass it on.",
      "The recipient books an appointment using the reference on the card. Cards are valid for 6 months, Monday to Saturday except public holidays; passes for 1 year, Monday to Friday.",
    ],
  },
  {
    question: "Can I have a massage while pregnant?",
    reponse: [
      "Yes: we offer a pregnancy massage from the 4th month until a few days before the due date. Our oils are plant-based and organic, with no essential oils.",
      "This massage is for mothers-to-be whose pregnancy is going smoothly. If you have pain or anything unusual, please talk to your doctor before booking.",
    ],
  },
  {
    question: "Can I choose to be massaged by a woman or a man?",
    reponse: [
      "Our team is mixed and, above all, professional. We do not schedule appointments based on the practitioner’s gender.",
      "Everyone who works at the spa is kind, respectful and attentive to your comfort.",
    ],
  },
  {
    question: "Does the spa use organic products?",
    reponse: [
      "All our products are organic: massage oils, skincare, the herbal teas served after treatments and the cleaning products. Even the water is filtered.",
    ],
  },
  {
    question: "What music plays during treatments?",
    reponse: [
      "Each playlist was built to carry a mood. If the music doesn’t suit you, just tell the person looking after you. We don’t have any new age playlists though: no birdsong, no running streams.",
    ],
  },
  {
    question: "Are there other Au bout du monde spas?",
    reponse: [
      "No. Au bout du monde is an independent spa and intends to stay that way. To be massaged here, you still have to come to Lyon.",
    ],
  },
];

export function faqEn(langue: Langue) {
  return langue === "fr" ? faq : faqEnglish;
}

export function accesEn(langue: Langue) {
  if (langue === "fr") return spa.acces;
  return [
    { mode: "On foot", detail: "5 minutes from Place des Terreaux" },
    { mode: "Metro", detail: "Hôtel de Ville" },
    { mode: "Bus", detail: "La Feuillée stop: C13, C14, C18, 31, 40" },
    { mode: "Vélo’v", detail: "Pêcherie station" },
    { mode: "Parking", detail: "Saint-Antoine or Hôtel de Ville" },
  ];
}
