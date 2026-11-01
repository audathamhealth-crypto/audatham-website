import { useState, type FormEvent } from "react";
import {
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  Tractor,
} from "lucide-react";
import { Reveal } from "../components/Reveal";
import {
  waDefault,
  waLink,
  WHATSAPP_DISPLAY,
} from "../data/products";

const inputCls =
  "w-full rounded-2xl border border-bark-900/15 bg-white px-4.5 py-3.5 text-sm font-semibold text-forest-900 outline-none transition-colors placeholder:font-medium placeholder:text-bark-400/60 focus:border-honey-500";

const cards = [
  {
    icon: MessageCircle,
    title: "WhatsApp (fastest)",
    lines: [WHATSAPP_DISPLAY, "Replies within the hour, 8 AM – 8 PM"],
  },
  {
    icon: Phone,
    title: "Phone",
    lines: [WHATSAPP_DISPLAY, "Voice calls in Tamil & English"],
  },
  {
    icon: Mail,
    title: "Email",
    lines: ["hello@audatham.in", "For wholesale & gift enquiries"],
  },
  {
    icon: MapPin,
    title: "The farm",
    lines: [
      "SF.No.592/23, Door No.105/2, AvalurPettai Salai",
      "(Thindivanam Salai Jn. Corner), Kilpennathur",
      "Tiruvannamalai, Tamil Nadu – 604 601",
    ],
  },
];

export default function ContactPage() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const send = (e: FormEvent) => {
    e.preventDefault();
    const text = [
      "Vanakkam AUDATHAM!",
      name.trim() ? `I'm ${name.trim()}.` : "",
      message.trim() || "I have a question about your products.",
    ]
      .filter(Boolean)
      .join("\n");
    window.open(waLink(text), "_blank", "noopener");
  };

  return (
    <div className="mx-auto max-w-7xl px-4 pt-28 pb-20 sm:px-6 md:pt-36 lg:px-8">
      <Reveal className="max-w-2xl">
        <p className="flex items-center gap-3 text-[11px] font-extrabold uppercase tracking-[0.35em] text-honey-600">
          <span className="h-px w-8 bg-honey-500/50" />
          Contact
        </p>
        <h1 className="mt-5 font-display text-4xl leading-[1.04] font-medium tracking-tight text-forest-900 sm:text-6xl">
          The farm phone is <em className="text-honey-600">always on</em>.
        </h1>
        <p className="mt-5 leading-relaxed text-bark-500">
          Vanakkam! Questions about a batch, a bulk order, a wedding hamper or
          a farm visit — a person from the family answers, never a bot.
        </p>
      </Reveal>

      {/* Info cards */}
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card, i) => (
          <Reveal key={card.title} delay={i * 90}>
            <a
              href={
                card.title.startsWith("WhatsApp") || card.title === "Phone"
                  ? waDefault
                  : card.title === "Email"
                    ? "mailto:hello@audatham.in"
                    : "https://maps.google.com/?q=Avalurpettai+Salai,+Kilpennathur,+Tiruvannamalai,+Tamil+Nadu+604601"
              }
              target={
                card.title === "Email" ? undefined : "_blank"
              }
              rel="noreferrer"
              className="group flex h-full flex-col rounded-[1.5rem] border border-bark-900/10 bg-white p-6 transition-all duration-500 hover:-translate-y-1.5 hover:border-honey-500/40 hover:shadow-[0_30px_50px_-25px_rgba(97,74,51,0.35)]"
            >
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-forest-800 text-honey-300 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
                <card.icon className="h-4.5 w-4.5" />
              </span>
              <h2 className="mt-5 font-display text-lg font-semibold text-forest-900">
                {card.title}
              </h2>
              {card.lines.map((line) => (
                <p key={line} className="mt-1 text-sm text-bark-500">
                  {line}
                </p>
              ))}
            </a>
          </Reveal>
        ))}
      </div>

      <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:items-start">
        {/* Message form */}
        <Reveal>
          <form
            onSubmit={send}
            className="rounded-[1.75rem] border border-bark-900/10 bg-white p-6 sm:p-8"
          >
            <h2 className="font-display text-2xl font-semibold text-forest-900">
              Send us a message
            </h2>
            <p className="mt-2 text-sm text-bark-500">
              This opens WhatsApp with your message written out — the way we
              like to talk.
            </p>
            <div className="mt-6 grid gap-4">
              <div>
                <label
                  htmlFor="ct-name"
                  className="mb-1.5 block text-[10px] font-extrabold uppercase tracking-[0.2em] text-bark-500"
                >
                  Your name
                </label>
                <input
                  id="ct-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Meera Krishnan"
                  className={inputCls}
                />
              </div>
              <div>
                <label
                  htmlFor="ct-msg"
                  className="mb-1.5 block text-[10px] font-extrabold uppercase tracking-[0.2em] text-bark-500"
                >
                  Message *
                </label>
                <textarea
                  id="ct-msg"
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={5}
                  placeholder="I'd like to ask about the Kurinji honey availability…"
                  className={`${inputCls} resize-none`}
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2.5 rounded-full bg-[#23a55b] py-4 text-[11px] font-extrabold uppercase tracking-[0.2em] text-white shadow-lg shadow-[#23a55b]/30 transition-all hover:-translate-y-0.5 hover:bg-[#1d8f4e]"
              >
                <Send className="h-4 w-4" />
                Send via WhatsApp
              </button>
            </div>
          </form>
        </Reveal>

        {/* Map + visit */}
        <Reveal delay={120}>
          <div className="overflow-hidden rounded-[1.75rem] border border-bark-900/10 bg-white shadow-sm">
            <iframe
              title="AUDATHAM Farms — Kilpennathur, Tiruvannamalai, Tamil Nadu"
              src="https://maps.google.com/maps?q=Avalurpettai%20Salai%2C%20Kilpennathur%2C%20Tiruvannamalai%2C%20Tamil%20Nadu%20604601&z=13&output=embed"
              className="h-72 w-full border-0 sm:h-80"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="grid gap-5 p-6 sm:grid-cols-2 sm:p-7">
              <div className="flex gap-3">
                <Clock className="mt-0.5 h-5 w-5 shrink-0 text-honey-600" />
                <div>
                  <p className="text-sm font-extrabold text-forest-900">
                    Shop hours
                  </p>
                  <p className="mt-1 text-sm text-bark-500">
                    WhatsApp & calls
                    <br />
                    8 AM – 8 PM, every day
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <Tractor className="mt-0.5 h-5 w-5 shrink-0 text-honey-600" />
                <div>
                  <p className="text-sm font-extrabold text-forest-900">
                    Farm walks
                  </p>
                  <p className="mt-1 text-sm text-bark-500">
                    Sat & Sun, 9 AM – 4 PM
                    <br />
                    Harvest mornings by booking
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
