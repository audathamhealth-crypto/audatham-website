import { useEffect, useRef, useState } from "react";
import { Hexagon } from "lucide-react";
import { cn } from "../utils/cn";

const LETTERS = "AUDATHAM".split("");
const EXIT_AT = 2250; // curtain starts lifting
const GONE_AFTER = 1050; // curtain fully up

export default function Intro({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<"in" | "exit" | "gone">("in");
  const finished = useRef(false);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      onDone();
      setPhase("gone");
      return;
    }
    document.body.style.overflow = "hidden";
    timers.current.push(window.setTimeout(finish, EXIT_AT));
    return () => {
      timers.current.forEach(clearTimeout);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const finish = () => {
    if (finished.current) return;
    finished.current = true;
    document.body.style.overflow = "";
    setPhase("exit");
    onDone();
    timers.current.push(window.setTimeout(() => setPhase("gone"), GONE_AFTER));
  };

  if (phase === "gone") return null;

  return (
    <div
      role="button"
      aria-label="Skip intro"
      onClick={finish}
      className={cn(
        "fixed inset-0 z-[200] cursor-pointer bg-forest-950 transition-transform duration-[1050ms] ease-[cubic-bezier(0.83,0,0.17,1)]",
        phase === "exit" ? "-translate-y-full" : "translate-y-0"
      )}
    >
      {/* dotted texture */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(rgba(233,202,119,0.08) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
        }}
      />
      <div className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full bg-honey-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-24 h-96 w-96 rounded-full bg-forest-600/20 blur-3xl" />

      {/* honey edge that rides up with the curtain */}
      <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-honey-400 to-transparent" />

      <div
        className={cn(
          "relative flex h-full flex-col items-center justify-center px-6 transition-all duration-500",
          phase === "exit" && "-translate-y-6 opacity-0"
        )}
      >
        {/* Mark */}
        <span
          className="grid h-16 w-16 place-items-center rounded-2xl bg-honey-400"
          style={{
            animation:
              "intro-pop 0.9s cubic-bezier(0.34,1.56,0.64,1) both 0.15s, intro-glow 2.4s ease-in-out infinite 1s",
          }}
        >
          <Hexagon className="h-7 w-7 fill-forest-950 text-forest-950" />
        </span>

        {/* Wordmark */}
        <div className="mt-7 flex overflow-hidden" aria-label="AUDATHAM">
          {LETTERS.map((ch, i) => (
            <span
              key={i}
              className="inline-block font-display text-[2.6rem] leading-none font-medium tracking-[0.14em] text-cream-50 sm:text-6xl"
              style={{
                animation: `intro-letter-in 0.85s cubic-bezier(0.22,1,0.36,1) both ${0.4 + i * 60}ms`,
              }}
            >
              {ch}
            </span>
          ))}
        </div>

        {/* Tagline */}
        <div className="mt-6 flex items-center gap-4">
          <span
            className="h-px w-12 bg-honey-400/70 sm:w-20"
            style={{ animation: "intro-line-x 0.7s ease-out both 1.15s", transformOrigin: "right" }}
          />
          <p
            className="text-[10px] font-extrabold uppercase tracking-[0.42em] text-honey-300 sm:text-[11px]"
            style={{ animation: "fade-up 0.7s ease-out both 1.25s" }}
          >
            Pure · Wild · Unfiltered
          </p>
          <span
            className="h-px w-12 bg-honey-400/70 sm:w-20"
            style={{ animation: "intro-line-x 0.7s ease-out both 1.15s", transformOrigin: "left" }}
          />
        </div>

        {/* Progress */}
        <div className="mt-9 h-[3px] w-44 overflow-hidden rounded-full bg-cream-50/10">
          <div
            className="h-full w-full origin-left bg-gradient-to-r from-honey-500 via-honey-300 to-honey-400"
            style={{ animation: "intro-progress 1.25s cubic-bezier(0.4,0,0.2,1) both 0.9s" }}
          />
        </div>

        {/* Foot note */}
        <p
          className="absolute bottom-8 text-[10px] font-bold uppercase tracking-[0.32em] text-cream-100/40"
          style={{ animation: "fade-up 0.7s ease-out both 1.5s" }}
        >
          Est. 1984 · Tiruvannamalai · Tamil Nadu
        </p>

        {/* Skip hint */}
        <p
          className="absolute right-6 bottom-8 text-[10px] font-bold uppercase tracking-[0.25em] text-cream-100/35"
          style={{ animation: "fade-up 0.7s ease-out both 1.3s" }}
        >
          Tap to skip
        </p>
      </div>
    </div>
  );
}
