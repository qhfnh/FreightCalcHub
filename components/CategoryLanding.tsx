import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CardLink } from "@/components/CardLink";
import type { CalculatorCategory } from "@/lib/categories";
import { getRelatedCalculators } from "@/lib/calculator-content";

export function CategoryLanding({ category }: { category: CalculatorCategory }) {
  const calculators = getRelatedCalculators(category.calculatorSlugs);

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: category.title }
        ]}
      />
      <section className="mt-6 rounded-lg border border-line bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-wide text-mint">
          Calculator category
        </p>
        <h1 className="mt-3 text-4xl font-bold text-ink">{category.title}</h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-steel">
          {category.description}
        </p>
      </section>
      <section className="mt-8">
        <h2 className="text-2xl font-bold text-ink">Tools in this category</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {calculators.map((calculator) => (
            <CardLink
              description={calculator.metaDescription}
              href={`/calculators/${calculator.slug}`}
              key={calculator.slug}
              title={calculator.title}
            />
          ))}
        </div>
      </section>
      <section className="prose-site mt-8 rounded-lg border border-line bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-ink">
          Why these calculations matter
        </h2>
        <p>
          Shipping, freight, pallet, container, and warehouse decisions are tied
          together. A carton change can affect dimensional weight, pallet count,
          freight density, container loading, and storage positions. Reviewing
          the numbers in one category helps teams make better choices before
          they commit to rates, packaging, or space.
        </p>
        <p>
          These calculators are built for planning and communication. They help
          operators explain assumptions, compare scenarios, and identify which
          requirements need confirmation from a carrier, warehouse, NMFC source,
          supplier, or loading team.
        </p>
      </section>
    </main>
  );
}
