import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "../utils/cn";

export function Reveal({
  children,
  className,
  delay = 0,
  y = 32,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn("will-change-transform", className)}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : `translateY(${y}px)`,
        transition: `opacity 1000ms cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 1000ms cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

export function SectionHead({
  eyebrow,
  title,
  sub,
  inverted = false,
  align = "center",
}: {
  eyebrow: string;
  title: ReactNode;
  sub?: string;
  inverted?: boolean;
  align?: "center" | "left";
}) {
  return (
    <Reveal
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left"
      )}
    >
      <p
        className={cn(
          "flex items-center gap-3 text-[11px] font-extrabold uppercase tracking-[0.35em]",
          align === "center" && "justify-center",
          inverted ? "text-honey-300" : "text-honey-600"
        )}
      >
        <span
          className={cn(
            "h-px w-8",
            inverted ? "bg-honey-300/50" : "bg-honey-500/50"
          )}
        />
        {eyebrow}
        {align === "center" && (
          <span
            className={cn(
              "h-px w-8",
              inverted ? "bg-honey-300/50" : "bg-honey-500/50"
            )}
          />
        )}
      </p>
      <h2
        className={cn(
          "mt-5 font-display text-4xl leading-[1.06] font-medium tracking-tight sm:text-5xl",
          inverted ? "text-cream-50" : "text-forest-900"
        )}
      >
        {title}
      </h2>
      {sub && (
        <p
          className={cn(
            "mt-5 text-base leading-relaxed",
            inverted ? "text-cream-100/65" : "text-bark-500"
          )}
        >
          {sub}
        </p>
      )}
    </Reveal>
  );
}
