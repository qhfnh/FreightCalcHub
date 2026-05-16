import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Terms of Use",
  description:
    "Read the FreightCalcHub terms of use for calculator estimates, content limitations, acceptable use, and third-party requirements.",
  path: "/terms-of-use"
});

export default function TermsOfUsePage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[{ label: "Home", href: "/" }, { label: "Terms of Use" }]}
      />
      <article className="prose-site mt-6 rounded-lg border border-line bg-white p-6 shadow-sm">
        <h1 className="text-4xl font-bold text-ink">Terms of Use</h1>
        <p>
          By using {siteConfig.name}, you agree to use the calculators, guides,
          and website content for informational and planning purposes only. If
          you do not agree with these terms, do not use the site.
        </p>
        <h2 className="text-2xl font-bold text-ink">Planning estimates</h2>
        <p>
          Calculator outputs are estimates based on the values you enter and the
          formulas described on each page. Results are not carrier approvals,
          official NMFC classifications, warehouse engineering approvals,
          container loading instructions, legal advice, or safety approvals.
        </p>
        <h2 className="text-2xl font-bold text-ink">Confirm requirements</h2>
        <p>
          Always confirm carrier, NMFC, warehouse, racking, building code,
          customer routing guide, forwarder, and loading requirements before
          making shipping, storage, purchasing, or pricing decisions.
        </p>
        <h2 className="text-2xl font-bold text-ink">Acceptable use</h2>
        <p>
          Do not misuse the site, attempt to disrupt service, scrape at abusive
          rates, reverse engineer non-public systems, or use the content in a
          way that misrepresents FreightCalcHub as an official carrier,
          warehouse, government, or standards organization.
        </p>
        <h2 className="text-2xl font-bold text-ink">Content updates</h2>
        <p>
          Freight, shipping, warehouse, and advertising requirements can change.
          We may update calculators, page copy, metadata, legal pages, or site
          structure without notice.
        </p>
        <h2 className="text-2xl font-bold text-ink">Limitation of liability</h2>
        <p>
          FreightCalcHub is provided as-is. To the fullest extent allowed by
          law, we are not liable for losses resulting from reliance on calculator
          estimates, content errors, downtime, third-party requirements, or
          business decisions made using this site.
        </p>
      </article>
    </main>
  );
}
