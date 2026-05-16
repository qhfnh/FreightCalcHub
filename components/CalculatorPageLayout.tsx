import Link from "next/link";
import { AdSlot } from "@/components/AdSlot";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CalculatorWidget } from "@/components/CalculatorWidget";
import { FAQ } from "@/components/FAQ";
import {
  getRelatedCalculators,
  type CalculatorPageContent
} from "@/lib/calculator-content";
import { getGuideBySlug } from "@/lib/guides";

interface CalculatorPageLayoutProps {
  content: CalculatorPageContent;
}

export function CalculatorPageLayout({ content }: CalculatorPageLayoutProps) {
  const relatedCalculators = getRelatedCalculators(content.relatedCalculatorSlugs);
  const relatedCalculatorCards =
    content.relatedCalculatorCards ??
    relatedCalculators.map((calculator) => ({
      title: calculator.shortTitle,
      href: `/calculators/${calculator.slug}`,
      description: calculator.metaDescription
    }));
  const relatedGuides = content.relatedGuideSlugs
    .map((slug) => getGuideBySlug(slug))
    .filter(Boolean);

  return (
    <main>
      <section className="border-b border-line bg-[#eef4f2]">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: content.categoryTitle, href: content.categoryPath },
              { label: content.title }
            ]}
          />
          <div className="mt-6">
            <div className="rounded-2xl border border-line bg-white p-2 shadow-soft sm:p-3">
              <CalculatorWidget
                title={content.title}
                type={content.calculatorType}
              />
            </div>

            <div className="mt-8 max-w-4xl">
              <p className="text-sm font-semibold uppercase tracking-wide text-mint">
                {content.categoryTitle}
              </p>
              <h1 className="mt-3 text-4xl font-black tracking-tight text-ink sm:text-5xl">
                {content.title}
              </h1>
              <p className="mt-5 text-lg leading-8 text-steel">
                {content.intro[0]}
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {["Live estimate", "Local calculation", "No signup"].map(
                  (item) => (
                    <div
                      className="rounded-lg border border-line bg-white/80 px-4 py-3 text-sm font-semibold text-ink shadow-sm"
                      key={item}
                    >
                      {item}
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <AdSlot
          className="mb-8"
          label="Top content advertising"
          slot="top-content"
        />

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
          <article className="space-y-8">
            <section className="prose-site rounded-lg border border-line bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-ink">Quick overview</h2>
              {content.intro.slice(1).map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>

            <AdSlot
              className="rounded-lg border border-line bg-white p-4"
              label="In content advertising"
              slot="in-content"
            />

            <ContentSection
              title={content.howItWorksTitle ?? "How it works"}
              paragraphs={content.howItWorks}
            />
            <ContentSection
              title={content.formulaTitle ?? "Formula explanation"}
              paragraphs={content.formula}
            />

            <ContentSection
              title={content.planningNotesTitle ?? "Planning notes"}
              paragraphs={content.planningNotes}
            />

            <section className="prose-site rounded-lg border border-line bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-ink">{content.example.title}</h2>
              <p>{content.example.body}</p>
              <div className="mt-4 rounded-lg border border-teal-100 bg-teal-50 p-4 text-sm font-semibold leading-6 text-ink">
                {content.example.result}
              </div>
            </section>

            <section className="prose-site rounded-lg border border-line bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-ink">
                {content.whenToUseTitle ?? "When to use this calculator"}
              </h2>
              <ul>
                {content.whenToUse.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-ink">
                Frequently asked questions
              </h2>
              <FAQ items={content.faqs} />
            </section>

            <section className="rounded-lg border border-line bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-ink">Related calculators</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                {relatedCalculatorCards.map((calculator) => (
                  <Link
                    className="rounded-lg border border-line p-4 transition hover:border-mint"
                    href={calculator.href}
                    key={`${calculator.title}-${calculator.href}`}
                  >
                    <h3 className="font-semibold text-ink">
                      {calculator.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-steel">
                      {calculator.description}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          </article>

          <aside className="space-y-6 lg:sticky lg:top-6 lg:self-start">
            <div className="rounded-lg border border-line bg-white p-5 shadow-sm">
              <h2 className="text-lg font-bold text-ink">Related guides</h2>
              <ul className="mt-4 space-y-4">
                {relatedGuides.map((guide) =>
                  guide ? (
                    <li key={guide.slug}>
                      <Link
                        className="block text-sm font-semibold text-ink hover:text-mint"
                        href={`/guides/${guide.slug}`}
                      >
                        {guide.title}
                      </Link>
                      <p className="mt-1 text-sm leading-6 text-steel">
                        {guide.description}
                      </p>
                    </li>
                  ) : null
                )}
              </ul>
            </div>
            <AdSlot
              className="rounded-lg border border-line bg-white p-4"
              label="Sidebar advertising"
              slot="sidebar"
            />
          </aside>
        </div>
      </div>
    </main>
  );
}

function ContentSection({
  title,
  paragraphs
}: {
  title: string;
  paragraphs: string[];
}) {
  return (
    <section className="prose-site rounded-lg border border-line bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-bold text-ink">{title}</h2>
      {paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </section>
  );
}
