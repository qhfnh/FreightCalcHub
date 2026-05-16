import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "About FreightCalcHub",
  description:
    "Learn about FreightCalcHub, a free calculator website for ecommerce shipping, freight, pallet, container, and warehouse planning.",
  path: "/about"
});

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About" }]} />
      <article className="prose-site mt-6 rounded-lg border border-line bg-white p-6 shadow-sm">
        <h1 className="text-4xl font-bold text-ink">About {siteConfig.name}</h1>
        <p>
          FreightCalcHub is a free online calculator website for ecommerce
          sellers, logistics teams, warehouse planners, and freight shippers. The
          site focuses on practical calculations that appear in everyday
          operations: dimensional weight, freight density, pallet builds,
          container loading, and warehouse storage planning.
        </p>
        <p>
          The calculators are built to provide quick planning estimates without
          asking users to create an account or send shipment data to a backend.
          Most calculations run directly in the browser, which keeps the tools
          fast and easy to use during packaging reviews, quote requests, supplier
          calls, and warehouse planning meetings.
        </p>
        <h2 className="text-2xl font-bold text-ink">Editorial approach</h2>
        <p>
          Freight and warehouse math is only useful when the assumptions are
          clear. Each calculator includes an explanation of how the result is
          produced, what formula is being used, when the estimate is appropriate,
          and what requirements should be confirmed before decisions are made.
        </p>
        <h2 className="text-2xl font-bold text-ink">Important limitations</h2>
        <p>
          Results are estimates. Carrier tariffs, NMFC classifications, pallet
          stability, container loading rules, building code, racking design, and
          customer routing guides can override simple calculator output. Always
          confirm the relevant requirement with the responsible carrier,
          warehouse, engineer, forwarder, customer, or authority.
        </p>
      </article>
    </main>
  );
}
