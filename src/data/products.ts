import heroImg from "../assets/img/hero.jpg";
import wildHoney from "../assets/img/product-wild.jpg";
import deltaHoney from "../assets/img/product-delta.jpg";
import milletMalt from "../assets/img/product-malt.jpg";
import karupatti from "../assets/img/product-karupatti.jpg";
import sakkarai from "../assets/img/product-sakkarai.jpg";
import sukku from "../assets/img/product-sukku.jpg";
import hamperImg from "../assets/img/product-hamper.jpg";
import infusionsArt from "../assets/img/infusions.jpg";
import maltArt from "../assets/img/malt.jpg";
import nannariSharbathImg from "../assets/img/product-nannari-sharbath.jpg";
import hornHoneyImg from "../assets/img/product-horn-honey.jpg";
import culturedGheeImg from "../assets/img/product-cultured-ghee.jpg";
import pureCowGheeImg from "../assets/img/product-pure-cow-ghee.jpg";
import kudampuliImg from "../assets/img/product-kudampuli.jpg";
import himalayanSaltImg from "../assets/img/product-himalayan-pink-salt.jpg";

export const images = {
  hero: heroImg,
  wildHoney,
  deltaHoney,
  milletMalt,
  karupatti,
  sakkarai,
  sukku,
  hamper: hamperImg,
  infusionsArt,
  maltArt,
};

export const WHATSAPP_NUMBER = "919600122963";
export const WHATSAPP_DISPLAY = "+91 96001 22963";
export const CONTACT_PHONE = "9600122963";

export const waLink = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

export const waDefault = waLink(
  "Vanakkam AUDATHAM! I have a question about this week's batch."
);

export const formatINR = (n: number) => `₹${n.toLocaleString("en-IN")}`;

export type CategoryId =
  | "honey"
  | "malts"
  | "herbal"
  | "sweeteners"
  | "pantry";

export interface Variant {
  size: string;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  tamil: string;
  category: CategoryId;
  variants: Variant[];
  tag?: string;
  blurb: string;
  image: string;
  contactOnly?: boolean; // If true, show "Contact Audatham" instead of price
}

export const categories: {
  id: CategoryId;
  name: string;
  note: string;
  count: string;
  image: string;
  href: string;
}[] = [
  {
    id: "honey",
    name: "Raw Honey",
    note: "10 rare varietals + 4 honey infusions",
    count: "14 jars",
    image: wildHoney,
    href: "#shop",
  },
  {
    id: "malts",
    name: "Health Malts",
    note: "Sprouted, stone-ground, slow-made",
    count: "6 mixes",
    image: maltArt,
    href: "#shop",
  },
  {
    id: "sweeteners",
    name: "Traditional Sweeteners",
    note: "Karupatti, jaggery, nattu sarkarai, gulkand",
    count: "6 styles",
    image: sakkarai,
    href: "#shop",
  },
  {
    id: "herbal",
    name: "Herbal Powders",
    note: "Pirandai, moringa, uluthu & wellness mixes",
    count: "8 blends",
    image: sukku,
    href: "#shop",
  },
  {
    id: "pantry",
    name: "Ghee & Pantry",
    note: "Cultured ghee, salt, kudampuli & figs",
    count: "5 staples",
    image: karupatti,
    href: "#shop",
  },
];

