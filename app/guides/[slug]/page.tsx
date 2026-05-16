import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { calculatorPages } from "@/lib/calculator-content";
import { getGuideBySlug, guideArticles } from "@/lib/guides";
import { buildMetadata } from "@/lib/seo";

interface GuideRouteProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return guideArticles.map((guide) => ({
    slug: guide.slug
  }));
}

export async function generateMetadata({
  params
}: GuideRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);

  if (!guide) {
    return {};
  }

  return buildMetadata({
    title: guide.title,
    description: guide.description,
    path: `/guides/${guide.slug}`
  });
}

export default async function GuideArticlePage({ params }: GuideRouteProps) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);

  if (!guide) {
    notFound();
  }

  const relatedCalculators = calculatorPages
    .filter((calculator) => calculator.relatedGuideSlugs.includes(guide.slug))
    .slice(0, 4);

  return (
    <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Guides", href: "/guides" },
          { label: guide.title }
        ]}
      />
      <article className="prose-site mt-6 rounded-lg border border-line bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-wide text-mint">
          {guide.category}
        </p>
        <h1 className="mt-3 text-4xl font-bold text-ink">{guide.title}</h1>
        <p className="text-lg leading-8 text-steel">{guide.description}</p>
        {guide.body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <h2 className="mt-8 text-2xl font-bold text-ink">
          Calculators that support this topic
        </h2>
        <ul>
          {relatedCalculators.map((calculator) => (
            <li key={calculator.slug}>
              <a href={`/calculators/${calculator.slug}`}>{calculator.title}</a>
            </li>
          ))}
        </ul>
      </article>
    </main>
  );
}
