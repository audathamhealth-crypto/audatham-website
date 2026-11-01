import { Link } from "react-router-dom";
import { ArrowRight, Sprout } from "lucide-react";
import { Reveal, SectionHead } from "./Reveal";
import ProductCard from "./ProductCard";
import { featuredProducts, products } from "../data/products";

export default function Products() {
  return (
    <section id="shop" className="scroll-mt-24 bg-cream-100/70 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHead
          eyebrow="Featured Products"
          title={
            <>
              This week's <em className="text-honey-600">bottling</em>.
            </>
          }
          sub="A curated shelf from Batch #39 — our most-loved jars, malts, powders and pantry staples from the farm."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProducts.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>

        {/* Full catalogue banner */}
        <Reveal delay={120}>
          <div className="mt-16 overflow-hidden rounded-[2rem] border border-bark-900/10 bg-forest-900">
            <div className="grid items-center gap-8 p-8 sm:p-10 md:grid-cols-[1fr_auto] md:p-12">
              <div>
                <p className="flex items-center gap-3 text-[11px] font-extrabold uppercase tracking-[0.3em] text-honey-300">
                  <Sprout className="h-4 w-4" />
                  The full pantry
                </p>
                <h3 className="mt-4 font-display text-3xl font-medium text-cream-50 sm:text-4xl">
                  All {products.length} farmhouse products, in one place.
                </h3>
                <p className="mt-3 max-w-lg text-sm leading-relaxed text-cream-100/60">
                  Honey, infusions, malts, herbal powders, karupatti, gulkand,
                  ghee and more — priced by the farm, shipped across India.
                </p>
              </div>
              <Link
                to="/shop"
                className="group inline-flex shrink-0 items-center justify-center gap-3 rounded-full bg-honey-400 px-7 py-4 text-[11px] font-extrabold uppercase tracking-[0.2em] text-forest-950 transition-all hover:-translate-y-0.5 hover:bg-honey-300"
              >
                Browse the shop
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
