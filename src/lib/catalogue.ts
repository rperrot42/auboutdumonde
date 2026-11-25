// Contenu du spa : prestations, tarifs et informations pratiques.
// Tout le site lit ces données ; modifier un prix ici le met à jour partout.

export type Formule = "solo" | "duo";

export type Massage = {
  slug: string;
  nom: string;
  destination: string;
  accroche: string;
  pression: string;
  /** Ce que le massage apporte, en trois mots. */
  bienfaits: string[];
  citation?: string;
  aSavoir?: string;
  texte: string[];
};

export const massages: Massage[] = [
  {
    slug: "hawaien-lomi-lomi",
    nom: "Massage hawaïen – Lomi lomi",
    destination: "Maui",
    accroche:
      "Fluide et enveloppant, les avant-bras se déplacent comme des vagues sur le corps.",
    pression: "Pression légère, modérée et profonde",
    bienfaits: ["Détente profonde", "Sensation d’enveloppement", "Relâche les tensions"],
    texte: [
      "Au rythme des vagues, tour à tour pénétrant et puissant ou doux et apaisant, ce massage vous transporte littéralement. Les mains, les avant-bras glissent sur votre corps en prodiguant des mouvements fluides et enveloppants.",
      "Vous accédez à une détente profonde. Toute l’énergie de l’océan Pacifique déferle sur votre corps avec ce massage pratiqué dans le respect et la bienveillance de la tradition hawaïenne. Aloha !",
    ],
  },
  {
    slug: "tuina",
    nom: "Massage Tuina",
    destination: "Beijing",
    accroche:
      "Précis et efficace, idéal pour évacuer le stress, il agit contre les blocages énergétiques.",
    pression: "Pression profonde",
    bienfaits: ["Évacue le stress", "Dénoue les tensions", "Redonne du tonus"],
    texte: [
      "Le Tuina fait partie de la culture chinoise depuis des millénaires et repose sur le concept énergétique d’harmonisation du Qi, l’énergie vitale. Ce massage ciblé peut être dynamique et profond. Il dénoue les tensions dues au stress, à l’anxiété ou aux mauvais positionnements du corps.",
      "Le Tuina disperse les blocages d’énergie afin de vous redonner du tonus et une plus grande fluidité de mouvement. Combinant pressions, effleurages et percussions, c’est un massage à personnaliser. À la fin du massage, vous vous sentirez plus léger.",
    ],
  },
  {
    slug: "balinais",
    nom: "Massage balinais",
    destination: "Bali",
    accroche:
      "Combinaison d’influences asiatiques composée d’étirements, de pétrissages et de pressions.",
    pression: "Pression modérée",
    bienfaits: ["Détend les articulations", "Assouplit le corps", "Apaise l’esprit"],
    texte: [
      "L’Indonésie est une mosaïque de peuples et d’ethnies qui ont apporté au massage balinais un métissage de techniques. Il en combine habilement trois : le massage ayurvédique issu de la médecine traditionnelle indienne, le Tuina né de la médecine énergétique chinoise et le massage thaï, aussi appelé Nuad Bo Rarn.",
      "Le massage alterne des gestes tout en souplesse et en précision : frictions et étirements pour détendre vos articulations, acupressions et effleurages depuis la pointe de vos pieds jusqu’à votre cuir chevelu, pour apaiser votre esprit.",
    ],
  },
  {
    slug: "californien",
    nom: "Massage californien",
    destination: "San Francisco",
    accroche: "Doux et enveloppant, il invite au lâcher-prise.",
    pression: "Pression légère",
    bienfaits: ["Lâcher-prise", "Relaxation profonde", "Apaise le mental"],
    texte: [
      "Le massage californien tire son origine de l’État américain où la technique fut mise au point au cours des années 60. Développé à l’institut Esalen, à Big Sur, près de San Francisco, on le retrouve aussi sous l’appellation de massage Esalen.",
      "Ce massage allie une gestuelle lente, douce et enveloppante. Son approche est sensitive et fondée sur l’estime de soi. Son abord très doux en fait un moment très relaxant.",
    ],
  },
  {
    slug: "thailandais",
    nom: "Massage thaïlandais",
    destination: "Koh Tao",
    accroche:
      "Pressions lentes et profondes aidant à relâcher les tensions physiques et mentales.",
    pression: "Pression modérée à profonde",
    bienfaits: ["Étire et assouplit", "Relâche les tensions", "Fait circuler l’énergie"],
    texte: [
      "Ce massage a pris naissance en Inde il y a plus de 2 500 ans. Il est souvent attribué à Shivago, un célèbre médecin qui aurait été un ami proche du Bouddha.",
      "Le massage traditionnel thaï repose sur l’idée que le corps est énergie et qu’il est traversé par des lignes d’énergie. Lorsque ces flux sont bloqués, cela provoque un déséquilibre qui entraîne stress et tensions.",
      "Le style du Nord alterne étirements souples et pressions sur des points précis, au moyen des pouces et des paumes. Les coudes, les pieds ou les genoux peuvent parfois être utilisés.",
    ],
  },
  {
    slug: "shiatsu",
    nom: "Massage shiatsu",
    destination: "Kyoto",
    accroche:
      "Massage par acupression, efficace pour une harmonisation énergétique.",
    pression: "Pression légère à modérée",
    bienfaits: ["Rééquilibre l’énergie", "Grande détente", "Apaise corps et mental"],
    citation: "La voie de l’équilibre",
    texte: [
      "Le shiatsu, littéralement « pression des doigts », est un art traditionnel japonais. Puisant dans la sagesse traditionnelle chinoise, il perçoit la santé de l’être humain dans sa globalité physique, psychique et mentale. C’est une pratique subtile qui vise à rétablir la bonne circulation de l’énergie vitale, le Ki.",
      "Il se pratique en exerçant des pressions et des étirements le long du corps, en suivant les flux énergétiques de la médecine traditionnelle chinoise. Une grande détente s’installe peu à peu.",
    ],
  },
  {
    slug: "suedois",
    nom: "Massage suédois",
    destination: "Stockholm",
    accroche:
      "Ce massage tonique vise particulièrement les tensions musculaires.",
    pression: "Pression profonde",
    bienfaits: ["Soulage les muscles", "Tonifie", "Revigore"],
    texte: [
      "Assimilé à une technique sportive, le massage suédois, avant-gardiste dans le soin corporel, est aujourd’hui un classique au même titre que le massage californien.",
      "Fondée par le médecin Per Henrik Ling (1776-1839), cette pratique visait à l’origine à optimiser la performance physique des athlètes. Elle combine pétrissages et percussions avec de longs massages glissés à l’huile, sur des zones ciblées. Revigorant, vivifiant, tonifiant !",
    ],
  },
  {
    slug: "ayurvedique",
    nom: "Massage ayurvédique",
    destination: "Kottayam",
    accroche:
      "Alternance de mouvements rapides et tonifiants, équilibrant corps et esprit.",
    pression: "Pression légère à modérée",
    bienfaits: ["Rééquilibre corps et esprit", "Tonifie", "Détend en profondeur"],
    texte: [
      "Le massage ayurvédique est une pratique ancestrale issue de la médecine traditionnelle indienne, au même titre que le yoga et la méditation. En sanscrit, Ayurvéda signifie « science de la vie », et il existe en Inde autant de massages ayurvédiques que de régions.",
      "Le massage abhyanga, pratiqué dans le sud du pays et proposé dans notre spa, signifie « massage à l’huile du corps ». Réalisé avec des huiles chaudes, il rééquilibre et unifie le corps et l’esprit par des pressions, des frictions, des acupressions et des étirements.",
    ],
  },
  {
    slug: "sur-mesure",
    nom: "Massage sur mesure",
    destination: "Au bout du monde",
    accroche:
      "Un massage métissant différentes techniques selon votre humeur du moment.",
    pression: "Pression légère, modérée et profonde",
    bienfaits: ["S’adapte à votre besoin", "Mêle plusieurs techniques", "Jamais deux fois le même"],
    texte: [
      "Le praticien compose avec vous, en mêlant une ou plusieurs techniques selon ce dont votre corps a besoin ce jour-là.",
      "Un massage inattendu et surprenant, qui vous fait découvrir différentes techniques en une seule séance.",
    ],
  },
  {
    slug: "barefoot-ashiatsu",
    nom: "Barefoot massage ashiatsu",
    destination: "Hong Kong",
    accroche:
      "Idéal pour celles et ceux qui souhaitent toujours plus de pression.",
    pression: "Pression modérée à très profonde",
    bienfaits: ["Pression très profonde", "Étire le dos", "Dénoue en profondeur"],
    citation: "Le plus doux des massages profonds",
    aSavoir:
      "Une salle du spa est entièrement dédiée au barefoot : une exclusivité de la maison.",
    texte: [
      "L’ashiatsu, « pression avec les pieds », est une adaptation occidentale moderne des massages avec les pieds que l’on retrouve à travers le monde, en Asie, en Inde, en Afrique et dans le Pacifique.",
      "S’aidant de barres aériennes dans ses déplacements, le praticien commence par des pressions, des balancements et de profonds étirements, puis enchaîne de longs mouvements glissés. Vous ne pourrez pas obtenir un massage plus profond.",
    ],
  },
  {
    slug: "femme-enceinte",
    nom: "Massage femme enceinte",
    destination: "Bleu du Bélize",
    accroche:
      "Futures mamans, profitez avec bébé de la douceur et des bienfaits du massage prénatal.",
    pression: "Pression légère",
    bienfaits: ["Soulage les jambes", "Favorise le sommeil", "Relâche les tensions"],
    aSavoir:
      "Réalisable à partir du 4ᵉ mois de grossesse. Pensez à nous le préciser à la prise de rendez-vous.",
    texte: [
      "Moment privilégié, la grossesse est riche en chamboulements physiques et émotionnels. Le massage prénatal accompagne idéalement cette période : il procure harmonie, détente et sérénité, pour vous comme pour votre bébé.",
      "Adapté à chaque étape de la grossesse, il relâche les tensions musculaires, améliore la circulation au niveau des jambes, favorise le sommeil et offre un contact privilégié entre la maman et son bébé.",
    ],
  },
];

