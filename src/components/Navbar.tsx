import { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  Hexagon,
  Languages,
  Menu,
  MessageCircle,
  Search,
  ShoppingBag,
  X,
} from "lucide-react";
import { cn } from "../utils/cn";
import { useCart } from "../store/cart";
import { waDefault, WHATSAPP_DISPLAY } from "../data/products";

// ─── Translation context ──────────────────────────────────────────────────────
// A simple module-level signal so other components can read the lang.
// For a real app you'd use React context; this keeps the change minimal.
export type Lang = "en" | "ta";
let _lang: Lang = "en";
const _listeners: Set<(l: Lang) => void> = new Set();
export function getLang(): Lang { return _lang; }
export function setLang(l: Lang) {
  _lang = l;
  _listeners.forEach((fn) => fn(l));
}
export function useLang(): [Lang, (l: Lang) => void] {
  const [lang, setLocal] = useState<Lang>(_lang);
  useEffect(() => {
    const handler = (l: Lang) => setLocal(l);
    _listeners.add(handler);
    return () => { _listeners.delete(handler); };
  }, []);
  return [lang, setLang];
}

// ─── Nav labels in both languages ────────────────────────────────────────────
const navLabels = {
  en: {
    story: "Our Story",
    shop: "Shop",
    gifts: "Gifts",
    contact: "Contact",
    whatsapp: "WhatsApp",
    langBtn: "தமிழ்",
    langAriaLabel: "Switch to Tamil",
    tagline: "Pure · Wild · Unfiltered",
    location: "Kilpennathur · Tiruvannamalai · Since 1984",
  },
  ta: {
    story: "எங்கள் கதை",
    shop: "கடை",
    gifts: "பரிசுகள்",
    contact: "தொடர்பு",
    whatsapp: "வாட்ஸ்ஆப்",
    langBtn: "English",
    langAriaLabel: "Switch to English",
    tagline: "தூய · காட்டு · வடிகட்டாத",
    location: "கிள்ளிப்பேண்ணாதூர் · திருவண்ணாமலை · 1984 முதல்",
  },
};

type NavItem = { labelKey: "story" | "shop" | "gifts" | "contact" } & (
  | { to: string; section?: never }
  | { section: string; to?: never }
);

const links: NavItem[] = [
  { labelKey: "story", to: "/story" },
  { labelKey: "shop", to: "/shop" },
  { labelKey: "gifts", section: "gifts" },
  { labelKey: "contact", to: "/contact" },
];

