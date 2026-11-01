import { Droplets, Flame, Sprout } from "lucide-react";
import { Reveal } from "./Reveal";

const notes = [
  {
    icon: Sprout,
    text: "12 organic acres of Tamil countryside, beside the delta canals",
  },
  {
    icon: Flame,
    text: "Karupatti slow-cooked over wood fire in cast-iron pans",
  },
  {
    icon: Droplets,
    text: "Ghee cultured overnight, honey cold-extracted weekly",
  },
];

export default function Story() {
  return (
    <section id="story" className="relative scroll-mt-24 overflow-hidden py-20 md:py-28">
      <div className="pointer-events-none absolute top-24 -left-32 h-96 w-96 rounded-full bg-honey-300/20 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-8">
        {/* Collage */}
        <Reveal className="relative mx-auto w-full max-w-lg">
          <div className="relative aspect-[4/4.6] overflow-hidden rounded-[2.5rem] shadow-[0_40px_70px_-30px_rgba(34,26,16,0.4)]">
            <img
              src="https://images.pexels.com/photos/32954692/pexels-photo-32954692.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200"
              alt="Farmer tending rice seedlings in the golden evening light of the delta"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest-950/20 to-transparent" />
          </div>

          <div className="absolute -right-3 -bottom-8 w-40 rotate-3 overflow-hidden rounded-2xl border-8 border-cream-50 shadow-xl transition-transform duration-700 hover:rotate-0 sm:w-48 md:-right-8">
            <img
              src="https://images.pexels.com/photos/17034795/pexels-photo-17034795.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200"
              alt="Farmer carrying a harvest basket through the paddy"
              className="aspect-[4/5] h-full w-full object-cover"
            />
          </div>

          <div className="absolute -top-5 -left-3 grid h-24 w-24 animate-floaty place-items-center rounded-full bg-forest-800 text-center shadow-lg shadow-forest-900/30 md:-left-8 md:h-28 md:w-28">
            <div>
              <p className="text-[8.5px] font-extrabold uppercase tracking-[0.28em] text-honey-300">
                Est.
              </p>
              <p className="font-display text-2xl font-semibold text-cream-50">
                1984
              </p>
              <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-cream-100/60">
                Thiruvaiyaru
              </p>
            </div>
          </div>
        </Reveal>

        {/* Copy */}
        <div className="max-w-xl">
          <Reveal>
            <p className="flex items-center gap-3 text-[11px] font-extrabold uppercase tracking-[0.35em] text-honey-600">
              <span className="h-px w-8 bg-honey-500/50" />
              Our Story
            </p>
          </Reveal>
          <Reveal delay={120}>
            <h2 className="mt-5 font-display text-4xl leading-[1.06] font-medium tracking-tight text-forest-900 sm:text-5xl">
              One family, one delta,{" "}
              <em className="text-honey-600">forty monsoons</em> of farm food.
            </h2>
          </Reveal>
          <Reveal delay={240}>
            <p className="mt-6 leading-relaxed text-bark-500">
              In 1984, our grandfather kept his first colonies in the moringa
              grove behind the paddy fields, selling jars from a cycle basket
              at the Thiruvaiyaru market. He believed honey should taste like
              the place it came from — and that bees, like guests, are fed
              first.
            </p>
          </Reveal>
          <Reveal delay={330}>
            <p className="mt-4 leading-relaxed text-bark-500">
              Three generations on, AUDATHAM is still that same farm — but the
              shelf has grown. The paddy feeds the family, the groves feed the
              bees, and together with our millet terraces, medicinal creepers,
              the palmyra trees and the family's own herd, they now fill every
              jar, hamper, packet and bottle you see here.
            </p>
          </Reveal>

          <Reveal delay={420}>
            <ul className="mt-8 space-y-4">
              {notes.map((note) => (
                <li key={note.text} className="flex items-center gap-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-honey-300/20 text-honey-700">
                    <note.icon className="h-[18px] w-[18px]" />
                  </span>
                  <span className="text-sm font-medium text-bark-700">
                    {note.text}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={500}>
            <p className="mt-9 border-l-2 border-honey-400 pl-5 font-display text-xl italic text-forest-800">
              — The Audatham Family
              <span className="mt-1 block font-body text-xs font-bold uppercase not-italic tracking-[0.22em] text-bark-500">
                Cauvery Delta · Tamil Nadu
              </span>
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