export const products: Product[] = [
  // ─── HONEY ────────────────────────────────────────────────────────────────
  {
    id: "wild-forest-honey",
    name: "Wild Forest Honey",
    tamil: "Kattu Thēn",
    category: "honey",
    tag: "Bestseller",
    blurb:
      "Deep resinous amber from forest-edge colonies near Pachamalai — thick, warm and unprocessed.",
    variants: [
      { size: "250g", price: 289 },
      { size: "500g", price: 499 },
      { size: "1kg", price: 899 },
    ],
    image: wildHoney,
    contactOnly: true,
  },
  {
    id: "moringa-blossom-honey",
    name: "Moringa Blossom Honey",
    tamil: "Murungai Poo Thēn",
    category: "honey",
    tag: "From our grove",
    blurb:
      "Light and floral, gathered when the murungai trees flower after the first mists of the year.",
    variants: [
      { size: "250g", price: 319 },
      { size: "500g", price: 549 },
      { size: "1kg", price: 999 },
    ],
    image: deltaHoney,
    contactOnly: true,
  },
  {
    id: "multiflora-hill-honey",
    name: "Multiflora Hill Honey",
    tamil: "Hillside Multiflora",
    category: "honey",
    blurb:
      "Bright, seasonal and ever-changing — the taste of wild hill blossoms in every batch.",
    variants: [
      { size: "250g", price: 269 },
      { size: "500g", price: 459 },
      { size: "1kg", price: 829 },
    ],
    image: heroImg,
    contactOnly: true,
  },
  {
    id: "horn-honey",
    name: "Horn Honey",
    tamil: "Seng Kombu Forage",
    category: "honey",
    tag: "Rare",
    blurb:
      "A deep, caramel-toned honey harvested from a scarce forest bloom — strong, lasting sweetness.",
    // MRP: ₹1500 / 1kg → 250g = 375, 500g = 750
    variants: [
      { size: "250g", price: 375 },
      { size: "500g", price: 750 },
      { size: "1kg", price: 1500 },
    ],
    image: hornHoneyImg,
  },
  {
    id: "mountain-honey",
    name: "Mountain Honey",
    tamil: "Mālei Thēn",
    category: "honey",
    blurb:
      "High-altitude forage from the cool ridges above the delta — crisp, aromatic and naturally clear.",
    // MRP: ₹1600 / 1kg → 250g = 400, 500g = 800
    variants: [
      { size: "250g", price: 400 },
      { size: "500g", price: 800 },
      { size: "1kg", price: 1600 },
    ],
    image: deltaHoney,
  },
  {
    id: "honey-comb-honey",
    name: "Honey Comb Honey",
    tamil: "Kombil Thēn",
    category: "honey",
    tag: "Bite-the-comb",
    blurb:
      "Honey served in its own comb — wax, pollen and all. Chew it like the farmers do.",
    // MRP: ₹1200 / 1kg → 250g = 300, 500g = 600
    variants: [
      { size: "250g", price: 300 },
      { size: "500g", price: 600 },
      { size: "1kg", price: 1200 },
    ],
    image: wildHoney,
  },
  {
    id: "neem-flower-honey",
    name: "Neem Flower Honey",
    tamil: "Veppam Poo Thēn",
    category: "honey",
    blurb:
      "Bittersweet and medicinal — neem blossom honey prized in Tamil households for generations.",
    // MRP: ₹1600 / 1kg → 250g = 400, 500g = 800
    variants: [
      { size: "250g", price: 400 },
      { size: "500g", price: 800 },
      { size: "1kg", price: 1600 },
    ],
    image: sukku,
  },
  {
    id: "wild-drumstick-honey",
    name: "Wild Drumstick Honey",
    tamil: "Kattu Murungai Thēn",
    category: "honey",
    tag: "Wild",
    blurb:
      "From untamed drumstick trees at the field edges — greener, sharper and deeply aromatic.",
    // MRP: ₹2200 / 1kg → 250g = 550, 500g = 1100
    variants: [
      { size: "250g", price: 550 },
      { size: "500g", price: 1100 },
      { size: "1kg", price: 2200 },
    ],
    image: karupatti,
  },
  {
    id: "country-drumstick-honey",
    name: "Country Drumstick Honey",
    tamil: "Náttu Murungai Thēn",
    category: "honey",
    tag: "Farmer's favourite",
    blurb:
      "From tended village groves — richer, rounder and a little sweeter than its wild cousin.",
    // MRP: ₹2300 / 1kg → 250g = 575, 500g = 1150
    variants: [
      { size: "250g", price: 575 },
      { size: "500g", price: 1150 },
      { size: "1kg", price: 2300 },
    ],
    image: wildHoney,
  },
  {
    id: "kurinji-honey",
    name: "Kurinji Honey",
    tamil: "Kurinji Malai Thēn",
    category: "honey",
    tag: "Once in 12 years",
    blurb:
      "Our rarest jar — Neelakurinji mountain honey gathered only when the hills bloom violet.",
    // MRP: ₹5000 / 1kg → 250g = 1250, 500g = 2500
    variants: [
      { size: "250g", price: 1250 },
      { size: "500g", price: 2500 },
      { size: "1kg", price: 5000 },
    ],
    image: deltaHoney,
  },
  {
    id: "honey-soaked-figs",
    name: "Honey Soaked Figs",
    tamil: "Thēn Anjuram",
    category: "honey",
    blurb:
      "Sun-dried country figs steeped slowly in raw forest honey — spoon-ready dessert and tonic.",
    // MRP: ₹1200 / 1kg → 300g = 360, 600g = 720
    variants: [
      { size: "300g", price: 360 },
      { size: "600g", price: 720 },
      { size: "1kg", price: 1200 },
    ],
    image: infusionsArt,
  },
  {
    id: "honey-amla",
    name: "Honey Amla",
    tamil: "Thēn Nellikkai",
    category: "honey",
    blurb:
      "Tart green amla candied in honey — sharp at first bite, sweet by the third chew.",
    variants: [
      { size: "300g", price: 399 },
      { size: "600g", price: 699 },
    ],
    image: infusionsArt,
    contactOnly: true,
  },
  {
    id: "honey-ginger",
    name: "Honey Ginger",
    tamil: "Thēn Inguru",
    category: "honey",
    blurb:
      "Young ginger coins steeped in warm honey — the jar we reach for on cold evenings.",
    variants: [
      { size: "300g", price: 379 },
      { size: "600g", price: 669 },
    ],
    image: sukku,
    contactOnly: true,
  },
  {
    id: "honey-garlic",
    name: "Honey Garlic",
    tamil: "Thēn Poondu",
    category: "honey",
    blurb:
      "Raw garlic cloves mellowed in honey until mellow-sweet — daily dose of strength.",
    variants: [
      { size: "300g", price: 359 },
      { size: "600g", price: 629 },
    ],
    image: infusionsArt,
    contactOnly: true,
  },

  // ─── MALTS ────────────────────────────────────────────────────────────────
  {
    id: "sprouted-ragi-malt",
    name: "Sprouted Ragi Malt",
    tamil: "Kail Kezhvaragu Malt",
    category: "malts",
    tag: "Kids & elders",
    blurb:
      "Ragi sprouted in the shade, sun-dried and stone-ground into a creamy bedtime malt.",
    variants: [
      { size: "250g", price: 249 },
      { size: "500g", price: 449 },
    ],
    image: milletMalt,
    contactOnly: true,
  },
  {
    id: "abc-malt",
    name: "ABC Malt",
    tamil: "A B C Māvu",
    category: "malts",
    blurb:
      "The three-grain classic — a balanced everyday malt for breakfast porridge and smoothies.",
    variants: [
      { size: "250g", price: 269 },
      { size: "500g", price: 479 },
    ],
    image: maltArt,
    contactOnly: true,
  },
  {
    id: "chathu-powder",
    name: "Chathu Powder",
    tamil: "Sathu Māvu",
    category: "malts",
    tag: "18 grains",
    blurb:
      "Our signature health malt — millets, pulses and nuts sprouted and ground every Sunday.",
    variants: [
      { size: "500g", price: 399 },
      { size: "1kg", price: 749 },
    ],
    image: milletMalt,
    contactOnly: true,
  },
  {
    id: "jaggery-chathu-powder",
    name: "Jaggery Chathu Powder",
    tamil: "Vellam Sathu Māvu",
    category: "malts",
    blurb:
      "Multigrain malt pre-mixed with palm jaggery — just add hot milk and stir.",
    variants: [
      { size: "500g", price: 429 },
      { size: "1kg", price: 799 },
    ],
    image: maltArt,
    contactOnly: true,
  },
  {
    id: "aayam-chathu-powder",
    name: "Aayam Chathu Powder",
    tamil: "Aayam Māvu",
    category: "malts",
    blurb:
      "A hearty rustic grind with extra millets and seeds — filling, earthy and wholesome.",
    variants: [
      { size: "500g", price: 459 },
      { size: "1kg", price: 849 },
    ],
    image: milletMalt,
    contactOnly: true,
  },
  {
    id: "small-grains-sampler",
    name: "Small Grains Sampler",
    tamil: "Sitru Thāniyam Box",
    category: "malts",
    tag: "Try all 5",
    blurb:
      "Five of our millets in one box — foxtail, little, kodo, barnyard and browntop.",
    variants: [
      { size: "5 × 200g", price: 549 },
      { size: "5 × 400g", price: 999 },
    ],
    image: maltArt,
    contactOnly: true,
  },

  // ─── HERBAL ───────────────────────────────────────────────────────────────
  {
    id: "pirandai-powder",
    name: "Pirandai Powder",
    tamil: "Pirandai",
    category: "herbal",
    blurb:
      "Adamant creeper powder for joints and digestion — the traditional medicine shelf staple.",
    variants: [
      { size: "100g", price: 199 },
      { size: "250g", price: 449 },
    ],
    image: sukku,
    contactOnly: true,
  },
  {
    id: "fenugreek-powder",
    name: "Fenugreek Powder",
    tamil: "Vendhayam",
    category: "herbal",
    blurb:
      "Slow-roasted fenugreek ground fine — for koozh, hair packs and everyday gut comfort.",
    variants: [
      { size: "100g", price: 149 },
      { size: "250g", price: 299 },
    ],
    image: milletMalt,
    contactOnly: true,
  },
  {
    id: "uluthu-kanchi-powder",
    name: "Uluthu Kanchi Powder",
    tamil: "Ulundhu Kanji",
    category: "herbal",
    tag: "Post-delivery classic",
    blurb:
      "Black urad kanji mix — the strengthening porridge every Tamil grandmother swears by.",
    variants: [
      { size: "250g", price: 329 },
      { size: "500g", price: 599 },
    ],
    image: maltArt,
    contactOnly: true,
  },
  {
    id: "drumstick-leaf-powder",
    name: "Drumstick Leaf Powder",
    tamil: "Murungai Ilai",
    category: "herbal",
    blurb:
      "Shade-dried moringa leaves milled into a vivid green powder — iron, calcium, clarity.",
    variants: [
      { size: "100g", price: 189 },
      { size: "250g", price: 399 },
    ],
    image: sukku,
    contactOnly: true,
  },
  {
    id: "dry-ginger-powder",
    name: "Dry Ginger Powder",
    tamil: "Sukku Thool",
    category: "herbal",
    blurb:
      "Sun-dried ginger ground warm and fragrant — the base for sukku kaapi and chukku kashayam.",
    variants: [
      { size: "100g", price: 169 },
      { size: "250g", price: 349 },
    ],
    image: karupatti,
    contactOnly: true,
  },
  {
    id: "biotin-boost-powder",
    name: "Biotin Boost Powder",
    tamil: "Mudi Valarchi Mix",
    category: "herbal",
    blurb:
      "A hair-and-skin blend of curry leaf, amla and seeds — stirred into curd or warm water.",
    variants: [
      { size: "250g", price: 449 },
      { size: "500g", price: 799 },
    ],
    image: milletMalt,
    contactOnly: true,
  },
  {
    id: "plant-protein-mix",
    name: "Plant Protein Mix",
    tamil: "Sedhi Protein",
    category: "herbal",
    blurb:
      "Sprouted dals, millets and seeds combined into a clean, unsweetened protein base.",
    variants: [
      { size: "250g", price: 499 },
      { size: "500g", price: 899 },
    ],
    image: maltArt,
    contactOnly: true,
  },
  {
    id: "weight-balance-powder",
    name: "Weight Balance Powder",
    tamil: "Edai Saman Mix",
    category: "herbal",
    blurb:
      "Fibre-rich grains and herbs blended to keep you full longer — the sensible way.",
    variants: [
      { size: "250g", price: 479 },
      { size: "500g", price: 849 },
    ],
    image: milletMalt,
    contactOnly: true,
  },

  // ─── SWEETENERS ───────────────────────────────────────────────────────────
  {
    id: "palm-jaggery",
    name: "Palm Jaggery / Karupatti",
    tamil: "Panang Karupatti",
    category: "sweeteners",
    tag: "Wood-fired",
    blurb:
      "Palmyra sap slow-stirred in iron pans — caramel, smoke and minerals in every bite.",
    // MRP: ₹500 / 1kg → 250g = 125, 500g = 250
    variants: [
      { size: "250g", price: 125 },
      { size: "500g", price: 250 },
      { size: "1kg", price: 500 },
    ],
    image: karupatti,
  },
  {
    id: "jaggery",
    name: "Jaggery",
    tamil: "Vellam",
    category: "sweeteners",
    blurb:
      "Golden cane jaggery cubed and crushed — the everyday sweetener for coffee and payasam.",
    variants: [
      { size: "250g", price: 129 },
      { size: "500g", price: 229 },
      { size: "1kg", price: 429 },
    ],
    image: sakkarai,
    contactOnly: true,
  },
  {
    id: "nattu-sarkarai",
    name: "Nattu Sarkarai",
    tamil: "Nāttu Sakkarai",
    category: "sweeteners",
    tag: "Everyday",
    blurb:
      "Unrefined country cane sugar from the delta's own cane belts — unbleached and crunchy.",
    variants: [
      { size: "500g", price: 189 },
      { size: "1kg", price: 349 },
      { size: "2kg", price: 649 },
    ],
    image: sakkarai,
    contactOnly: true,
  },
  {
    id: "palm-sugar-candy",
    name: "Palm Sugar Candy",
    tamil: "Panam Kalkandu",
    category: "sweeteners",
    blurb:
      "Crystallised palmyra candy — mild, throat-soothing and perfect in warm milk.",
    variants: [
      { size: "250g", price: 249 },
      { size: "500g", price: 459 },
    ],
    image: infusionsArt,
    contactOnly: true,
  },
  {
    id: "rose-gulkand",
    name: "Rose Gulkand",
    tamil: "Roja Gulgand",
    category: "sweeteners",
    tag: "Cooling",
    blurb:
      "Slow-set rose petal preserve in honey — a spoonful on hot afternoons feels like shade.",
    // MRP: ₹700 → 250g = 350, 400g = 560 (approx)
    variants: [
      { size: "250g", price: 350 },
      { size: "400g", price: 560 },
      { size: "700g", price: 700 },
    ],
    image: infusionsArt,
  },
  {
    id: "nannari-sharbath",
    name: "Nannari Sharbath",
    tamil: "Nannari Sarbathu",
    category: "sweeteners",
    blurb:
      "Sarsaparilla root syrup for the legendary summer sharbath — with a squeeze of lime, perfection.",
    variants: [
      { size: "500ml", price: 449 },
      { size: "750ml", price: 599 },
    ],
    image: nannariSharbathImg,
    contactOnly: true,
  },

  // ─── GHEE & PANTRY ────────────────────────────────────────────────────────
  {
    id: "cultured-ghee",
    name: "Cultured Ghee",
    tamil: "Kuvai Nei",
    category: "pantry",
    tag: "Slow-churned",
    blurb:
      "Butter cultured overnight, then simmered copper-pot slow — nutty, golden, perfume of the kitchen.",
    variants: [
      { size: "250ml", price: 499 },
      { size: "500ml", price: 899 },
      { size: "1L", price: 1699 },
    ],
    image: culturedGheeImg,
    contactOnly: true,
  },
  {
    id: "himalayan-pink-salt",
    name: "Himalayan Pink Salt",
    tamil: "Rose Uppu",
    category: "pantry",
    blurb:
      "Mineral-rich pink rock salt, finely ground for the pantry or coarse for the grinder.",
    variants: [
      { size: "500g", price: 149 },
      { size: "1kg", price: 279 },
    ],
    image: himalayanSaltImg,
    contactOnly: true,
  },
  {
    id: "kudampuli",
    name: "Kudampuli",
    tamil: "Kodumpuli",
    category: "pantry",
    tag: "Fish curry essential",
    blurb:
      "Smoked garcinia pods — the sour soul of every fish kuzhambu along the Cauvery.",
    // MRP: ₹450 / 1kg → 200g = 90, 500g = 225
    variants: [
      { size: "200g", price: 90 },
      { size: "500g", price: 225 },
      { size: "1kg", price: 450 },
    ],
    image: kudampuliImg,
  },
  {
    id: "country-dried-figs",
    name: "Country Dried Figs",
    tamil: "Kattu Anjuram",
    category: "pantry",
    blurb:
      "Chewy, seed-studded country figs dried in open sunlight — snack, bake or steep in honey.",
    // MRP: ₹1200 / 1kg → 250g = 300, 500g = 600
    variants: [
      { size: "250g", price: 300 },
      { size: "500g", price: 600 },
      { size: "1kg", price: 1200 },
    ],
    image: infusionsArt,
  },
  {
    id: "pure-cow-ghee",
    name: "Pure Cow Ghee",
    tamil: "Pasu Nei",
    category: "pantry",
    tag: "Farm churned",
    blurb:
      "Fresh cream churned daily from our own herd — light, fragrant and absolutely pure.",
    // MRP: ₹600 / 1kg → 250g = 150, 500g = 300
    variants: [
      { size: "250g", price: 150 },
      { size: "500g", price: 300 },
      { size: "1kg", price: 600 },
    ],
    image: pureCowGheeImg,
  },
];

