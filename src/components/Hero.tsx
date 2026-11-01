import { Link } from "react-router-dom";
import { ArrowDown, Hexagon, MessageCircle } from "lucide-react";
import { Reveal } from "./Reveal";
import { images, products, waLink, formatINR } from "../data/products";

const stats: Array<[string, string]> = [
  ["1984", "first harvest"],
  ["14", "honey varieties"],
  ["38", "farm products"],
];

export default function Hero() {
  const feat = products[0];
  const v = feat.variants[1];

  return (
    <section id="top" className="relative overflow-hidden">
      {/* soft ambience */}
      <div className="pointer-events-none absolute -top-28 -right-24 h-[26rem] w-[26rem] rounded-full bg-honey-300/25 blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 -left-40 h-[22rem] w-[22rem] rounded-full bg-forest-600/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 pt-28 pb-16 sm:px-6 md:pt-36 lg:grid-cols-2 lg:gap-10 lg:px-8 lg:pb-24">
        {/* Copy */}
        <div className="max-w-xl">
          <Reveal>
            <span className="inline-flex items-center gap-2.5 rounded-full border border-honey-500/40 bg-honey-300/15 px-4 py-2 text-[10.5px] font-extrabold uppercase tracking-[0.24em] text-honey-700">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-honey-500 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-honey-600" />
              </span>
              Batch #39 · Bottled this week
            </span>
          </Reveal>

          <Reveal delay={120}>
            <h1 className="mt-7 font-display text-[2.85rem] leading-[1.04] font-medium tracking-tight text-forest-900 sm:text-6xl lg:text-[4.35rem]">
              A taste of the{" "}
              <span className="whitespace-nowrap italic text-honey-600">
                Tamil countryside
              </span>
              .
            </h1>
          </Reveal>

          <Reveal delay={240}>
            <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-bark-500 sm:text-base">
              From Tamil soil, with care — raw harvests from our family farm
              in the Cauvery delta, Tamil Nadu: honey, malts, herbal powders
              and traditional sweeteners, gathered with respect and bottled
              slowly since 1984.
            </p>
          </Reveal>

          <Reveal delay={360}>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                to="/shop"
                className="group inline-flex items-center justify-center gap-3 rounded-full bg-forest-800 px-7 py-4 text-[11px] font-extrabold uppercase tracking-[0.22em] text-cream-50 shadow-[0_22px_45px_-18px_rgba(23,41,30,0.55)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-forest-900"
              >
                Explore the collection
                <ArrowDown className="h-4 w-4 text-honey-300 transition-transform duration-300 group-hover:translate-y-0.5" />
              </Link>
              <a
                href={waLink(
                  "Vanakkam AUDATHAM! I'd like to order Batch #39 — please share today's availability."
                )}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center justify-center gap-3 rounded-full border border-forest-800/25 px-7 py-4 text-[11px] font-extrabold uppercase tracking-[0.22em] text-forest-800 transition-all duration-300 hover:-translate-y-0.5 hover:border-forest-800/50 hover:bg-forest-800/5"
              >
                <MessageCircle className="h-4 w-4 text-forest-600" />
                Order on WhatsApp
              </a>
            </div>
          </Reveal>

          <Reveal delay={480}>
            <dl className="mt-12 flex items-start gap-8 border-t border-bark-900/10 pt-7 sm:gap-12">
              {stats.map(([value, label]) => (
                <div key={label}>
                  <dt className="sr-only">{label}</dt>
                  <dd className="font-display text-3xl font-medium text-forest-900">
                    {value}
                  </dd>
                  <dd className="mt-1 text-[10px] font-bold uppercase tracking-[0.22em] text-bark-500">
                    {label}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        {/* Visual */}
        <Reveal delay={200} y={40} className="relative">
          <div className="relative mx-auto w-full max-w-sm sm:max-w-md lg:max-w-lg">
            <div
              aria-hidden
              className="absolute -inset-4 rounded-t-full rounded-b-[2.5rem] border border-honey-500/30 md:-inset-6"
            />
            <div className="group relative aspect-[4/5] overflow-hidden rounded-t-full rounded-b-[2rem] border-[10px] border-cream-50 shadow-[0_45px_80px_-30px_rgba(34,26,16,0.45)]">
              <img
                src={images.hero}
                alt="Jar of golden honey with a wooden dipper on a farm table in the Cauvery delta"
                className="h-full w-full scale-105 object-cover transition-transform duration-[2200ms] ease-out group-hover:scale-[1.12]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-950/25 via-transparent to-transparent" />
            </div>

            {/* Floating batch card */}
            <Link
              to={`/product/${feat.id}`}
              className="absolute -left-3 bottom-10 z-10 animate-floaty transition-transform hover:scale-[1.03] sm:-left-8"
              aria-label={`View ${feat.name}`}
            >
              <div className="flex items-center gap-3 rounded-2xl border border-bark-900/10 bg-cream-50/95 p-3 pr-5 shadow-xl shadow-bark-900/15 backdrop-blur">
                <img
                  src={feat.image}
                  alt={feat.name}
                  className="h-12 w-12 rounded-xl object-cover"
                />
                <div>
                  <p className="text-[9px] font-extrabold uppercase tracking-[0.24em] text-honey-600">
                    Batch #39
                  </p>
                  <p className="font-display text-sm font-semibold text-forest-900">
                    {feat.name}
                  </p>
                  <p className="text-[11px] font-semibold text-bark-500">
                    From {formatINR(v.price)} · {v.size}
                  </p>
                </div>
              </div>
            </Link>

            {/* Rotating stamp */}
            <div className="absolute -top-4 right-0 z-10 md:-right-4 md:-top-6">
              <div className="relative h-24 w-24 animate-spin-slow text-forest-800 md:h-28 md:w-28">
                <svg viewBox="0 0 100 100" className="h-full w-full">
                  <defs>
                    <path
                      id="stampCircle"
                      d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                    />
                  </defs>
                  <text
                    className="fill-current"
                    style={{
                      fontSize: "8px",
                      letterSpacing: "2.4px",
                      fontWeight: 800,
                      textTransform: "uppercase",
                    }}
                  >
                    <textPath href="#stampCircle">
                      Raw · Batch #39 · Since 1984 ·
                    </textPath>
                  </text>
                </svg>
              </div>
              <div className="absolute inset-0 grid place-items-center">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-honey-400 shadow-md shadow-honey-600/40">
                  <Hexagon className="h-4 w-4 fill-forest-900 text-forest-900" />
                </span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