export function getMassage(slug: string | null | undefined) {
  return massages.find((m) => m.slug === slug);
}

export type Soin = {
  slug: string;
  nom: string;
  image: string;
  resume: string;
  texte: string;
  aSavoir?: string;
};

export const soins: Soin[] = [
  {
    slug: "absolution",
    nom: "Soin du visage Absolution",
    image: "/images/soins/absolution.jpg",
    resume: "Cocktail de végétaux bio, fleurs sauvages, minéraux et vitamines.",
    texte:
      "Drainant, stimulant et anti-âge, rééquilibrant, calmant et hydratant : un nouveau souffle pour les peaux fatiguées. Décliné en deux rituels selon votre état d’esprit du moment, il révèle l’éclat de votre peau et apaise les plus stressées.",
  },
  {
    slug: "kobido",
    nom: "Soin visage lift – Kobido",
    image: "/images/soins/kobido.webp",
    resume: "Anti-âge, raffermissant, repulpant et liftant.",
    texte:
      "Ce massage du visage inspiré du kobido alterne pétrissages, effleurages et percussions, des mouvements rapides et légers aux gestes lents et profonds. Un véritable lifting naturel, qui prend tout son sens dans la durée.",
    aSavoir:
      "Déconseillé si vous suivez un traitement de médecine esthétique (injections de botox).",
  },
  {
    slug: "detox-sur-mesure",
    nom: "Soin corps détox sur mesure",
    image: "/images/soins/detox.webp",
    resume: "Drainant, raffermissant, détoxifiant, relaxant.",
    texte:
      "En 1 h 30, étirements, gommage et massage drainant intensément relaxant : le soin draine, raffermit, relance la circulation et vous redonne de l’élan. Prodigué avec une gamme de cosmétiques biologiques labellisée Ecocert.",
  },
  {
    slug: "gommage-detox",
    nom: "Soin gommage détox",
    image: "/images/soins/gommage.webp",
    resume: "Gommage corporel et massage drainant, 60 minutes.",
    texte:
      "Le soin gommant bio Absolution exfolie la peau en douceur et la laisse nettoyée, détoxifiée et nourrie. Sa texture huileuse se transforme en lait au rinçage, avant un massage drainant qui prolonge la détente.",
  },
  {
    slug: "gommage-express",
    nom: "Soin gommage éclat express",
    image: "/images/soins/express.webp",
    resume: "Le juste minimum qui fait peau neuve, en 30 minutes.",
    texte:
      "Pour les plus pressés : un gommage du corps qui libère la peau de ses impuretés et la laisse satinée.",
  },
];

