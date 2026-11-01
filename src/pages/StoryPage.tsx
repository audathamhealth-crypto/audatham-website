import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Story from "../components/Story";
import FieldToJar from "../components/FieldToJar";
import { Reveal } from "../components/Reveal";

const milestones = [
  {
    year: "1984",
    title: "The first colonies",
    text: "Our grandfather keeps his first bee boxes in the moringa grove and sells jars from a cycle basket at Thiruvaiyaru market.",
  },
  {
    year: "1997",
    title: "Millets return",
    text: "The family turns five paddy-side acres to ragi and small millets — and the first sathu maavu is stone-ground for neighbours.",
  },
  {
    year: "2009",
    title: "Karupatti pans",
    text: "Palmyra tappers from the canal belt start bringing their morning sap to the farm's wood-fired iron pans.",
  },
  {
    year: "2019",
    title: "The herd arrives",
    text: "Native-breed cows join the farm — and cultured ghee becomes the most requested jar after honey.",
  },
  {
    year: "Today",
    title: "Batch #39",
    text: "Every product still leaves in numbered weekly micro-batches — honey, malts, herbal powders, sweeteners and ghee alike.",
  },
];

export default function StoryPage() {
  return (
    <>
      <div className="mx-auto max-w-7xl px-4 pt-28 sm:px-6 md:pt-36 lg:px-8">
        <Reveal className="max-w-2xl">
          <p className="flex items-center gap-3 text-[11px] font-extrabold uppercase tracking-[0.35em] text-honey-600">
            <span className="h-px w-8 bg-honey-500/50" />
            Since 1984 · Thiruvaiyaru
          </p>
          <h1 className="mt-5 font-display text-4xl leading-[1.04] font-medium tracking-tight text-forest-900 sm:text-6xl">
            The story of a{" "}
            <em className="text-honey-600">stubborn little farm</em>.
          </h1>
          <p className="mt-5 leading-relaxed text-bark-500">
            AUDATHAM began as one man's refusal to rush honey. Forty years
            later it's a whole farmhouse pantry — run on the same refusal.
          </p>
        </Reveal>
      </div>

      <Story />

      {/* Timeline */}
      <section className="py-10 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="font-display text-3xl font-medium text-forest-900 sm:text-4xl">
              Milestones, not <em className="text-honey-600">marketing</em>.
            </h2>
          </Reveal>
          <div className="mt-10 space-y-0">
            {milestones.map((m, i) => (
              <Reveal key={m.year} delay={i * 80}>
                <div className="grid gap-2 border-t border-bark-900/10 py-7 sm:grid-cols-[140px_220px_1fr] sm:items-baseline sm:gap-8">
                  <p className="font-display text-3xl font-medium italic text-honey-600">
                    {m.year}
                  </p>
                  <h3 className="font-display text-xl font-semibold text-forest-900">
                    {m.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-bark-500">
                    {m.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={140}>
            <div className="mt-14 flex flex-col items-center justify-between gap-5 rounded-[2rem] bg-forest-900 px-8 py-10 text-center sm:flex-row sm:text-left md:px-12">
              <div>
                <h3 className="font-display text-2xl font-medium text-cream-50 sm:text-3xl">
                  Taste what the farm makes this week.
                </h3>
                <p className="mt-2 text-sm text-cream-100/60">
                  Batch #39 is bottling now — across honey, malts, powders,
                  sweeteners and ghee.
                </p>
              </div>
              <Link
                to="/shop"
                className="group inline-flex shrink-0 items-center gap-3 rounded-full bg-honey-400 px-7 py-4 text-[11px] font-extrabold uppercase tracking-[0.2em] text-forest-950 transition-all hover:-translate-y-0.5 hover:bg-honey-300"
              >
                Visit the shop
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <FieldToJar />
    </>
  );
}
