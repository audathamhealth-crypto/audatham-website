import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  MessageCircle,
  Minus,
  PackageOpen,
  Plus,
  Trash2,
  X,
} from "lucide-react";
import { cn } from "../utils/cn";
import { useCart } from "../store/cart";
import { formatINR, waCartMessage } from "../data/products";

export default function CartDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { lines, total, count, setQty, remove } = useCart();

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [open]);

  const freeShip = 999 - total;

  return (
    <>
      <div
        onClick={onClose}
        className={cn(
          "fixed inset-0 z-[80] bg-forest-950/55 backdrop-blur-sm transition-opacity duration-500",
          open ? "opacity-100" : "pointer-events-none opacity-0"
        )}
      />
      <aside
        className={cn(
          "fixed top-0 right-0 z-[90] flex h-full w-full max-w-md flex-col bg-cream-50 shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          open ? "translate-x-0" : "translate-x-full"
        )}
        aria-hidden={!open}
      >
        <header className="flex items-center justify-between border-b border-bark-900/10 px-6 py-5">
          <div>
            <h3 className="font-display text-2xl font-semibold text-forest-900">
              Your basket
            </h3>
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-bark-500">
              {count} item{count === 1 ? "" : "s"} · saved on this device
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close cart"
            className="grid h-10 w-10 place-items-center rounded-full bg-forest-800/5 text-forest-900 transition-colors hover:bg-forest-800/10"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
            <span className="grid h-20 w-20 place-items-center rounded-full bg-cream-100 text-bark-400">
              <PackageOpen className="h-8 w-8" />
            </span>
            <div>
              <p className="font-display text-xl font-semibold text-forest-900">
                An empty basket is full of possibility.
              </p>
              <p className="mt-1.5 text-sm text-bark-500">
                Batch #39 is bottling this week — honey, malts, powders and
                pantry.
              </p>
            </div>
            <Link
              to="/shop"
              className="rounded-full bg-forest-800 px-6 py-3 text-[11px] font-extrabold uppercase tracking-[0.2em] text-cream-50 transition-colors hover:bg-forest-700"
            >
              Browse the shop
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-5">
              <ul className="space-y-4">
                {lines.map((line) => (
                  <li
                    key={line.key}
                    className="flex gap-4 rounded-2xl border border-bark-900/10 bg-white p-3.5"
                  >
                    <img
                      src={line.product.image}
                      alt={line.product.name}
                      className="h-20 w-20 shrink-0 rounded-xl object-cover"
                    />
                    <div className="flex flex-1 flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="truncate font-display text-[15px] font-semibold text-forest-900">
                            {line.product.name}
                          </p>
                          <p className="text-[11px] font-bold uppercase tracking-wider text-bark-400">
                            {line.size} · {formatINR(line.price)}
                          </p>
                        </div>
                        <button
                          onClick={() => remove(line.key)}
                          aria-label={`Remove ${line.product.name}`}
                          className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-bark-400 transition-colors hover:bg-red-50 hover:text-red-500"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <div className="inline-flex items-center gap-1 rounded-full border border-bark-900/15 p-0.5">
                          <button
                            onClick={() => setQty(line.key, line.qty - 1)}
                            aria-label="Decrease quantity"
                            className="grid h-7 w-7 place-items-center rounded-full text-bark-600 transition-colors hover:bg-cream-100 hover:text-honey-700"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-5 text-center text-sm font-extrabold text-forest-900">
                            {line.qty}
                          </span>
                          <button
                            onClick={() => setQty(line.key, line.qty + 1)}
                            aria-label="Increase quantity"
                            className="grid h-7 w-7 place-items-center rounded-full text-bark-600 transition-colors hover:bg-cream-100 hover:text-honey-700"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <p className="font-display text-[15px] font-semibold text-forest-900">
                          {formatINR(line.price * line.qty)}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <footer className="border-t border-bark-900/10 bg-cream-100/70 px-6 py-5">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-bark-500">Subtotal</span>
                <span className="font-display text-2xl font-semibold text-forest-900">
                  {formatINR(total)}
                </span>
              </div>
              <p className="mt-1 text-xs text-bark-500">
                {freeShip > 0
                  ? `Add ${formatINR(freeShip)} more for free shipping · COD available`
                  : "Your order ships free · COD available"}
              </p>
              <Link
                to="/checkout"
                className="mt-4 flex items-center justify-center gap-2.5 rounded-full bg-forest-800 py-4 text-[11px] font-extrabold uppercase tracking-[0.2em] text-cream-50 transition-all hover:-translate-y-0.5 hover:bg-forest-700"
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
                className="mt-2.5 flex items-center justify-center gap-2.5 rounded-full bg-[#23a55b] py-4 text-[11px] font-extrabold uppercase tracking-[0.2em] text-white shadow-lg shadow-[#23a55b]/30 transition-all hover:-translate-y-0.5 hover:bg-[#1d8f4e]"
              >
                <MessageCircle className="h-4 w-4" />
                Order on WhatsApp
              </a>
              <Link
                to="/cart"
                className="mt-3 block text-center text-[10.5px] font-extrabold uppercase tracking-[0.2em] text-bark-500 transition-colors hover:text-forest-800"
              >
                View full basket
              </Link>
            </footer>
          </>
        )}
      </aside>
    </>
  );
}