export default function Navbar({
  onCartOpen,
  onSearchOpen,
}: {
  onCartOpen: () => void;
  onSearchOpen: () => void;
}) {
  const { count } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [lang, setLanguage] = useLang();

  const t = navLabels[lang];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const goSection = (id: string) => {
    if (location.pathname === "/") {
      document
        .getElementById(id)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      navigate("/", { state: { scrollTo: id } });
    }
  };

  const navLinkCls = ({ isActive }: { isActive: boolean }) =>
    cn(
      "group relative text-[13px] font-bold uppercase tracking-[0.18em] transition-colors",
      isActive ? "text-forest-900" : "text-forest-900/70 hover:text-forest-900"
    );

  const toggleLang = () => setLanguage(lang === "en" ? "ta" : "en");

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled || location.pathname !== "/"
            ? "bg-cream-50/90 shadow-[0_1px_0_rgba(59,42,20,0.08),0_20px_40px_-30px_rgba(34,26,16,0.25)] backdrop-blur-md"
            : "bg-transparent"
        )}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 md:h-20 lg:px-8">
          {/* Logo */}
          <NavLink to="/" className="group flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-forest-800 shadow-md shadow-forest-900/30 transition-transform duration-500 group-hover:rotate-12">
              <Hexagon className="h-4 w-4 fill-honey-400 text-honey-300" />
            </span>
            <span>
              <span className="block font-display text-lg font-semibold tracking-[0.16em] text-forest-900 md:text-xl">
                AUDATHAM
              </span>
              <span className="block text-[8.5px] font-bold uppercase tracking-[0.34em] text-bark-500">
                {t.tagline}
              </span>
            </span>
          </NavLink>

          {/* Desktop links */}
          <nav className="hidden items-center gap-8 lg:flex">
            {links.map((link) =>
              link.to ? (
                <NavLink key={link.labelKey} to={link.to} className={navLinkCls}>
                  {t[link.labelKey]}
                </NavLink>
              ) : (
                <button
                  key={link.labelKey}
                  onClick={() => goSection(link.section as string)}
                  className="group relative text-[13px] font-bold uppercase tracking-[0.18em] text-forest-900/70 transition-colors hover:text-forest-900"
                >
                  {t[link.labelKey]}
                  <span className="absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-0 bg-honey-500 transition-transform duration-400 group-hover:scale-x-100" />
                </button>
              )
            )}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Language toggle */}
            <button
              onClick={toggleLang}
              aria-label={t.langAriaLabel}
              title={t.langAriaLabel}
              className="hidden items-center gap-1.5 rounded-full border border-bark-900/15 bg-cream-100/60 px-3 py-2 text-[11px] font-extrabold uppercase tracking-[0.14em] text-forest-900 transition-all hover:bg-honey-100 hover:border-honey-400 lg:inline-flex"
            >
              <Languages className="h-3.5 w-3.5 text-honey-600" />
              {t.langBtn}
            </button>

            <a
              href={waDefault}
              target="_blank"
              rel="noreferrer"
              className="mr-1 hidden items-center gap-2 rounded-full bg-forest-800 px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.16em] text-cream-50 shadow-lg shadow-forest-900/25 transition-all hover:-translate-y-0.5 hover:bg-forest-700 lg:inline-flex"
            >
              <MessageCircle className="h-3.5 w-3.5 text-honey-300" />
              {t.whatsapp}
            </a>
            <button
              onClick={onSearchOpen}
              aria-label="Search products"
              className="grid h-10 w-10 place-items-center rounded-full text-forest-900 transition-colors hover:bg-forest-800/5"
            >
              <Search className="h-[18px] w-[18px]" />
            </button>
            <button
              onClick={onCartOpen}
              aria-label="Open cart"
              className="relative grid h-10 w-10 place-items-center rounded-full text-forest-900 transition-colors hover:bg-forest-800/5"
            >
              <ShoppingBag className="h-[18px] w-[18px]" />
              {count > 0 && (
                <span
                  key={count}
                  className="anim-fade-up absolute -top-0.5 -right-0.5 grid h-5 w-5 place-items-center rounded-full bg-honey-500 text-[10px] font-extrabold text-forest-950 ring-2 ring-cream-50"
                >
                  {count}
                </span>
              )}
            </button>
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className="grid h-10 w-10 place-items-center rounded-full text-forest-900 transition-colors hover:bg-forest-800/5 lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={cn(
          "fixed inset-0 z-[70] flex flex-col bg-forest-950 transition-all duration-500 lg:hidden",
          menuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        )}
      >
        <div className="flex h-16 items-center justify-between px-4 sm:px-6">
          <span className="font-display text-lg font-semibold tracking-[0.16em] text-cream-50">
            AUDATHAM
          </span>
          <div className="flex items-center gap-2">
            {/* Mobile language toggle */}
            <button
              onClick={toggleLang}
              aria-label={t.langAriaLabel}
              className="flex items-center gap-1.5 rounded-full border border-cream-50/20 bg-cream-50/10 px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.14em] text-cream-50 transition-all hover:bg-honey-400/20"
            >
              <Languages className="h-3.5 w-3.5 text-honey-400" />
              {t.langBtn}
            </button>
            <button
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              className="grid h-10 w-10 place-items-center rounded-full bg-cream-50/10 text-cream-50"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
        <nav className="flex flex-1 flex-col justify-center gap-2 px-8">
          {links.map((link, i) =>
            link.to ? (
              <NavLink
                key={link.labelKey}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className={cn(
                  "group flex items-baseline gap-4 border-b border-cream-50/10 py-5 transition-all duration-500",
                  menuOpen
                    ? "translate-y-0 opacity-100"
                    : "translate-y-6 opacity-0"
                )}
                style={{
                  transitionDelay: menuOpen ? `${120 + i * 90}ms` : "0ms",
                }}
              >
                <span className="font-display text-sm italic text-honey-400">
                  0{i + 1}
                </span>
                <span className="font-display text-4xl font-medium text-cream-50 transition-colors group-hover:text-honey-300">
                  {t[link.labelKey]}
                </span>
              </NavLink>
            ) : (
              <button
                key={link.labelKey}
                onClick={() => {
                  setMenuOpen(false);
                  goSection(link.section as string);
                }}
                className={cn(
                  "group flex items-baseline gap-4 border-b border-cream-50/10 py-5 text-left transition-all duration-500",
                  menuOpen
                    ? "translate-y-0 opacity-100"
                    : "translate-y-6 opacity-0"
                )}
                style={{
                  transitionDelay: menuOpen ? `${120 + i * 90}ms` : "0ms",
                }}
              >
                <span className="font-display text-sm italic text-honey-400">
                  0{i + 1}
                </span>
                <span className="font-display text-4xl font-medium text-cream-50 transition-colors group-hover:text-honey-300">
                  {t[link.labelKey]}
                </span>
              </button>
            )
          )}
        </nav>
        <div className="px-8 pb-10">
          <a
            href={waDefault}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-3 rounded-full bg-honey-400 py-4 text-xs font-extrabold uppercase tracking-[0.2em] text-forest-950"
          >
            <MessageCircle className="h-4 w-4" />
            {t.whatsapp} {WHATSAPP_DISPLAY}
          </a>
          <p className="mt-4 text-center text-[11px] uppercase tracking-[0.25em] text-cream-100/40">
            {t.location}
          </p>
        </div>
      </div>
    </>
  );
}
