import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CardLink } from "@/components/CardLink";
import { guideArticles } from "@/lib/guides";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Freight and Warehouse Planning Guides",
  description:
    "Read practical guides about dimensional weight, freight density, pallet planning, container loading, and warehouse space planning.",
  path: "/guides"
});

export default function GuidesPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Guides" }]} />
      <section className="mt-6 rounded-lg border border-line bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-wide text-mint">
          Operations guides
        </p>
        <h1 className="mt-3 text-4xl font-bold text-ink">
          Freight and warehouse planning guides
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-steel">
          Practical articles that explain the assumptions behind shipping,
          freight, pallet, container, and warehouse calculations. These guides
          support the calculator pages and give teams context for real planning
          decisions.
        </p>
      </section>
      <section className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {guideArticles.map((guide) => (
          <CardLink
            description={guide.description}
            href={`/guides/${guide.slug}`}
            key={guide.slug}
            label={guide.category}
            title={guide.title}
          />
        ))}
      </section>
    </main>
  );
}
