import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import {
  BadgeCheck,
  Check,
  ChevronRight,
  Leaf,
  MessageCircle,
  Minus,
  Plus,
  ShoppingBag,
  Truck,
} from "lucide-react";
import { cn } from "../utils/cn";
import { Reveal } from "../components/Reveal";
import ProductCard from "../components/ProductCard";
import { useCart } from "../store/cart";
import {
  categoryName,
  formatINR,
  getProduct,
  getRelated,
  waProductMessage,
} from "../data/products";

export default function ProductPage() {
  const { id } = useParams();
  const product = id ? getProduct(id) : undefined;
  const { add } = useCart();

  const [variantIdx, setVariantIdx] = useState(0);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    setVariantIdx(0);
    setQty(1);
    setAdded(false);
  }, [id]);

  useEffect(() => {
    if (!added) return;
    const t = setTimeout(() => setAdded(false), 1800);
    return () => clearTimeout(t);
  }, [added]);

  if (!product) return <Navigate to="/shop" replace />;

  const variant = product.variants[variantIdx];
  const lineTotal = variant.price * qty;
  const related = getRelated(product, 4);

  return (
    <div className="mx-auto max-w-7xl px-4 pt-24 pb-20 sm:px-6 md:pt-32 lg:px-8">
      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="flex flex-wrap items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-bark-400"
      >
        <Link to="/" className="transition-colors hover:text-forest-800">
          Home
        </Link>
        <ChevronRight className="h-3 w-3" />
        <Link to="/shop" className="transition-colors hover:text-forest-800">
          Shop
        </Link>
        <ChevronRight className="h-3 w-3" />
        <Link
          to={`/shop?cat=${product.category}`}
          className="transition-colors hover:text-forest-800"
        >
          {categoryName[product.category]}
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-honey-700">{product.name}</span>
      </nav>

      <div className="mt-10 grid gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Image */}
        <Reveal className="relative">
          <div className="sticky top-28">
            <div
              aria-hidden
              className="absolute -inset-3 rounded-[2.5rem] border border-honey-500/30 md:-inset-4"
            />
            <div className="relative aspect-square overflow-hidden rounded-[2rem] bg-cream-100 shadow-[0_40px_70px_-30px_rgba(34,26,16,0.4)]">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover"
              />
              {product.tag && (
                <span className="absolute top-5 left-5 rounded-full bg-forest-800/90 px-3.5 py-2 text-[10px] font-extrabold uppercase tracking-[0.22em] text-honey-200 backdrop-blur-sm">
                  {product.tag}
                </span>
              )}
            </div>
          </div>
        </Reveal>

        {/* Details */}
        <Reveal delay={120}>
          <p className="text-[11px] font-extrabold uppercase tracking-[0.28em] text-honey-600">
            {categoryName[product.category]}
          </p>
          <h1 className="mt-4 font-display text-4xl leading-[1.05] font-medium tracking-tight text-forest-900 sm:text-5xl">
            {product.name}
          </h1>
          <p className="mt-2 font-display text-lg italic text-bark-500">
            {product.tamil}
          </p>
          <p className="mt-6 max-w-lg leading-relaxed text-bark-500">
            {product.blurb} Bottled and packed on the farm in weekly
            micro-batches, and sealed by hand.
          </p>

          {/* Variant cards */}
          <div className="mt-8">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.24em] text-bark-400">
              Choose size
            </p>
            <div className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-3" role="radiogroup" aria-label="Choose size">
              {product.variants.map((v, i) => (
                <button
                  key={v.size}
                  role="radio"
                  aria-checked={i === variantIdx}
                  onClick={() => setVariantIdx(i)}
                  className={cn(
                    "rounded-2xl border px-4 py-3.5 text-left transition-all",
                    i === variantIdx
                      ? "border-forest-800 bg-forest-800 text-cream-50 shadow-lg shadow-forest-900/25"
                      : "border-bark-900/15 bg-white hover:border-forest-800/40"
                  )}
                >
                  <span
                    className={cn(
                      "block text-sm font-extrabold",
                      i === variantIdx ? "text-cream-50" : "text-forest-900"
                    )}
                  >
                    {v.size}
                  </span>
                  <span
                    className={cn(
                      "mt-0.5 block text-xs font-bold",
                      i === variantIdx ? "text-honey-300" : "text-bark-500"
                    )}
                  >
                    {formatINR(v.price)}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Qty + total */}
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <div
              className="inline-flex items-center gap-1 rounded-full border border-bark-900/15 bg-white p-1.5"
              aria-label="Quantity"
            >
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
                className="grid h-9 w-9 place-items-center rounded-full text-bark-600 transition-colors hover:bg-cream-100 hover:text-forest-800"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-8 text-center font-display text-lg font-semibold text-forest-900">
                {qty}
              </span>
              <button
                onClick={() => setQty((q) => Math.min(99, q + 1))}
                aria-label="Increase quantity"
                className="grid h-9 w-9 place-items-center rounded-full text-bark-600 transition-colors hover:bg-cream-100 hover:text-forest-800"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-bark-400">
                Total
              </p>
              <p className="font-display text-3xl font-semibold text-forest-900">
                {formatINR(lineTotal)}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            <button
              onClick={() => {
                add(product, variant, qty);
                setAdded(true);
              }}
              className={cn(
                "inline-flex items-center justify-center gap-2.5 rounded-full py-4 text-[11px] font-extrabold uppercase tracking-[0.18em] transition-all duration-300",
                added
                  ? "bg-honey-400 text-forest-950"
                  : "bg-forest-800 text-cream-50 hover:bg-forest-700 shadow-[0_22px_45px_-18px_rgba(23,41,30,0.55)]"
              )}
            >
              {added ? (
                <>
                  <Check className="h-4 w-4" /> Added to basket
                </>
              ) : (
                <>
                  <ShoppingBag className="h-4 w-4" /> Add to Cart
                </>
              )}
            </button>
            <a
              href={waProductMessage(product.name, variant.size, qty)}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2.5 rounded-full bg-[#23a55b] py-4 text-[11px] font-extrabold uppercase tracking-[0.18em] text-white shadow-lg shadow-[#23a55b]/30 transition-all duration-300 hover:bg-[#1d8f4e]"
            >
              <MessageCircle className="h-4 w-4" />
              Order on WhatsApp
            </a>
          </div>
          <p className="mt-3 text-center text-xs text-bark-500 sm:text-left">
            WhatsApp is our checkout — no login, no online payment. We confirm
            stock and delivery on chat.
          </p>

          {/* Trust chips */}
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {[
              { icon: Leaf, text: "100% natural, no additives" },
              { icon: BadgeCheck, text: `${variant.size} · Batch #39 sealed jar` },
              { icon: Truck, text: "Ships across India in 3–5 days" },
            ].map((chip) => (
              <div
                key={chip.text}
                className="flex items-center gap-2.5 rounded-2xl border border-bark-900/10 bg-cream-50 px-3.5 py-3"
              >
                <chip.icon className="h-4 w-4 shrink-0 text-honey-600" />
                <span className="text-[11px] leading-snug font-bold text-bark-600">
                  {chip.text}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      {/* Related */}
      <div className="mt-24">
        <Reveal>
          <div className="flex items-end justify-between gap-4">
            <h2 className="font-display text-3xl font-medium text-forest-900 sm:text-4xl">
              Goes well <em className="text-honey-600">with it</em>
            </h2>
            <Link
              to="/shop"
              className="shrink-0 text-[11px] font-extrabold uppercase tracking-[0.2em] text-honey-700 transition-colors hover:text-forest-800"
            >
              View all →
            </Link>
          </div>
        </Reveal>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {related.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
