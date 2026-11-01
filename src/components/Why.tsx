import { Droplets, HandHeart, MapPin, ShieldCheck } from "lucide-react";
import { Reveal, SectionHead } from "./Reveal";

const pillars = [
  {
    icon: Droplets,
    title: "Raw & unfiltered",
    text: "Honey, malts and powders made cold and slow — never heated, never blended. The living enzymes, pollen and aroma stay exactly where nature put them.",
  },
  {
    icon: MapPin,
    title: "One farm, many lands",
    text: "From our 12 acres along the Cauvery belt plus wild forage from the hills — Kurinji, drumstick, neem and palmyra groves across Tamil Nadu.",
  },
  {
    icon: HandHeart,
    title: "Gathered, not factory-made",
    text: "Sprouted in shade, stone-ground on Sundays, stirred in iron pans over wood fire. Everything is made by hand, in small weekly batches.",
  },
  {
    icon: ShieldCheck,
    title: "Named, numbered, honest",
    text: "Every batch carries a number, a source and a date. What you taste can always be traced back to one field, one tree or one hive box.",
  },
];

export default function Why() {
  return (
    <section className="relative scroll-mt-24 py-20 md:py-28" id="why">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(rgba(97,74,51,0.06) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHead
          eyebrow="Why Audatham"
          title={
            <>
              Farm food the way our{" "}
              <em className="text-honey-600">grandparents</em> knew it.
            </>
          }
          sub="No syrups, no shortcuts, no mystery supply chains. Honey, sprouted malts, herbal powders, karupatti and ghee — all from one delta farm."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar, i) => (
            <Reveal key={pillar.title} delay={i * 110}>
              <div className="group relative h-full overflow-hidden rounded-[1.75rem] border border-bark-900/10 bg-cream-50 p-7 transition-all duration-500 hover:-translate-y-2 hover:border-honey-500/40 hover:shadow-[0_30px_50px_-25px_rgba(97,74,51,0.35)]">
                <span className="absolute top-5 right-6 font-display text-4xl font-medium italic text-cream-200 transition-colors duration-500 group-hover:text-honey-200">
                  0{i + 1}
                </span>
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-forest-800 text-honey-300 shadow-md shadow-forest-900/25 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
                  <pillar.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-6 font-display text-xl font-semibold text-forest-900">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-bark-500">
                  {pillar.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
