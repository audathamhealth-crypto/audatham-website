import { useState, type FormEvent } from "react";
import { Link, Navigate } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle2,
  ChevronRight,
  MessageCircle,
} from "lucide-react";
import { Reveal } from "../components/Reveal";
import { useCart } from "../store/cart";
import { formatINR, waCartMessage, WHATSAPP_DISPLAY } from "../data/products";

interface FormState {
  name: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;
  note: string;
}

const emptyForm: FormState = {
  name: "",
  phone: "",
  address: "",
  city: "",
  pincode: "",
  note: "",
};

const inputCls =
  "w-full rounded-2xl border border-bark-900/15 bg-white px-4.5 py-3.5 text-sm font-semibold text-forest-900 outline-none transition-colors placeholder:font-medium placeholder:text-bark-400/60 focus:border-honey-500";

export default function CheckoutPage() {
  const { lines, total, count, clear } = useCart();
  const [form, setForm] = useState<FormState>(emptyForm);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [placed, setPlaced] = useState(false);

  if (placed) {
    return (
      <div className="mx-auto flex min-h-[75vh] max-w-7xl items-center justify-center px-4 pt-24 pb-20 sm:px-6 lg:px-8">
        <Reveal className="max-w-lg text-center">
          <span className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-[#23a55b]/10 text-[#23a55b]">
            <CheckCircle2 className="h-11 w-11" />
          </span>
          <h1 className="mt-7 font-display text-4xl font-medium text-forest-900">
            Order sent to the farm.
          </h1>
          <p className="mt-4 leading-relaxed text-bark-500">
            Your order has been handed to WhatsApp. If the chat didn't open
            automatically, message us at{" "}
            <span className="font-bold text-forest-900">
              {WHATSAPP_DISPLAY}
            </span>{" "}
            — the family usually confirms within the hour, 8 AM – 8 PM.
          </p>
          <p className="mt-3 text-sm font-bold text-honey-700">
            Pay on delivery or by UPI once we confirm your batch.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              to="/shop"
              className="inline-flex items-center justify-center rounded-full bg-forest-800 px-8 py-4 text-[11px] font-extrabold uppercase tracking-[0.2em] text-cream-50 transition-all hover:-translate-y-0.5 hover:bg-forest-700"
            >
              Continue shopping
            </Link>
            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-full border border-forest-800/25 px-8 py-4 text-[11px] font-extrabold uppercase tracking-[0.2em] text-forest-800 transition-all hover:bg-forest-800/5"
            >
              Back home
            </Link>
          </div>
        </Reveal>
      </div>
    );
  }

  if (lines.length === 0) return <Navigate to="/cart" replace />;

  const set =
    (field: keyof FormState) =>
    (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      setForm((f) => ({ ...f, [field]: e.target.value }));
      setErrors((er) => ({ ...er, [field]: undefined }));
    };

  const placeOrder = (e: FormEvent) => {
    e.preventDefault();
    const next: Partial<FormState> = {};
    if (!form.name.trim()) next.name = "Please tell us your name.";
    if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\D/g, "").slice(-10)))
      next.phone = "Enter a valid 10-digit Indian mobile number.";
    if (form.address.trim().length < 10)
      next.address = "Please add your full delivery address.";
    if (form.pincode && !/^\d{6}$/.test(form.pincode.trim()))
      next.pincode = "6-digit pincode.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    const address = [
      form.address.trim(),
      [form.city.trim(), form.pincode.trim()].filter(Boolean).join(" "),
    ]
      .filter(Boolean)
      .join(", ");
    const phone = form.phone.replace(/\D/g, "").slice(-10);

    const messageLines = lines.map((l) => ({
      name: l.product.name,
      size: l.size,
      qty: l.qty,
      lineTotal: l.price * l.qty,
    }));

    let url = waCartMessage(messageLines, total, {
      name: form.name.trim(),
      phone,
      address,
    });
    if (form.note.trim()) {
      url += encodeURIComponent(`\nNote: ${form.note.trim()}`);
    }
    window.open(url, "_blank", "noopener");
    clear();
    setPlaced(true);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 pt-28 pb-20 sm:px-6 md:pt-36 lg:px-8">
      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-bark-400"
      >
        <Link to="/cart" className="transition-colors hover:text-forest-800">
          Basket
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-honey-700">Checkout</span>
      </nav>

      <Reveal>
        <h1 className="mt-5 font-display text-4xl leading-[1.04] font-medium tracking-tight text-forest-900 sm:text-5xl">
          Almost at the <em className="text-honey-600">farm gate</em>.
        </h1>
        <p className="mt-4 max-w-xl leading-relaxed text-bark-500">
          No accounts, no online payment. Fill in your details and we'll open
          WhatsApp with your complete order — the family confirms stock and a
          delivery slot on chat.
        </p>
      </Reveal>

      <form
        onSubmit={placeOrder}
        noValidate
        className="mt-10 grid gap-10 lg:grid-cols-[1fr_380px] lg:items-start"
      >
        {/* Details */}
        <Reveal delay={80}>
          <div className="rounded-[1.75rem] border border-bark-900/10 bg-white p-6 sm:p-8">
            <h2 className="font-display text-2xl font-semibold text-forest-900">
              Delivery details
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="co-name"
                  className="mb-1.5 block text-[10px] font-extrabold uppercase tracking-[0.2em] text-bark-500"
                >
                  Full name *
                </label>
                <input
                  id="co-name"
                  value={form.name}
                  onChange={set("name")}
                  placeholder="Meera Krishnan"
                  className={inputCls}
                />
                {errors.name && (
                  <p className="mt-1.5 text-xs font-bold text-red-500">
                    {errors.name}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="co-phone"
                  className="mb-1.5 block text-[10px] font-extrabold uppercase tracking-[0.2em] text-bark-500"
                >
                  Phone *
                </label>
                <input
                  id="co-phone"
                  value={form.phone}
                  onChange={set("phone")}
                  inputMode="numeric"
                  placeholder="98xxxxxx90"
                  className={inputCls}
                />
                {errors.phone && (
                  <p className="mt-1.5 text-xs font-bold text-red-500">
                    {errors.phone}
                  </p>
                )}
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="co-address"
                  className="mb-1.5 block text-[10px] font-extrabold uppercase tracking-[0.2em] text-bark-500"
                >
                  Address *
                </label>
                <textarea
                  id="co-address"
                  value={form.address}
                  onChange={set("address")}
                  rows={3}
                  placeholder="Door no, street, area, landmark…"
                  className={`${inputCls} resize-none`}
                />
                {errors.address && (
                  <p className="mt-1.5 text-xs font-bold text-red-500">
                    {errors.address}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="co-city"
                  className="mb-1.5 block text-[10px] font-extrabold uppercase tracking-[0.2em] text-bark-500"
                >
                  City / Town
                </label>
                <input
                  id="co-city"
                  value={form.city}
                  onChange={set("city")}
                  placeholder="Tiruvannamalai"
                  className={inputCls}
                />
              </div>
              <div>
                <label
                  htmlFor="co-pin"
                  className="mb-1.5 block text-[10px] font-extrabold uppercase tracking-[0.2em] text-bark-500"
                >
                  Pincode
                </label>
                <input
                  id="co-pin"
                  value={form.pincode}
                  onChange={set("pincode")}
                  inputMode="numeric"
                  placeholder="604601"
                  className={inputCls}
                />
                {errors.pincode && (
                  <p className="mt-1.5 text-xs font-bold text-red-500">
                    {errors.pincode}
                  </p>
                )}
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="co-note"
                  className="mb-1.5 block text-[10px] font-extrabold uppercase tracking-[0.2em] text-bark-500"
                >
                  Note for the farm (optional)
                </label>
                <input
                  id="co-note"
                  value={form.note}
                  onChange={set("note")}
                  placeholder="Gift wrap? Leave at gate? Tell us here."
                  className={inputCls}
                />
              </div>
            </div>
          </div>
        </Reveal>

        {/* Summary */}
        <Reveal delay={140} className="lg:sticky lg:top-28">
          <aside className="rounded-[1.75rem] border border-bark-900/10 bg-white p-6 sm:p-7">
            <h2 className="font-display text-2xl font-semibold text-forest-900">
              Your order
            </h2>
            <ul className="mt-5 max-h-64 space-y-3 overflow-y-auto pr-1">
              {lines.map((l) => (
                <li key={l.key} className="flex items-center gap-3">
                  <img
                    src={l.product.image}
                    alt={l.product.name}
                    className="h-12 w-12 shrink-0 rounded-lg object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold text-forest-900">
                      {l.product.name}
                    </p>
                    <p className="text-[11px] font-semibold text-bark-400">
                      {l.size} × {l.qty}
                    </p>
                  </div>
                  <span className="text-sm font-extrabold text-forest-900">
                    {formatINR(l.price * l.qty)}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-5 space-y-2 border-t border-bark-900/10 pt-4 text-sm">
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
                  {total >= 999 ? "Free" : "On WhatsApp"}
                </span>
              </div>
              <div className="flex items-center justify-between border-t border-bark-900/10 pt-3">
                <span className="text-sm font-bold text-bark-500">Total</span>
                <span className="font-display text-2xl font-semibold text-forest-900">
                  {formatINR(total)}
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="mt-5 flex w-full items-center justify-center gap-2.5 rounded-full bg-[#23a55b] py-4 text-[11px] font-extrabold uppercase tracking-[0.2em] text-white shadow-lg shadow-[#23a55b]/30 transition-all hover:-translate-y-0.5 hover:bg-[#1d8f4e]"
            >
              <MessageCircle className="h-4 w-4" />
              Place Order on WhatsApp
            </button>
            <p className="mt-3 text-center text-[11px] leading-relaxed text-bark-500">
              Opens WhatsApp ({WHATSAPP_DISPLAY}) with your order ready to
              send. COD or UPI after confirmation.
            </p>
            <Link
              to="/cart"
              className="mt-4 flex items-center justify-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.2em] text-bark-500 transition-colors hover:text-forest-800"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to basket
            </Link>
          </aside>
        </Reveal>
      </form>
    </div>
  );
}
