import type { Metadata } from "next";
import Link from "next/link";
import { FAQ } from "@/components/FAQ";
import { HomeDimensionalWeightCalculator } from "@/components/HomeDimensionalWeightCalculator";
import { calculatorPages } from "@/lib/calculator-content";
import {
  featuredCalculatorSlugs,
  homepageCategories,
  homepageFaqs,
  homepageSeoContent
} from "@/lib/homepage-content";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Free Shipping, Freight & Warehouse Calculators | FreightCalcHub",
  description:
    "Use free logistics calculators for dimensional weight, freight class, pallet loads, container loading, and warehouse storage planning.",
  path: "/"
});

const whyItems = [
  {
    title: "Fast",
    description:
      "Get practical estimates in seconds with browser-based calculators that update as you type."
  },
  {
    title: "Free",
    description:
      "Use the calculators without subscriptions, gated downloads, or paid account requirements."
  },
  {
    title: "Practical",
    description:
      "Work with the measurements logistics teams actually use: dimensions, weight, density, pallets, containers, and storage space."
  },
  {
    title: "No signup required",
    description:
      "Open a calculator, enter your numbers, and compare planning scenarios immediately."
  }
];

export default function HomePage() {
  const featuredCalculators = featuredCalculatorSlugs
    .map((slug) => calculatorPages.find((calculator) => calculator.slug === slug))
    .filter(Boolean);
  const primaryCalculator = calculatorPages.find(
    (calculator) => calculator.slug === "dimensional-weight-calculator"
  );

  return (
    <main>
      <section className="border-b border-line bg-[#eef5f6]">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          <div className="rounded-2xl border border-line bg-white p-2 shadow-soft sm:p-3">
            <div className="mb-3 flex items-center justify-between gap-3 px-1">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-mint">
                  Most-used ecommerce shipping calculator
                </p>
                <p className="mt-1 text-sm text-steel">
                  Estimate parcel billable weight before buying labels or
                  reviewing shipping charges.
                </p>
              </div>
              {primaryCalculator ? (
                <Link
                  className="hidden rounded-md border border-line px-3 py-2 text-xs font-semibold text-ink hover:border-mint hover:text-mint sm:inline-flex"
                  href={`/calculators/${primaryCalculator.slug}`}
                >
                  Open tool page
                </Link>
              ) : null}
            </div>
            <HomeDimensionalWeightCalculator />
          </div>

          <div className="mt-8 max-w-4xl">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-line bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-mint shadow-sm">
              FreightCalcHub
              <span className="h-1.5 w-1.5 rounded-full bg-mint" />
              Free logistics tools
            </div>
            <h1 className="mt-5 max-w-4xl text-4xl font-black tracking-tight text-ink sm:text-5xl lg:text-6xl">
              Free Shipping, Freight & Warehouse Calculators
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-steel">
              Practical calculators for ecommerce sellers, shippers, warehouse
              teams, and logistics planners. Start with the shipping question
              most likely to change a parcel invoice: will the package be billed
              by actual weight or dimensional weight?
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {["Live estimate", "Local calculation", "No signup"].map((item) => (
                <div
                  className="rounded-lg border border-line bg-white/80 px-4 py-3 text-sm font-semibold text-ink shadow-sm"
                  key={item}
                >
                  {item}
                </div>
              ))}
            </div>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                className="inline-flex justify-center rounded-md bg-ink px-5 py-3 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-mint"
                href="#calculator"
              >
                Calculate billable weight
              </Link>
              <Link
                className="inline-flex justify-center rounded-md border border-line bg-white px-5 py-3 text-sm font-semibold text-ink transition hover:-translate-y-0.5 hover:border-mint hover:text-mint"
                href="#calculators"
              >
                Explore Calculators
              </Link>
            </div>
            <div className="mt-8 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                ["DIM weight", "Parcel billing"],
                ["Freight class", "LTL quotes"],
                ["Pallet loads", "Warehouse moves"],
                ["Container fit", "Import planning"]
              ].map(([label, detail]) => (
                <div
                  className="rounded-lg border border-line bg-white/80 p-3 shadow-sm"
                  key={label}
                >
                  <p className="text-sm font-bold text-ink">{label}</p>
                  <p className="mt-1 text-xs leading-5 text-steel">{detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8"
        id="calculators"
      >
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-ink">Calculator categories</h2>
            <p className="mt-2 text-sm leading-6 text-steel">
              Choose the planning area that matches your shipment or warehouse
              question.
            </p>
          </div>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {homepageCategories.map((category) => (
            <Link
              className="rounded-lg border border-line bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-mint hover:shadow-soft"
              href={category.href}
              key={category.title}
            >
              <h3 className="text-lg font-semibold text-ink">{category.title}</h3>
              <p className="mt-2 text-sm leading-6 text-steel">
                {category.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-mint">
              Core tools
            </p>
            <h2 className="mt-1 text-2xl font-bold text-ink">
              Featured calculators
            </h2>
          </div>
          <p className="max-w-2xl text-sm leading-6 text-steel">
            Use these when you need a fast first pass before comparing carrier
            rates, pallet plans, container space, or warehouse capacity.
          </p>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {featuredCalculators.map((calculator) =>
            calculator ? (
              <Link
                className={`rounded-lg border bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-soft ${
                  calculator.slug === "dimensional-weight-calculator"
                    ? "border-mint ring-2 ring-mint/10"
                    : "border-line hover:border-mint"
                }`}
                href={`/calculators/${calculator.slug}`}
                key={calculator.slug}
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-mint">
                  {calculator.categoryTitle}
                </p>
                <h3 className="mt-2 text-lg font-semibold text-ink">
                  {calculator.title}
                </h3>
                {calculator.slug === "dimensional-weight-calculator" ? (
                  <p className="mt-3 inline-flex rounded-full bg-mint/10 px-2.5 py-1 text-xs font-semibold text-mint">
                    Most-used shipping tool
                  </p>
                ) : null}
                <p className="mt-2 text-sm leading-6 text-steel">
                  {calculator.metaDescription}
                </p>
              </Link>
            ) : null
          )}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-ink">Why use FreightCalcHub?</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {whyItems.map((item) => (
            <div
              className="rounded-lg border border-line bg-white p-5 shadow-sm"
              key={item.title}
            >
              <h3 className="text-lg font-semibold text-ink">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-steel">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
        <article className="prose-site rounded-lg border border-line bg-white p-6 shadow-sm">
          <h2 className="text-3xl font-bold text-ink">
            Free logistics calculators for real shipping decisions
          </h2>
          {homepageSeoContent.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </article>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <h2 className="mb-4 text-2xl font-bold text-ink">
          Frequently asked questions
        </h2>
        <FAQ items={homepageFaqs} />
      </section>
    </main>
  );
}
