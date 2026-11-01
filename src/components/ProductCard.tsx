import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Check, MessageCircle, Minus, Phone, Plus, ShoppingBag } from "lucide-react";
import { cn } from "../utils/cn";
import { useCart } from "../store/cart";
import {
  categoryName,
  formatINR,
  waProductMessage,
  waContactMessage,
  CONTACT_PHONE,
  type Product,
} from "../data/products";
import { Reveal } from "./Reveal";

export default function ProductCard({
  product,
  index = 0,
}: {
  product: Product;
  index?: number;
}) {
  const { add } = useCart();
  const [variantIdx, setVariantIdx] = useState(0);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const variant = product.variants[variantIdx];
  const lineTotal = variant.price * qty;

  useEffect(() => {
    if (!added) return;
    const t = setTimeout(() => setAdded(false), 1600);
    return () => clearTimeout(t);
  }, [added]);

  return (
    <Reveal delay={(index % 3) * 90}>
      <article className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-bark-900/10 bg-white transition-all duration-500 hover:-translate-y-2 hover:border-honey-500/40 hover:shadow-[0_35px_60px_-25px_rgba(97,74,51,0.4)]">
        {/* Image */}
        <Link
          to={`/product/${product.id}`}
          className="relative block aspect-square overflow-hidden bg-cream-100"
          aria-label={`View ${product.name}`}
        >
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.07]"
          />
          {product.tag && (
            <span className="absolute top-4 left-4 rounded-full bg-forest-800/90 px-3 py-1.5 text-[9.5px] font-extrabold uppercase tracking-[0.2em] text-honey-200 backdrop-blur-sm">
              {product.tag}
            </span>
          )}
          {product.contactOnly && (
            <span className="absolute top-4 right-4 rounded-full bg-honey-500/90 px-3 py-1.5 text-[9px] font-extrabold uppercase tracking-[0.18em] text-forest-950 backdrop-blur-sm">
              Contact for Price
            </span>
          )}
        </Link>

        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.24em] text-honey-600">
            {categoryName[product.category]}
          </p>
          <h3 className="mt-2 font-display text-xl leading-snug font-semibold text-forest-900">
            <Link
              to={`/product/${product.id}`}
              className="transition-colors hover:text-honey-700"
            >
              {product.name}
            </Link>
            <span className="mt-0.5 block font-display text-sm font-normal italic text-bark-500">
              {product.tamil}
            </span>
          </h3>
          <p className="mt-2.5 line-clamp-2 text-sm leading-relaxed text-bark-500">
            {product.blurb}
          </p>

          {/* Variant selector */}
          <div className="mt-4">
            <p className="text-[9px] font-extrabold uppercase tracking-[0.24em] text-bark-400">
              Size
            </p>
            <div
              className="mt-2 flex flex-wrap gap-1.5"
              role="radiogroup"
              aria-label="Choose size"
            >
              {product.variants.map((v, i) => (
                <button
                  key={v.size}
                  role="radio"
                  aria-checked={i === variantIdx}
                  onClick={() => setVariantIdx(i)}
                  className={cn(
                    "rounded-full border px-3 py-1.5 text-[11px] font-bold transition-all",
                    i === variantIdx
                      ? "border-forest-800 bg-forest-800 text-cream-50 shadow-sm"
                      : "border-bark-900/15 text-bark-500 hover:border-forest-800/40 hover:text-forest-800"
                  )}
                >
                  {v.size}
                </button>
              ))}
            </div>
          </div>

          {/* Price / Contact */}
          {product.contactOnly ? (
            /* ── Contact-only pricing block ── */
            <div className="mt-4 rounded-2xl border border-honey-400/30 bg-honey-50 px-4 py-3 text-center">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-bark-500">
                Price on Request
              </p>
              <p className="mt-0.5 font-display text-base font-semibold text-forest-900">
                Contact Audatham
              </p>
              <a
                href={`tel:${CONTACT_PHONE}`}
                className="mt-1 block text-sm font-bold text-honey-700 hover:text-honey-800"
              >
                📞 {CONTACT_PHONE}
              </a>
            </div>
          ) : (
            /* ── Normal quantity + price ── */
            <div className="mt-4 flex items-center justify-between gap-3">
              <div
                className="inline-flex items-center gap-1 rounded-full border border-bark-900/15 p-1"
                aria-label="Quantity"
              >
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  className="grid h-7 w-7 place-items-center rounded-full text-bark-600 transition-colors hover:bg-cream-100 hover:text-forest-800"
                >
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <span className="w-7 text-center text-sm font-extrabold text-forest-900">
                  {qty}
                </span>
                <button
                  onClick={() => setQty((q) => Math.min(99, q + 1))}
                  aria-label="Increase quantity"
                  className="grid h-7 w-7 place-items-center rounded-full text-bark-600 transition-colors hover:bg-cream-100 hover:text-forest-800"
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>
              <div className="text-right">
                <p className="font-display text-xl leading-none font-semibold text-forest-900">
                  {formatINR(lineTotal)}
                </p>
                <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-bark-400">
                  {formatINR(variant.price)} / {variant.size}
                </p>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="mt-4 grid gap-2 border-t border-bark-900/10 pt-4">
            {product.contactOnly ? (
              <>
                <a
                  href={waContactMessage(product.name)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#23a55b] py-3 text-[11px] font-extrabold uppercase tracking-[0.16em] text-white transition-all duration-300 hover:bg-[#1d8f4e]"
                >
                  <MessageCircle className="h-4 w-4" />
                  Ask on WhatsApp
                </a>
                <a
                  href={`tel:${CONTACT_PHONE}`}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-honey-500/40 bg-honey-50 py-3 text-[11px] font-extrabold uppercase tracking-[0.16em] text-forest-900 transition-all duration-300 hover:bg-honey-100"
                >
                  <Phone className="h-4 w-4" />
                  Call Audatham
                </a>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    add(product, variant, qty);
                    setAdded(true);
                  }}
                  className={cn(
                    "inline-flex items-center justify-center gap-2 rounded-full py-3 text-[11px] font-extrabold uppercase tracking-[0.16em] transition-all duration-300",
                    added
                      ? "bg-honey-400 text-forest-950"
                      : "bg-forest-800 text-cream-50 hover:bg-forest-700"
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
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#23a55b] py-3 text-[11px] font-extrabold uppercase tracking-[0.16em] text-white transition-all duration-300 hover:bg-[#1d8f4e]"
                >
                  <MessageCircle className="h-4 w-4" />
                  Order on WhatsApp
                </a>
              </>
            )}
          </div>
        </div>
      </article>
    </Reveal>
  );
}
