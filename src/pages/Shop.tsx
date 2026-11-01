import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { MessageCircle, Search } from "lucide-react";
import ProductCard from "../components/ProductCard";
import { Reveal } from "../components/Reveal";
import { cn } from "../utils/cn";
import {
  categoryFilters,
  products,
  waLink,
  type CategoryId,
} from "../data/products";

type Sort = "featured" | "price-asc" | "price-desc" | "name";

const sortLabels: Record<Sort, string> = {
  featured: "Featured",
  "price-asc": "Price: Low to High",
  "price-desc": "Price: High to Low",
  name: "Name: A to Z",
};

export default function Shop() {
  const [params, setParams] = useSearchParams();
  const catParam = (params.get("cat") ?? "all") as "all" | CategoryId;
  const activeCat = categoryFilters.some((c) => c.id === catParam)
    ? catParam
    : "all";
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<Sort>("featured");

  const setCat = (id: "all" | CategoryId) => {
    if (id === "all") {
      params.delete("cat");
      setParams(params, { replace: true });
    } else {
      setParams({ cat: id }, { replace: true });
    }
  };

  const list = useMemo(() => {
    let l =
      activeCat === "all"
        ? [...products]
        : products.filter((p) => p.category === activeCat);
    const q = query.trim().toLowerCase();
    if (q) {
      l = l.filter((p) =>
        [p.name, p.tamil, p.category, p.blurb]
          .join(" ")
          .toLowerCase()
          .includes(q)
      );
    }
    if (sort === "price-asc")
      l.sort((a, b) => a.variants[0].price - b.variants[0].price);
    if (sort === "price-desc")
      l.sort((a, b) => b.variants[0].price - a.variants[0].price);
    if (sort === "name") l.sort((a, b) => a.name.localeCompare(b.name));
    return l;
  }, [activeCat, query, sort]);

  return (
    <div className="mx-auto max-w-7xl px-4 pt-28 pb-20 sm:px-6 md:pt-36 lg:px-8">
      {/* Heading */}
      <Reveal className="max-w-2xl">
        <p className="flex items-center gap-3 text-[11px] font-extrabold uppercase tracking-[0.35em] text-honey-600">
          <span className="h-px w-8 bg-honey-500/50" />
          The Shop
        </p>
        <h1 className="mt-5 font-display text-4xl leading-[1.04] font-medium tracking-tight text-forest-900 sm:text-6xl">
          The Audatham <em className="text-honey-600">larder</em>.
        </h1>
        <p className="mt-5 leading-relaxed text-bark-500">
          All {products.length} farmhouse products — honey, infusions, malts,
          herbal powders, karupatti, gulkand, ghee and pantry staples. Priced
          by the farm, checked against Batch #39, and ordered straight through
          WhatsApp.
        </p>
      </Reveal>

      {/* Controls */}
      <div className="mt-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
          {categoryFilters.map((c) => (
            <button
              key={c.id}
              onClick={() => setCat(c.id)}
              className={cn(
                "shrink-0 rounded-full border px-4 py-2.5 text-[11px] font-extrabold uppercase tracking-[0.16em] transition-all",
                activeCat === c.id
                  ? "border-forest-800 bg-forest-800 text-cream-50 shadow-md"
                  : "border-bark-900/15 bg-cream-50 text-bark-500 hover:border-forest-800/40 hover:text-forest-800"
              )}
            >
              {c.label}
            </button>
          ))}
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3 rounded-full border border-bark-900/15 bg-cream-50 px-4 py-2.5 focus-within:border-honey-500">
            <Search className="h-4 w-4 shrink-0 text-bark-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products…"
              className="w-full bg-transparent text-sm font-semibold text-forest-900 outline-none placeholder:text-bark-400/60 sm:w-44"
            />
          </div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            aria-label="Sort products"
            className="rounded-full border border-bark-900/15 bg-cream-50 px-4 py-2.5 text-sm font-semibold text-forest-900 outline-none transition-colors focus:border-honey-500"
          >
            {(Object.keys(sortLabels) as Sort[]).map((s) => (
              <option key={s} value={s}>
                {sortLabels[s]}
              </option>
            ))}
          </select>
        </div>
      </div>

      <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-bark-400">
        {list.length} product{list.length === 1 ? "" : "s"}
        {activeCat !== "all" &&
          ` · ${categoryFilters.find((c) => c.id === activeCat)?.label}`}
        {query && ` · “${query}”`}
      </p>

      {/* Grid */}
      {list.length > 0 ? (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {list.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      ) : (
        <div className="mt-14 rounded-[2rem] border border-dashed border-bark-900/20 bg-cream-50 px-8 py-16 text-center">
          <p className="font-display text-2xl font-medium text-forest-900">
            Nothing on that shelf yet.
          </p>
          <p className="mx-auto mt-2 max-w-sm text-sm text-bark-500">
            Try a different search — or ask the farm, we may make it fresh in
            this week's batch.
          </p>
          <a
            href={waLink(
              `Vanakkam AUDATHAM! Do you make / stock "${query}"?`
            )}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#23a55b] px-6 py-3 text-[11px] font-extrabold uppercase tracking-[0.2em] text-white transition-colors hover:bg-[#1d8f4e]"
          >
            <MessageCircle className="h-4 w-4" />
            Ask on WhatsApp
          </a>
        </div>
      )}

      {/* Bulk strip */}
      <Reveal delay={100}>
        <div className="mt-16 flex flex-col items-center justify-between gap-4 rounded-[1.75rem] border border-dashed border-bark-900/20 bg-cream-50 px-8 py-6 sm:flex-row">
          <p className="text-center text-sm text-bark-500 sm:text-left">
            <span className="font-display text-base font-semibold text-forest-900">
              Need 5kg tins, wedding favour boxes or wholesale?
            </span>{" "}
            We bottle and pack to order every Sunday.
          </p>
          <a
            href={waLink(
              "Vanakkam AUDATHAM! I'd like to talk about a bulk / wholesale order."
            )}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex shrink-0 items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.22em] text-honey-700 transition-colors hover:text-forest-800"
          >
            Message the farm
          </a>
        </div>
      </Reveal>
    </div>
  );
}
