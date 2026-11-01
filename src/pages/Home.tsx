import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Hero from "../components/Hero";
import Marquee from "../components/Marquee";
import Why from "../components/Why";
import Categories from "../components/Categories";
import Products from "../components/Products";
import FieldToJar from "../components/FieldToJar";
import Gifts from "../components/Gifts";
import WhatsAppCTA from "../components/WhatsAppCTA";
import { Reveal } from "../components/Reveal";

function StoryTeaser() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <div className="pointer-events-none absolute top-24 -left-32 h-96 w-96 rounded-full bg-honey-300/20 blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-8">
        <Reveal className="relative mx-auto w-full max-w-lg">
          <div className="relative aspect-[4/4.4] overflow-hidden rounded-[2.5rem] shadow-[0_40px_70px_-30px_rgba(34,26,16,0.4)]">
            <img
              src="https://images.pexels.com/photos/32954692/pexels-photo-32954692.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200"
              alt="Farmer tending rice seedlings in golden evening light in the delta"
              className="h-full w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest-950/20 to-transparent" />
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

        <div className="max-w-xl">
          <Reveal>
            <p className="flex items-center gap-3 text-[11px] font-extrabold uppercase tracking-[0.35em] text-honey-600">
              <span className="h-px w-8 bg-honey-500/50" />
              Our Story
            </p>
          </Reveal>
          <Reveal delay={120}>
            <h2 className="mt-5 font-display text-4xl leading-[1.06] font-medium tracking-tight text-forest-900 sm:text-5xl">
              Forty monsoons of{" "}
              <em className="text-honey-600">honest farm food</em>.
            </h2>
          </Reveal>
          <Reveal delay={240}>
            <p className="mt-6 leading-relaxed text-bark-500">
              In 1984 our grandfather kept his first bee colonies in the
              moringa grove behind the paddy — and sold jars from a cycle
              basket at the Thiruvaiyaru market. Three generations on, the
              shelf has grown to honeys, malts, herbal powders, karupatti and
              ghee. The rules haven't changed.
            </p>
          </Reveal>
          <Reveal delay={360}>
            <Link
              to="/story"
              className="group mt-8 inline-flex items-center gap-3 text-[11px] font-extrabold uppercase tracking-[0.22em] text-forest-800 transition-colors hover:text-honey-700"
            >
              Read the full story
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const location = useLocation();

  // Supports navigate("/", { state: { scrollTo: "gifts" } }) from other pages.
  useEffect(() => {
    const target = (location.state as { scrollTo?: string } | null)?.scrollTo;
    if (target) {
      const t = setTimeout(() => {
        document
          .getElementById(target)
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
        window.history.replaceState({}, "");
      }, 80);
      return () => clearTimeout(t);
    }
  }, [location.state]);

  return (
    <>
      <Hero />
      <Marquee />
      <Why />
      <Categories />
      <Products />
      <FieldToJar />
      <StoryTeaser />
      <Gifts />
      <WhatsAppCTA />
    </>
  );
}
