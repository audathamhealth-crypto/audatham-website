import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Search, ShoppingBag, X } from "lucide-react";
import { useCart } from "../store/cart";
import { categoryName, formatINR, products } from "../data/products";

export default function SearchOverlay({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { add } = useCart();

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => inputRef.current?.focus(), 120);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      clearTimeout(t);
    };
  }, [open, onClose]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products.slice(0, 8);
    return products.filter((p) =>
      [p.name, p.tamil, p.category, p.blurb]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [query]);

  if (!open) return null;

  return (
    <div className="anim-fade-in fixed inset-0 z-[85] overflow-y-auto bg-cream-50/95 backdrop-blur-md">
      <div className="mx-auto max-w-3xl px-4 pt-24 pb-16 sm:px-6">
        <button
          onClick={onClose}
          aria-label="Close search"
          className="absolute top-5 right-5 grid h-11 w-11 place-items-center rounded-full bg-forest-800/5 text-forest-900 transition-colors hover:bg-forest-800/10"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="anim-fade-up">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.3em] text-honey-600">
            Search the larder
          </p>
          <div className="mt-4 flex items-center gap-4 border-b-2 border-forest-900/15 pb-4 focus-within:border-honey-500">
            <Search className="h-6 w-6 shrink-0 text-bark-400" />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Honey, sathu maavu, karupatti…"
              className="w-full bg-transparent font-display text-2xl font-medium text-forest-900 outline-none placeholder:text-bark-400/50 sm:text-4xl"
            />
          </div>
          <p className="mt-3 text-xs font-bold uppercase tracking-[0.2em] text-bark-400">
            {results.length} result{results.length === 1 ? "" : "s"}
            {query
              ? ` for “${query}”`
              : ` · showing ${results.length} of ${products.length}`}
          </p>
        </div>

        <ul className="mt-8 space-y-3">
          {results.map((product, i) => {
            const v = product.variants[0];
            return (
              <li
                key={product.id}
                className="anim-fade-up"
                style={{ animationDelay: `${80 + i * 40}ms` }}
              >
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => navigate(`/product/${product.id}`)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") navigate(`/product/${product.id}`);
                  }}
                  className="flex cursor-pointer items-center gap-4 rounded-2xl border border-bark-900/10 bg-white p-3.5 transition-all hover:border-honey-500/40 hover:shadow-lg hover:shadow-bark-900/5"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-16 w-16 shrink-0 rounded-xl object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="font-display text-lg leading-snug font-semibold text-forest-900">
                      {product.name}
                    </p>
                    <p className="truncate text-xs text-bark-500">
                      {product.tamil} · {categoryName[product.category]} ·{" "}
                      {product.variants.length} sizes
                    </p>
                  </div>
                  <div className="hidden text-right sm:block">
                    <p className="font-display text-lg font-semibold text-forest-900">
                      From {formatINR(v.price)}
                    </p>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-bark-400">
                      {v.size}
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      add(product, v, 1);
                    }}
                    aria-label={`Add ${product.name} to cart`}
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-forest-800 text-cream-50 transition-all hover:scale-105 hover:bg-forest-700"
                  >
                    <ShoppingBag className="h-4 w-4" />
                  </button>
                  <ArrowRight className="h-4 w-4 shrink-0 text-bark-300" />
                </div>
              </li>
            );
          })}
        </ul>

        {results.length === 0 && (
          <div className="anim-fade-up mt-10 text-center">
            <p className="font-display text-2xl font-medium text-forest-900">
              Not on the shelf yet.
            </p>
            <p className="mt-2 text-sm text-bark-500">
              The farm may still make it — ask us on WhatsApp and we'll check
              the pantry.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
