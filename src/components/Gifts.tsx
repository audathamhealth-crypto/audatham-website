import { Gift, MessageCircle, PenLine, Truck } from "lucide-react";
import { Reveal } from "./Reveal";
import { images, waLink } from "../data/products";

const features = [
  {
    icon: Gift,
    title: "Hand-packed cane baskets",
    text: "Lined with unbleached cotton, cushioned with straw — no plastic, ever.",
  },
  {
    icon: PenLine,
    title: "Personal name cards",
    text: "Handwritten in Tamil and English, tied on with jute twine.",
  },
  {
    icon: Truck,
    title: "Ships across India",
    text: "3–5 day delivery with a breakage-free promise on every jar.",
  },
];

const hampers = [
  {
    name: "The Duo",
    desc: "Wild forest honey + panang karupatti in a kraft cradle",
    price: "₹899",
  },
  {
    name: "The Wellness Crate",
    desc: "Honey, sathu maavu, pirandai powder & herbal mixes",
    price: "₹1,199",
  },
  {
    name: "Wedding & Corporate Crates",
    desc: "20 boxes and up, with custom labels and cards",
    price: "Custom",
  },
];

export default function Gifts() {
  return (
    <section
      id="gifts"
      className="relative scroll-mt-24 overflow-hidden bg-cream-200/50 py-20 md:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(rgba(97,74,51,0.05) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:px-8">
        {/* Copy */}
        <div className="order-2 max-w-xl lg:order-1">
          <Reveal>
            <p className="flex items-center gap-3 text-[11px] font-extrabold uppercase tracking-[0.35em] text-honey-600">
              <span className="h-px w-8 bg-honey-500/50" />
              Gifts & Hampers
            </p>
          </Reveal>
          <Reveal delay={120}>
            <h2 className="mt-5 font-display text-4xl leading-[1.06] font-medium tracking-tight text-forest-900 sm:text-5xl">
              Give someone a jar of the{" "}
              <em className="text-honey-600">countryside</em>.
            </h2>
          </Reveal>
          <Reveal delay={220}>
            <p className="mt-6 leading-relaxed text-bark-500">
              For weddings, housewarmings, Diwali and Pongal — or just because
              someone's far from home. Every hamper leaves the farm packed the
              way we'd pack it for our own family.
            </p>
          </Reveal>

          <Reveal delay={320}>
            <ul className="mt-8 space-y-5">
              {features.map((f) => (
                <li key={f.title} className="flex gap-4">
                  <span className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-forest-800 text-honey-300">
                    <f.icon className="h-[18px] w-[18px]" />
                  </span>
                  <div>
                    <p className="text-sm font-extrabold tracking-wide text-forest-900">
                      {f.title}
                    </p>
                    <p className="mt-0.5 text-sm text-bark-500">{f.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={420}>
            <div className="mt-9 rounded-[1.5rem] border border-bark-900/10 bg-cream-50 p-6">
              {hampers.map((h, i) => (
                <div
                  key={h.name}
                  className={`flex items-center justify-between gap-4 py-3.5 ${
                    i !== hampers.length - 1
                      ? "border-b border-bark-900/10"
                      : ""
                  }`}
                >
                  <div>
                    <p className="font-display text-lg font-semibold text-forest-900">
                      {h.name}
                    </p>
                    <p className="text-xs text-bark-500">{h.desc}</p>
                  </div>
                  <span className="shrink-0 rounded-full bg-honey-300/20 px-3.5 py-1.5 text-xs font-extrabold tracking-wide text-honey-700">
                    {h.price}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={500}>
            <a
              href={waLink(
                "Vanakkam AUDATHAM! I'd like to build a custom gift hamper — here are the occasion and budget:"
              )}
              target="_blank"
              rel="noreferrer"
              className="group mt-7 inline-flex items-center justify-center gap-3 rounded-full bg-forest-800 px-7 py-4 text-[11px] font-extrabold uppercase tracking-[0.2em] text-cream-50 shadow-[0_22px_45px_-18px_rgba(23,41,30,0.55)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-forest-900"
            >
              <MessageCircle className="h-4 w-4 text-honey-300" />
              Build a hamper on WhatsApp
            </a>
          </Reveal>
        </div>

        {/* Visual */}
        <Reveal className="order-1 lg:order-2" delay={150}>
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div
              aria-hidden
              className="absolute -inset-3 rounded-[2.75rem] border border-honey-500/30 md:-inset-4"
            />
            <div className="relative overflow-hidden rounded-[2.5rem] shadow-[0_45px_80px_-35px_rgba(34,26,16,0.5)]">
              <img
                src={images.hamper}
                alt="AUDATHAM gift hamper — cane basket with jars of honey, malt and palm jaggery"
                className="aspect-square w-full object-cover transition-transform duration-[1600ms] ease-out hover:scale-105"
              />
            </div>
            <span className="absolute top-6 left-6 rounded-full bg-forest-800 px-4 py-2 text-[10px] font-extrabold uppercase tracking-[0.24em] text-honey-200 shadow-lg">
              New · Pongal Edit
            </span>
            <div className="absolute -bottom-5 right-6 animate-floaty rounded-2xl border border-bark-900/10 bg-cream-50 px-5 py-3 shadow-xl">
              <p className="text-[9px] font-extrabold uppercase tracking-[0.24em] text-bark-500">
                Hampers from
              </p>
              <p className="font-display text-xl font-semibold text-forest-900">
                ₹899
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