export const featuredIds = [
  "wild-forest-honey",
  "moringa-blossom-honey",
  "sprouted-ragi-malt",
  "uluthu-kanchi-powder",
  "palm-jaggery",
  "cultured-ghee",
];

export const featuredProducts = featuredIds.map(
  (id) => products.find((p) => p.id === id)!
);

export interface CategoryFilter {
  id: "all" | CategoryId;
  label: string;
}

export const categoryFilters: CategoryFilter[] = [
  { id: "all", label: "All" },
  { id: "honey", label: "Honey" },
  { id: "malts", label: "Malts" },
  { id: "herbal", label: "Herbal" },
  { id: "sweeteners", label: "Sweeteners" },
  { id: "pantry", label: "Ghee & Pantry" },
];

export const categoryName: Record<CategoryId, string> = {
  honey: "Raw Honey",
  malts: "Health Malts",
  herbal: "Herbal Powders",
  sweeteners: "Traditional Sweeteners",
  pantry: "Ghee & Pantry",
};

export const getProduct = (id: string) =>
  products.find((p) => p.id === id);

export const getRelated = (product: Product, count = 4) =>
  products
    .filter((p) => p.id !== product.id)
    .sort((a, b) =>
      a.category === product.category && b.category !== product.category
        ? -1
        : b.category === product.category && a.category !== product.category
          ? 1
          : 0
    )
    .slice(0, count);