// ————— Offres vendues en carte cadeau et réservables —————

export type Categorie = "massage" | "rituel" | "soin" | "bon";
export type Unite = "seances" | "minutes" | "euros";

export type Offre = {
  id: string;
  categorie: Categorie;
  nom: string;
  detail?: string;
  formule?: Formule;
  prix: number;
  /** Durée d'un rendez-vous en minutes (absente pour bons et abonnements). */
  duree?: number;
  /** Ce que contient la carte : 1 séance, 360 minutes, 50 euros… */
  unite: Unite;
  quantite: number;
  validiteMois: 6 | 12;
  /** Abonnements : du lundi au vendredi uniquement. */
  semaineSeulement?: boolean;
  /** Non réservable directement (bons d'achat, packs). */
  reservable: boolean;
};

const m = (duree: number, formule: Formule, prix: number): Offre => ({
  id: `massage-${formule}-${duree}`,
  categorie: "massage",
  nom: `Massage ${duree} min`,
  formule,
  prix,
  duree,
  unite: "seances",
  quantite: 1,
  validiteMois: 6,
  reservable: true,
});

const r = (
  gommage: boolean,
  massage: number,
  total: number,
  formule: Formule,
  prix: number,
): Offre => ({
  id: `rituel-${gommage ? "hgm" : "hm"}-${formule}-${massage}`,
  categorie: "rituel",
  nom: `Hammam${gommage ? ", gommage" : ""} et massage ${massage} min`,
  detail: `Durée totale ${dureeLisible(total)}`,
  formule,
  prix,
  duree: total,
  unite: "seances",
  quantite: 1,
  validiteMois: 6,
  reservable: true,
});

