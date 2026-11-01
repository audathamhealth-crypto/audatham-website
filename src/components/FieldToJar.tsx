import { Reveal, SectionHead } from "./Reveal";

const steps = [
  {
    number: "01",
    title: "Gather, sprout, harvest",
    text: "Wild frames lifted respectfully; millets sprouted in the shade; herbs and roots dug by hand — only what the land gives seasonally.",
    image:
      "https://images.pexels.com/photos/17027089/pexels-photo-17027089.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    alt: "Beekeeper gently examining a honeycomb frame",
  },
  {
    number: "02",
    title: "Slow-making",
    text: "No heat, no pressure filters. Honey rests 48 hours; malts dry on open terraces; karupatti bubbles in iron pans over wood fire.",
    image:
      "https://images.pexels.com/photos/4921856/pexels-photo-4921856.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    alt: "Fresh honeycomb pieces resting with their honey",
  },
  {
    number: "03",
    title: "Bottle, name, number",
    text: "Every jar and packet is filled in weekly micro-batches, hand-sealed and numbered by batch — this week, Batch #39 is on the shelf.",
    image:
      "https://images.pexels.com/photos/39441320/pexels-photo-39441320.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    alt: "Golden honey being poured slowly",
  },
];

export default function FieldToJar() {
  return (
    <section className="scroll-mt-24 px-3 py-20 md:px-6 md:py-28" id="process">
      <div
        className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-forest-900 px-6 py-16 sm:px-10 md:py-24 lg:px-16"
        style={{
          backgroundImage:
            "radial-gradient(rgba(233,202,119,0.07) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
        }}
      >
        <div className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full bg-honey-500/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 -left-24 h-96 w-96 rounded-full bg-forest-600/30 blur-3xl" />

        <div className="relative">
          <SectionHead
            inverted
            eyebrow="From Field to Jar"
            title={
              <>
                Three slow steps.{" "}
                <em className="text-honey-300">No fourth.</em>
              </>
            }
            sub="Industrial food is rushed through pipes and pressure. Ours is gathered, sprouted, stirred and bottled by hand, on the farm's own clock."
          />

          <div className="mt-16 grid gap-10 md:grid-cols-3 md:gap-6 lg:gap-10">
            {steps.map((step, i) => (
              <Reveal key={step.number} delay={i * 140}>
                <div className="group relative">
                  <span
                    aria-hidden
                    className="absolute -top-8 left-1/2 hidden w-full border-t border-dashed border-honey-300/25 md:block"
                    style={{ display: i === 0 ? "none" : undefined }}
                  />
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-cream-50/10">
                    <img
                      src={step.image}
                      alt={step.alt}
                      className="h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.06]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-forest-950/50 to-transparent" />
                  </div>
                  <p className="mt-7 font-display text-5xl font-medium italic text-honey-400/90">
                    {step.number}
                  </p>
                  <h3 className="mt-3 font-display text-2xl font-medium text-cream-50">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-cream-100/60">
                    {step.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