// ─── WhatsApp message builders ───────────────────────────────────────────────

export function waProductMessage(
  name: string,
  size: string,
  qty: number
): string {
  const product = products.find((p) => p.name === name);
  const variant = product?.variants.find((v) => v.size === size);
  const unit = variant?.price ?? 0;
  const lineTotal = unit * qty;
  return waLink(
    [
      "Vanakkam AUDATHAM! I'd like to order:",
      "",
      name,
      `${size} × ${qty}`,
      formatINR(lineTotal),
      "",
      "Name:",
      "Address:",
    ].join("\n")
  );
}

export function waContactMessage(productName: string): string {
  return waLink(
    `Vanakkam AUDATHAM! I'd like to know the price for: ${productName}\n\nName:\nAddress:`
  );
}

export interface CartMessageLine {
  name: string;
  size: string;
  qty: number;
  lineTotal: number;
}

export function waCartMessage(
  lines: CartMessageLine[],
  total: number,
  customer?: { name?: string; phone?: string; address?: string }
): string {
  const body = [
    "Vanakkam AUDATHAM! I'd like to order:",
    "",
    ...lines.map(
      (l) => `${l.name} — ${l.size} × ${l.qty} — ${formatINR(l.lineTotal)}`
    ),
    "",
    `Total: ${formatINR(total)}`,
    "",
    `Name:${customer?.name ? " " + customer.name : ""}`,
    `Phone:${customer?.phone ? " " + customer.phone : ""}`,
    `Address:${customer?.address ? " " + customer.address : ""}`,
  ].join("\n");
  return waLink(body);
}
