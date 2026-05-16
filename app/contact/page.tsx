import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Contact FreightCalcHub",
  description:
    "Contact FreightCalcHub with calculator feedback, correction requests, partnership questions, or logistics planning topic suggestions.",
  path: "/contact"
});

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />
      <article className="prose-site mt-6 rounded-lg border border-line bg-white p-6 shadow-sm">
        <h1 className="text-4xl font-bold text-ink">Contact FreightCalcHub</h1>
        <p>
          Use this page for calculator feedback, correction requests, topic
          suggestions, and business inquiries related to freight, shipping,
          pallet, container, and warehouse planning content.
        </p>
        <p>
          Email:{" "}
          <a className="font-semibold text-mint" href={`mailto:${siteConfig.contactEmail}`}>
            {siteConfig.contactEmail}
          </a>
        </p>
        <h2 className="text-2xl font-bold text-ink">What to include</h2>
        <ul>
          <li>The calculator or guide page you are referencing.</li>
          <li>The input values, units, and result you want us to review.</li>
          <li>The carrier, warehouse, NMFC, or loading rule that may affect the calculation.</li>
          <li>Your requested correction or suggested topic.</li>
        </ul>
        <p>
          FreightCalcHub does not provide carrier approvals, engineering
          approvals, legal advice, or official NMFC classifications. We can
          review site content and improve calculator explanations when a clearer
          assumption would help users.
        </p>
      </article>
    </main>
  );
}