const s = (
  id: string,
  nom: string,
  duree: number,
  prix: number,
  seances = 1,
): Offre => ({
  id,
  categorie: "soin",
  nom,
  detail: seances > 1 ? `${seances} séances de ${duree} min` : `${duree} min`,
  prix,
  duree,
  unite: "seances",
  quantite: seances,
  validiteMois: 6,
  reservable: seances === 1,
});

export function dureeLisible(minutes: number) {
  const h = Math.floor(minutes / 60);
  const min = minutes % 60;
  if (h === 0) return `${min} min`;
  return min === 0 ? `${h} h` : `${h} h ${String(min).padStart(2, "0")}`;
}

export const offres: Offre[] = [
  m(30, "solo", 60),
  m(60, "solo", 90),
  m(90, "solo", 115),
  m(30, "duo", 120),
  m(60, "duo", 180),
  m(90, "duo", 230),
  {
    id: "abonnement-6h",
    categorie: "massage",
    nom: "Abonnement 6 h de massage",
    prix: 489,
    unite: "minutes",
    quantite: 360,
    validiteMois: 12,
    semaineSeulement: true,
    reservable: false,
  },
  {
    id: "abonnement-12h",
    categorie: "massage",
    nom: "Abonnement 12 h de massage",
    prix: 876,
    unite: "minutes",
    quantite: 720,
    validiteMois: 12,
    semaineSeulement: true,
    reservable: false,
  },
  r(true, 30, 90, "solo", 135),
  r(true, 60, 120, "solo", 165),
  r(true, 90, 150, "solo", 190),
  r(true, 30, 90, "duo", 255),
  r(true, 60, 120, "duo", 315),
  r(true, 90, 150, "duo", 365),
  r(false, 60, 90, "solo", 125),
  r(false, 90, 120, "solo", 150),
  r(false, 30, 60, "duo", 175),
  r(false, 60, 90, "duo", 235),
  r(false, 90, 120, "duo", 285),
  s("soin-absolution-30", "Soin visage sur mesure Absolution", 30, 65),
  s("soin-absolution-60", "Soin visage sur mesure Absolution", 60, 110),
  s("soin-kobido-60", "Soin visage kobido", 60, 100),
  s("soin-kobido-5", "Soin visage kobido, 5 séances", 60, 450, 5),
  s("soin-kobido-10", "Soin visage kobido, 10 séances", 60, 800, 10),
  s("soin-detox-90", "Soin corps gommage détox sur mesure", 90, 145),
  s("soin-detox-60", "Soin corps gommage détox", 60, 95),
  s("soin-express-30", "Soin corps gommage éclat express", 30, 65),
  ...[50, 100, 150, 200].map(
    (montant): Offre => ({
      id: `bon-${montant}`,
      categorie: "bon",
      nom: `Bon d’achat de ${montant} €`,
      prix: montant,
      unite: "euros",
      quantite: montant,
      validiteMois: 6,
      reservable: false,
    }),
  ),
];

