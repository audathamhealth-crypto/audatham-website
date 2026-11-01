import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { cn } from "../utils/cn";
import { waDefault, WHATSAPP_DISPLAY } from "../data/products";

export default function FloatingWhatsApp() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 480);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href={waDefault}
      target="_blank"
      rel="noreferrer"
      aria-label={`Chat with AUDATHAM on WhatsApp — ${WHATSAPP_DISPLAY}`}
      className={cn(
        "group fixed right-4 bottom-4 z-[70] flex items-center gap-2.5 rounded-full bg-[#23a55b] p-3.5 text-white shadow-[0_20px_45px_-15px_rgba(35,165,91,0.7)] transition-all duration-500 hover:-translate-y-1 hover:bg-[#1d8f4e] sm:right-6 sm:bottom-6 sm:py-3.5 sm:pr-6 sm:pl-4",
        show
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-24 opacity-0"
      )}
    >
      <span className="relative grid place-items-center">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/30" />
        <MessageCircle className="relative h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
      </span>
      <span className="hidden sm:block">
        <span className="block text-[9px] font-extrabold uppercase tracking-[0.22em] text-white/75">
          WhatsApp the farm
        </span>
        <span className="block text-[13px] font-extrabold tracking-wide">
          {WHATSAPP_DISPLAY}
        </span>
      </span>
    </a>
  );
}
