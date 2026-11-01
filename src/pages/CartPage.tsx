import { Link } from "react-router-dom";
import {
  ArrowRight,
  HandCoins,
  MessageCircle,
  Minus,
  PackageOpen,
  Plus,
  ShieldCheck,
  Trash2,
  Truck,
} from "lucide-react";
import { Reveal } from "../components/Reveal";
import { useCart } from "../store/cart";
import { formatINR, waCartMessage } from "../data/products";

const FREE_SHIP = 999;

export default function CartPage() {
  const { lines, total, count, setQty, remove, setVariant } = useCart();

  if (lines.length === 0) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-7xl items-center justify-center px-4 pt-24 pb-20 sm:px-6 lg:px-8">
        <Reveal className="max-w-md text-center">
          <span className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-cream-100 text-bark-400">
            <PackageOpen className="h-10 w-10" />
          </span>
          <h1 className="mt-7 font-display text-4xl font-medium text-forest-900">
            Your basket is empty.
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-bark-500">
            Batch #39 is bottling this week — honey, malts, herbal powders,
            karupatti and ghee are all on the shelf.
          </p>
          <Link
            to="/shop"
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-forest-800 px-8 py-4 text-[11px] font-extrabold uppercase tracking-[0.2em] text-cream-50 transition-all hover:-translate-y-0.5 hover:bg-forest-700"
          >
            Browse the shop
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </div>
    );
  }

  const progress = Math.min(100, (total / FREE_SHIP) * 100);

  return (
    <div className="mx-auto max-w-7xl px-4 pt-28 pb-20 sm:px-6 md:pt-36 lg:px-8">
      <Reveal>
        <p className="flex items-center gap-3 text-[11px] font-extrabold uppercase tracking-[0.35em] text-honey-600">
          <span className="h-px w-8 bg-honey-500/50" />
          Your Basket
        </p>
        <h1 className="mt-5 font-display text-4xl leading-[1.04] font-medium tracking-tight text-forest-900 sm:text-5xl">
          {count} item{count === 1 ? "" : "s"} from the{" "}
          <em className="text-honey-600">farm</em>.
        </h1>
      </Reveal>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_380px] lg:items-start">
        {/* Lines */}
        <ul className="space-y-4">
          {lines.map((line, i) => (
            <Reveal key={line.key} delay={i * 60}>
              <li className="flex gap-4 rounded-[1.5rem] border border-bark-900/10 bg-white p-4 sm:gap-5 sm:p-5">
                <Link
                  to={`/product/${line.product.id}`}
                  className="shrink-0"
                  aria-label={`View ${line.product.name}`}
                >
                  <img
                    src={line.product.image}
                    alt={line.product.name}
                    className="h-20 w-20 rounded-xl object-cover sm:h-24 sm:w-24"
                  />
                </Link>

                <div className="flex flex-1 flex-col gap-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <Link
                        to={`/product/${line.product.id}`}
                        className="font-display text-lg leading-snug font-semibold text-forest-900 transition-colors hover:text-honey-700"
                      >
                        {line.product.name}
                      </Link>
                      <p className="mt-0.5 text-[11px] font-bold uppercase tracking-wider text-bark-400">
                        {line.product.tamil}
                      </p>
                    </div>
                    <button
                      onClick={() => remove(line.key)}
                      aria-label={`Remove ${line.product.name}`}
                      className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-bark-400 transition-colors hover:bg-red-50 hover:text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <select
                        value={line.size}
                        onChange={(e) => {
                          const v = line.product.variants.find(
                            (x) => x.size === e.target.value
                          );
                          if (v) setVariant(line.key, v);
                        }}
                        aria-label="Change size"
                        className="rounded-full border border-bark-900/15 bg-cream-50 px-3 py-1.5 text-xs font-bold text-forest-900 outline-none focus:border-honey-500"
                      >
                        {line.product.variants.map((v) => (
                          <option key={v.size} value={v.size}>
                            {v.size} · {formatINR(v.price)}
                          </option>
                        ))}
                      </select>
                      <div
                        className="inline-flex items-center gap-1 rounded-full border border-bark-900/15 p-1"
                        aria-label="Quantity"
                      >
                        <button
                          onClick={() => setQty(line.key, line.qty - 1)}
                          aria-label="Decrease quantity"
                          className="grid h-7 w-7 place-items-center rounded-full text-bark-600 transition-colors hover:bg-cream-100"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-6 text-center text-sm font-extrabold text-forest-900">
                          {line.qty}
                        </span>
                        <button
                          onClick={() => setQty(line.key, line.qty + 1)}
                          aria-label="Increase quantity"
                          className="grid h-7 w-7 place-items-center rounded-full text-bark-600 transition-colors hover:bg-cream-100"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                    <p className="text-right">
                      <span className="font-display text-lg font-semibold text-forest-900">
                        {formatINR(line.price * line.qty)}
                      </span>
                      <span className="block text-[10px] font-bold uppercase tracking-wider text-bark-400">
                        {formatINR(line.price)} each
                      </span>
                    </p>
                  </div>
                </div>
              </li>
            </Reveal>
          ))}
        </ul>

        {/* Summary */}
        <Reveal delay={120} className="lg:sticky lg:top-28">
          <aside className="rounded-[1.75rem] border border-bark-900/10 bg-white p-6 sm:p-7">
            <h2 className="font-display text-2xl font-semibold text-forest-900">
              Order summary
            </h2>

            <div className="mt-5 space-y-2.5 text-sm">
              <div className="flex justify-between">
                <span className="text-bark-500">
                  Subtotal ({count} item{count === 1 ? "" : "s"})
                </span>
                <span className="font-bold text-forest-900">
                  {formatINR(total)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-bark-500">Delivery</span>
                <span className="font-bold text-forest-900">
                  {total >= FREE_SHIP ? "Free" : "On WhatsApp"}
                </span>
              </div>
            </div>

            {/* Free shipping progress */}
            <div className="mt-5">
              <div className="h-2 overflow-hidden rounded-full bg-cream-100">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-honey-400 to-honey-600 transition-all duration-700"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="mt-2 text-xs font-semibold text-bark-500">
                {total >= FREE_SHIP
                  ? "Your order ships free."
                  : `Add ${formatINR(FREE_SHIP - total)} more for free delivery.`}
              </p>
            </div>

            <div className="mt-6 border-t border-bark-900/10 pt-5">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-bark-500">Total</span>
                <span className="font-display text-3xl font-semibold text-forest-900">
                  {formatINR(total)}
                </span>
              </div>
            </div>

            <Link
              to="/checkout"
              className="mt-5 flex w-full items-center justify-center gap-2.5 rounded-full bg-forest-800 py-4 text-[11px] font-extrabold uppercase tracking-[0.2em] text-cream-50 shadow-[0_22px_45px_-18px_rgba(23,41,30,0.55)] transition-all hover:-translate-y-0.5 hover:bg-forest-700"
            >
              Proceed to Checkout
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={waCartMessage(
                lines.map((l) => ({
                  name: l.product.name,
                  size: l.size,
                  qty: l.qty,
                  lineTotal: l.price * l.qty,
                })),
                total
              )}
              target="_blank"
              rel="noreferrer"
              className="mt-3 flex w-full items-center justify-center gap-2.5 rounded-full bg-[#23a55b] py-4 text-[11px] font-extrabold uppercase tracking-[0.2em] text-white shadow-lg shadow-[#23a55b]/30 transition-all hover:-translate-y-0.5 hover:bg-[#1d8f4e]"
            >
              <MessageCircle className="h-4 w-4" />
              Quick Order on WhatsApp
            </a>

            <ul className="mt-6 space-y-2.5 text-xs text-bark-500">
              <li className="flex items-center gap-2.5">
                <HandCoins className="h-4 w-4 shrink-0 text-honey-600" />
                No online payment — COD or UPI after we confirm.
              </li>
              <li className="flex items-center gap-2.5">
                <Truck className="h-4 w-4 shrink-0 text-honey-600" />
                Ships across India in 3–5 working days.
              </li>
              <li className="flex items-center gap-2.5">
                <ShieldCheck className="h-4 w-4 shrink-0 text-honey-600" />
                Batch #39 · breakage-free promise on every jar.
              </li>
            </ul>
          </aside>
        </Reveal>
      </div>
    </div>
  );
}