export function getOffre(id: string | null | undefined) {
  return offres.find((o) => o.id === id);
}

export function libelleOffre(o: Offre) {
  const formule = o.formule ? ` en ${o.formule}` : "";
  return `${o.nom}${formule}`;
}

export const categories: { id: Categorie; nom: string; intro: string }[] = [
  {
    id: "massage",
    nom: "Massages",
    intro:
      "Tous les massages sont au même tarif. Vous pouvez choisir le vôtre maintenant ou le jour du rendez-vous.",
  },
  {
    id: "rituel",
    nom: "Rituels hammam",
    intro:
      "Hammam privatif, gommage aux fruits de la passion et massage du monde.",
  },
  { id: "soin", nom: "Soins", intro: "Soins du visage et du corps, en cosmétiques bio." },
  {
    id: "bon",
    nom: "Bons d’achat",
    intro: "Vous ne savez pas quoi offrir ? Laissez le choix.",
  },
];

// ————— Informations pratiques —————

export const spa = {
  nom: "Au bout du monde",
  adresse: "3 quai de la Pêcherie",
  ville: "69001 Lyon",
  telephone: "09 80 87 91 66",
  telephoneLien: "+33980879166",
  mobile: "06 02 53 44 18",
  email: "contact@auboutdumonde.eu",
  facebook: "https://fr-fr.facebook.com/Auboutdumondelyon",
  instagram: "https://www.instagram.com/auboutdumondelyon/",
  plan: "https://www.google.com/maps/place/Au+bout+du+Monde+-+Massage+Spa+Lyon/@45.7663696,4.8307337,17z",
  horaires: [
    { jours: "Du lundi au samedi", heures: "10 h – 20 h", days: "Monday to Saturday", hours: "10 am – 8 pm" },
    { jours: "Dimanche", heures: "10 h – 18 h", days: "Sunday", hours: "10 am – 6 pm" },
  ],
  acces: [
    { mode: "À pied", detail: "5 min de la place des Terreaux" },
    { mode: "Métro", detail: "Hôtel de Ville" },
    { mode: "Bus", detail: "Arrêt La Feuillée : C13, C14, C18, 31, 40" },
    { mode: "Vélo’v", detail: "Station Pêcherie" },
    { mode: "Parking", detail: "Saint-Antoine ou Hôtel de Ville" },
  ],
};

