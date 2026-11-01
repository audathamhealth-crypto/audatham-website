import { MessageCircle } from "lucide-react";
import { Reveal } from "./Reveal";
import { images, waDefault, WHATSAPP_DISPLAY } from "../data/products";

export default function WhatsAppCTA() {
  return (
    <section className="px-3 py-20 md:px-6 md:py-24">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] px-6 py-16 text-center sm:px-12 md:py-24">
        {/* Background */}
        <img
          src={images.hero}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-forest-950/85" />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(rgba(233,202,119,0.09) 1px, transparent 1px)",
            backgroundSize: "26px 26px",
          }}
        />

        <div className="relative mx-auto max-w-2xl">
          <Reveal>
            <span className="inline-flex items-center gap-2.5 rounded-full border border-honey-300/30 bg-honey-400/10 px-5 py-2 text-[10.5px] font-extrabold uppercase tracking-[0.26em] text-honey-300">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-honey-300 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-honey-300" />
              </span>
              We reply within the hour · 8 AM – 8 PM
            </span>
          </Reveal>
          <Reveal delay={140}>
            <h2 className="mt-7 font-display text-4xl leading-[1.05] font-medium tracking-tight text-cream-50 sm:text-5xl md:text-6xl">
              The farm phone is{" "}
              <em className="text-honey-300">always on</em>.
            </h2>
          </Reveal>
          <Reveal delay={260}>
            <p className="mx-auto mt-6 max-w-lg leading-relaxed text-cream-100/65">
              Vanakkam! Not just honey — ask about our malts, herbal powders,
              karupatti, gulkand and ghee, plan a bulk order, or book a weekend
              farm visit. A person from the family answers, never a bot.
            </p>
          </Reveal>
          <Reveal delay={380}>
            <div className="mt-9 flex flex-col items-center gap-4">
              <a
                href={waDefault}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-3 rounded-full bg-honey-400 px-8 py-[18px] text-xs font-extrabold uppercase tracking-[0.2em] text-forest-950 shadow-[0_25px_50px_-20px_rgba(221,176,73,0.6)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-honey-300"
              >
                <MessageCircle className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                WhatsApp {WHATSAPP_DISPLAY}
              </a>
              <p className="text-xs text-cream-100/40">
                Voice calls welcome in Tamil & English
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
