import { Link, useLocation, useNavigate } from "react-router-dom";
import { Hexagon, Mail, MapPin, MessageCircle } from "lucide-react";
import { waDefault, WHATSAPP_DISPLAY } from "../data/products";

const socialIcons: Array<{ label: string; node: React.ReactNode }> = [
  {
    label: "Instagram",
    node: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    node: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    node: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
        <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
        <path d="m10 15 5-3-5-3z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const location = useLocation();
  const navigate = useNavigate();

  const goSection = (id: string) => {
    if (location.pathname === "/") {
      document
        .getElementById(id)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      navigate("/", { state: { scrollTo: id } });
    }
  };

  const shopLinks: Array<{ label: string; action: () => void }> = [
    { label: "Raw Honey & Infusions", action: () => navigate("/shop?cat=honey") },
    { label: "Health Malts & Grains", action: () => navigate("/shop?cat=malts") },
    { label: "Herbal Powders", action: () => navigate("/shop?cat=herbal") },
    { label: "Sweeteners & Gulkand", action: () => navigate("/shop?cat=sweeteners") },
    { label: "Ghee & Pantry", action: () => navigate("/shop?cat=pantry") },
    { label: "Gifts & Hampers", action: () => goSection("gifts") },
  ];

  const farmLinks: Array<{ label: string; action: () => void }> = [
    { label: "Our Story", action: () => navigate("/story") },
    { label: "Why Audatham", action: () => goSection("why") },
    { label: "From Field to Jar", action: () => goSection("process") },
    { label: "Your Basket", action: () => navigate("/cart") },
    { label: "Contact the Farm", action: () => navigate("/contact") },
  ];

  return (
    <footer className="scroll-mt-24 bg-forest-950 text-cream-100/65">
      <div className="mx-auto max-w-7xl px-4 pt-16 pb-8 sm:px-6 md:pt-20 lg:px-8">
        <div className="grid gap-12 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <Link to="/" className="inline-flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-honey-400">
                <Hexagon className="h-4 w-4 fill-forest-950 text-forest-950" />
              </span>
              <span>
                <span className="block font-display text-xl font-semibold tracking-[0.16em] text-cream-50">
                  AUDATHAM
                </span>
                <span className="block text-[8.5px] font-bold uppercase tracking-[0.34em] text-cream-100/45">
                  Pure · Wild · Unfiltered
                </span>
              </span>
            </Link>
            <p className="mt-6 max-w-sm text-sm leading-relaxed">
              Raw harvests from our family farm in the Cauvery delta — honey,
              malts, herbal powders, traditional sweeteners and pantry staples,
              gathered with respect and bottled slowly since 1984.
            </p>
            <div className="mt-7 space-y-3 text-sm">
              <a
                href={waDefault}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 transition-colors hover:text-honey-300"
              >
                <MessageCircle className="h-4 w-4 text-honey-400" />
                {WHATSAPP_DISPLAY}
              </a>
              <a
                href="mailto:hello@audatham.in"
                className="flex items-center gap-3 transition-colors hover:text-honey-300"
              >
                <Mail className="h-4 w-4 text-honey-400" />
                hello@audatham.in
              </a>
              <p className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-honey-400" />
                <span>
                  Audatham Farms, SF.No.592/23, Door No.105/2,
                  <br />
                  AvalurPettai Salai (Thindivanam Salai Jn. Corner),
                  <br />
                  Kilpennathur, Tiruvannamalai, Tamil Nadu – 604 601
                </span>
              </p>
            </div>
            <div className="mt-7 flex gap-3">
              {socialIcons.map((social) => (
                <a
                  key={social.label}
                  href={waDefault}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-cream-50/15 text-cream-100/70 transition-all hover:-translate-y-1 hover:border-honey-400/50 hover:text-honey-300"
                >
                  {social.node}
                </a>
              ))}
            </div>
          </div>

          {/* Shop links */}
          <div className="md:col-span-2">
            <h4 className="text-[11px] font-extrabold uppercase tracking-[0.28em] text-honey-300">
              Shop
            </h4>
            <ul className="mt-5 space-y-3 text-sm">
              {shopLinks.map((l) => (
                <li key={l.label}>
                  <button
                    onClick={l.action}
                    className="cursor-pointer transition-colors hover:text-honey-300"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Farm links */}
          <div className="md:col-span-2">
            <h4 className="text-[11px] font-extrabold uppercase tracking-[0.28em] text-honey-300">
              The Farm
            </h4>
            <ul className="mt-5 space-y-3 text-sm">
              {farmLinks.map((l) => (
                <li key={l.label}>
                  <button
                    onClick={l.action}
                    className="cursor-pointer transition-colors hover:text-honey-300"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Visit */}
          <div className="md:col-span-3">
            <h4 className="text-[11px] font-extrabold uppercase tracking-[0.28em] text-honey-300">
              Visit the Farm
            </h4>
            <p className="mt-5 text-sm leading-relaxed">
              Open for farm walks on Saturdays and Sundays, 9 AM – 4 PM.
              Harvest mornings by prior booking.
            </p>
            <div className="mt-5 rounded-2xl border border-cream-50/10 bg-cream-50/5 p-4 text-sm">
              <p className="font-extrabold tracking-wide text-cream-50">
                Current harvest
              </p>
              <p className="mt-1 text-cream-100/60">
                Batch #39 · Wild forest honey — bottling this Sunday.
              </p>
            </div>
            <Link
              to="/contact"
              className="mt-5 inline-block text-[11px] font-extrabold uppercase tracking-[0.22em] text-honey-300 transition-colors hover:text-honey-200"
            >
              Get directions & hours →
            </Link>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-cream-50/10 pt-7 text-[11px] tracking-wide text-cream-100/40 sm:flex-row">
          <p>© {new Date().getFullYear()} Audatham Farms · All rights reserved</p>
          <p className="text-center">FSSAI Lic. No. 22424012345678</p>
          <p>Bottled slowly in Tamil Nadu since 1984</p>
        </div>
      </div>
    </footer>
  );
}