export const faq: { question: string; reponse: string[] }[] = [
  {
    question: "Comment se déroule une séance ?",
    reponse: [
      "Avant de débuter, nous prenons connaissance des zones à privilégier et de celles à éviter. Vous vous installez tranquillement sur une table de massage chauffée, dans une ambiance feutrée. Des sous-vêtements à usage unique sont à votre disposition.",
      "Tout au long de la séance, une serviette recouvre les parties du corps qui ne sont pas massées : votre intimité est toujours préservée.",
      "Le massage terminé, nous sortons discrètement pour vous laisser le temps d’émerger. Vous pouvez prolonger l’instant avec une infusion servie dans notre salon.",
    ],
  },
  {
    question: "Quelle est la différence entre 30, 60 et 90 minutes ?",
    reponse: [
      "30 minutes : un massage sur une à deux zones.",
      "60 minutes : un massage de tout le corps.",
      "90 minutes : tout le corps, avec le temps de s’attarder sur des zones précises.",
    ],
  },
  {
    question: "Comment se déroule un massage en duo ?",
    reponse: [
      "Vous êtes massés dans la même salle par deux praticiens. Chacun choisit son massage (sauf les massages au sol), la pression et les zones à éviter ou sur lesquelles insister.",
      "Les praticiens évoluent différemment selon vos besoins : nous avons banni les massages protocolaires au profit de massages personnalisés.",
    ],
  },
  {
    question: "Comment recevoir et utiliser une carte cadeau ?",
    reponse: [
      "Vous commandez la carte sur le site et la recevez immédiatement, à imprimer ou à garder sur votre téléphone. Vous pouvez alors la transmettre à son destinataire.",
      "Le ou la bénéficiaire prend ensuite rendez-vous en indiquant la référence inscrite sur la carte. Les cartes sont valables 6 mois, du lundi au samedi hors jours fériés ; les abonnements 1 an, du lundi au vendredi.",
    ],
  },
  {
    question: "Peut-on se faire masser pendant la grossesse ?",
    reponse: [
      "Oui : nous proposons le massage femme enceinte à partir du 4ᵉ mois et jusqu’à quelques jours avant le terme. Nos huiles sont végétales et bio, sans huile essentielle.",
      "Ce massage s’adresse aux futures mamans dont la grossesse se déroule sans complication. En cas de douleur ou de signe inhabituel, rapprochez-vous de votre médecin avant de prendre rendez-vous.",
    ],
  },
  {
    question: "Peut-on choisir d’être massé par une praticienne ou un praticien ?",
    reponse: [
      "Notre équipe est mixte et avant tout professionnelle. Nous ne planifions pas les rendez-vous en fonction du genre du praticien.",
      "Toutes les personnes qui travaillent au spa sont bienveillantes, respectueuses et attentives à votre confort.",
    ],
  },
  {
    question: "Le spa utilise-t-il des cosmétiques bio ?",
    reponse: [
      "Tous nos produits sont d’origine biologique : les huiles de massage, les cosmétiques, mais aussi les infusions offertes après les soins et les produits ménagers. Même l’eau est filtrée.",
    ],
  },
  {
    question: "Quelle musique passe pendant les soins ?",
    reponse: [
      "Chaque playlist a été construite pour traduire une émotion. Si la couleur musicale ne vous convient pas, dites-le à la personne qui prend soin de vous. Nous n’avons toutefois pas de playlist new age : ni petits oiseaux, ni rivière qui coule.",
    ],
  },
  {
    question: "Existe-t-il d’autres spas Au bout du monde ?",
    reponse: [
      "Non. Au bout du monde est un spa indépendant et entend le rester. Pour être massé Au bout du monde, il faut encore venir à Lyon.",
    ],
  },
];
