import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getProduct, type Product, type Variant } from "../data/products";

export interface CartLine {
  key: string;
  product: Product;
  size: string;
  price: number;
  qty: number;
}

export interface LastAdded {
  token: number;
  product: Product;
  size: string;
}

interface CartContextValue {
  lines: CartLine[];
  count: number;
  total: number;
  add: (product: Product, variant: Variant, qty?: number) => void;
  setQty: (key: string, qty: number) => void;
  remove: (key: string) => void;
  setVariant: (key: string, variant: Variant) => void;
  clear: () => void;
  lastAdded: LastAdded | null;
  dismissLast: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "audatham-cart-v1";

const makeKey = (productId: string, size: string) =>
  `${productId}__${size.replace(/\s/g, "")}`;

function linesFromMap(map: Record<string, number>): CartLine[] {
  return Object.entries(map)
    .map(([key, qty]): CartLine | null => {
      const sep = key.lastIndexOf("__");
      const product = getProduct(key.slice(0, sep));
      if (!product) return null;
      const size = key.slice(sep + 2);
      const variant =
        product.variants.find((v) => v.size.replace(/\s/g, "") === size) ??
        product.variants[0];
      return { key, product, size: variant.size, price: variant.price, qty };
    })
    .filter((l): l is CartLine => l !== null && l.qty > 0);
}

function loadInitial(): Record<string, number> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (typeof parsed !== "object" || parsed === null) return {};
    // Keep only entries that still map to real products & variants.
    return linesFromMap(parsed).reduce<Record<string, number>>((acc, l) => {
      acc[l.key] = l.qty;
      return acc;
    }, {});
  } catch {
    return {};
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Record<string, number>>(loadInitial);
  const [lastAdded, setLastAdded] = useState<LastAdded | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // storage full or unavailable — cart still works in memory
    }
  }, [cart]);

  const add = useCallback((product: Product, variant: Variant, qty = 1) => {
    const key = makeKey(product.id, variant.size);
    setCart((c) => ({ ...c, [key]: (c[key] ?? 0) + qty }));
    setLastAdded({ token: Date.now(), product, size: variant.size });
  }, []);

  const setQty = useCallback((key: string, qty: number) => {
    setCart((c) => {
      const next = { ...c };
      if (qty <= 0) delete next[key];
      else next[key] = Math.min(qty, 99);
      return next;
    });
  }, []);

  const remove = useCallback((key: string) => {
    setCart((c) => {
      const next = { ...c };
      delete next[key];
      return next;
    });
  }, []);

  const setVariant = useCallback((key: string, variant: Variant) => {
    setCart((c) => {
      const qty = c[key];
      if (!qty) return c;
      const sep = key.lastIndexOf("__");
      const productId = key.slice(0, sep);
      const newKey = makeKey(productId, variant.size);
      if (newKey === key) return c;
      const next = { ...c };
      delete next[key];
      next[newKey] = (next[newKey] ?? 0) + qty;
      return next;
    });
  }, []);

  const clear = useCallback(() => setCart({}), []);

  const dismissLast = useCallback(() => setLastAdded(null), []);

  const value = useMemo<CartContextValue>(() => {
    const lines = linesFromMap(cart);
    return {
      lines,
      count: lines.reduce((s, l) => s + l.qty, 0),
      total: lines.reduce((s, l) => s + l.qty * l.price, 0),
      add,
      setQty,
      remove,
      setVariant,
      clear,
      lastAdded,
      dismissLast,
    };
  }, [cart, add, setQty, remove, setVariant, clear, lastAdded, dismissLast]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
