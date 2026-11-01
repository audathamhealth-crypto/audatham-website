import { Hexagon } from "lucide-react";

const items = [
  "14 Raw Honey Varietals",
  "Honey Infusions & Gulkand",
  "Sprouted Health Malts",
  "Herbal Powders & Tonics",
  "Karupatti & Nattu Sarkarai",
  "Cultured Ghee & Pantry",
  "Batch #39 Bottling This Week",
];

export default function Marquee() {
  const row = [...items, ...items, ...items];
  return (
    <div className="group relative z-10 overflow-hidden border-y border-forest-900/10 bg-honey-500 py-4">
      <div
        className="flex w-max animate-marquee items-center"
        style={{ animationDuration: "42s" }}
      >
        {row.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-7 pr-7 text-[11px] font-extrabold uppercase tracking-[0.32em] text-forest-950/85"
          >
            {item}
            <Hexagon className="h-2.5 w-2.5 fill-forest-950/70 text-forest-950/70" />
          </span>
        ))}
      </div>
    </div>
  );
}
