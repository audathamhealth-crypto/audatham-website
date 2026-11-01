import { useNavigate } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Reveal, SectionHead } from "./Reveal";
import { categories } from "../data/products";

export default function Categories() {
  const navigate = useNavigate();
  return (
    <section
      id="categories"
      className="relative scroll-mt-24 py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHead
          eyebrow="Shop Categories"
          title={
            <>
              Five shelves, one{" "}
              <em className="text-honey-600">farmhouse larder</em>.
            </>
          }
          sub="From rare single-origin honeys to sprouted malts, herbal powders, karupatti and cultured ghee — everything Audatham makes."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {categories.map((cat, i) => (
            <Reveal key={cat.id} delay={i * 100}>
              <button
                onClick={() => navigate(`/shop?cat=${cat.id}`)}
                className="group relative block w-full overflow-hidden rounded-[1.75rem] text-left shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_35px_60px_-25px_rgba(23,41,30,0.5)]"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.08]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-950/85 via-forest-950/20 to-transparent" />
                </div>

                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.26em] text-honey-300">
                    {cat.count}
                  </p>
                  <div className="mt-1.5 flex items-end justify-between gap-3">
                    <div>
                      <h3 className="font-display text-2xl leading-tight font-medium text-cream-50">
                        {cat.name}
                      </h3>
                      <p className="mt-1 text-xs text-cream-100/65">
                        {cat.note}
                      </p>
                    </div>
                    <span className="grid h-10 w-10 shrink-0 -translate-y-1 place-items-center rounded-full border border-cream-50/30 text-cream-50 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:bg-honey-400 group-hover:text-forest-950 group-hover:opacity-100">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
