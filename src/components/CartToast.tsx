import { useEffect, useState } from "react";
import { ShoppingBag } from "lucide-react";
import { cn } from "../utils/cn";
import { useCart } from "../store/cart";

export default function CartToast({
  onViewCart,
}: {
  onViewCart: () => void;
}) {
  const { lastAdded, dismissLast } = useCart();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!lastAdded) return;
    setVisible(true);
    const t1 = setTimeout(() => setVisible(false), 2600);
    const t2 = setTimeout(dismissLast, 3100);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [lastAdded, dismissLast]);

  if (!lastAdded) return null;

  return (
    <div
      className={cn(
        "fixed bottom-4 left-4 z-[75] transition-all duration-400 ease-out sm:bottom-6 sm:left-6",
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-16 opacity-0"
      )}
      role="status"
    >
      <div className="flex items-center gap-3.5 rounded-2xl border border-bark-900/10 bg-forest-950/95 p-3 pr-4 shadow-2xl shadow-forest-950/40 backdrop-blur">
        <img
          src={lastAdded.product.image}
          alt={lastAdded.product.name}
          className="h-12 w-12 rounded-xl object-cover"
        />
        <div className="max-w-[190px]">
          <p className="text-[9px] font-extrabold uppercase tracking-[0.22em] text-honey-300">
            Added to basket
          </p>
          <p className="truncate text-sm font-bold text-cream-50">
            {lastAdded.product.name}
          </p>
          <p className="text-[11px] font-semibold text-cream-100/60">
            {lastAdded.size}
          </p>
        </div>
        <button
          onClick={() => {
            setVisible(false);
            onViewCart();
          }}
          className="ml-1 grid h-10 w-10 shrink-0 place-items-center rounded-full bg-honey-400 text-forest-950 transition-transform hover:scale-105"
          aria-label="View cart"
        >
          <ShoppingBag className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
