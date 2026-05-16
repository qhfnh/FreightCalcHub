import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description:
    "Read the FreightCalcHub privacy policy, including information we collect, cookies, third-party advertising, Google AdSense, user choices, and contact details.",
  path: "/privacy-policy"
});

export default function PrivacyPolicyPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]}
      />
      <article className="prose-site mt-6 rounded-lg border border-line bg-white p-6 shadow-sm">
        <h1 className="text-4xl font-bold text-ink">Privacy Policy</h1>
        <p className="text-sm text-steel">Last updated: May 16, 2026</p>
        <p>
          This Privacy Policy explains how {siteConfig.name} handles information
          when you use our free logistics calculators, guides, and related
          website pages. We write this policy in plain language because the site
          is designed for ecommerce sellers, logistics teams, warehouse planners,
          and freight shippers who need practical tools without creating an
          account.
        </p>
        <h2 className="text-2xl font-bold text-ink">Information we collect</h2>
        <p>
          You can use {siteConfig.name} without registering or submitting a
          profile. We may collect standard website information such as pages
          visited, browser type, device type, operating system, referring page,
          general region, timestamps, and basic interaction data. This
          information helps us understand whether the site is working well across
          devices and which calculators are useful to visitors.
        </p>
        <p>
          If you contact us, we receive the information you choose to provide,
          such as your name, email address, and message content. Calculator
          inputs are intended to run locally in your browser during normal use.
          You should not enter confidential shipment contracts, customer data,
          security-sensitive information, or private commercial terms into public
          calculator fields.
        </p>
        <h2 className="text-2xl font-bold text-ink">How we use information</h2>
        <p>
          We use information to operate the website, improve calculator content,
          troubleshoot technical issues, understand aggregated usage patterns,
          respond to messages, protect the site from misuse, and plan new
          logistics tools. If advertising or analytics services are enabled, we
          may also use information to measure page performance, estimate audience
          interest, and support advertising features in a way that is consistent
          with this policy.
        </p>
        <h2 className="text-2xl font-bold text-ink">Cookies</h2>
        <p>
          Cookies are small files stored by your browser. We may use cookies or
          similar technologies to keep the website functional, remember basic
          preferences, understand aggregated usage, measure site performance, and
          support advertising features if advertising is enabled. You can block
          or delete cookies in your browser settings, although some site features
          or third-party services may behave differently when cookies are
          disabled.
        </p>
        <h2 className="text-2xl font-bold text-ink">
          Third-party advertising
        </h2>
        <p>
          {siteConfig.name} is a free website and may use third-party
          advertising services to help support ongoing content and tool
          development. Advertising partners may use cookies, pixels, device
          identifiers, or similar technologies to serve ads, measure ad
          performance, limit repeated ads, detect invalid activity, and
          understand interactions with ads shown on this site.
        </p>
        <h2 className="text-2xl font-bold text-ink">
          Google AdSense and advertising cookies
        </h2>
        <p>
          We plan to use Google AdSense or related Google advertising products.
          Google may use advertising cookies to serve ads, measure ad
          performance, prevent fraud and abuse, and improve ad relevance. Ads may
          be personalized or non-personalized depending on your settings,
          consent choices, location, and applicable law.
        </p>
        <h2 className="text-2xl font-bold text-ink">
          Third-party vendors may use cookies to serve ads based on prior visits
        </h2>
        <p>
          Third-party vendors, including Google, may use cookies to serve ads
          based on your prior visits to {siteConfig.name} or other websites.
          This helps advertising systems show ads that may be more relevant,
          manage ad frequency, and evaluate ad performance. These vendors may
          receive information directly from your browser when ads or advertising
          scripts are loaded.
        </p>
        <h2 className="text-2xl font-bold text-ink">
          User choices and opt-out
        </h2>
        <p>
          You may be able to manage or opt out of personalized advertising
          through Google Ads Settings, your browser privacy controls, consent
          management tools, or industry opt-out pages. We may add region-specific
          consent controls or additional opt-out links when advertising is
          enabled in locations that require them.
        </p>
        <h2 className="text-2xl font-bold text-ink">External links</h2>
        <p>
          Our pages may link to carrier resources, logistics references, privacy
          tools, or other external websites. We do not control those websites and
          are not responsible for their content, privacy practices, or security.
          Review the privacy policy of any external site before submitting
          personal information.
        </p>
        <h2 className="text-2xl font-bold text-ink">Data security</h2>
        <p>
          We use reasonable technical and organizational measures to protect the
          website and reduce unauthorized access, misuse, or disruption. No
          website or internet transmission can be guaranteed to be completely
          secure, so please use care when deciding what information to share
          online.
        </p>
        <h2 className="text-2xl font-bold text-ink">Contact information</h2>
        <p>
          If you have questions about this Privacy Policy or how
          {` ${siteConfig.name} `} handles information, please contact us through
          the <a href="/contact">Contact</a> page. Include enough detail for us
          to understand your request, but do not send sensitive shipment,
          customer, or payment information.
        </p>
        <h2 className="text-2xl font-bold text-ink">Policy updates</h2>
        <p>
          We may update this Privacy Policy as the website, calculator features,
          analytics setup, advertising configuration, or legal requirements
          change. When we make changes, we will update the date near the top of
          this page. The version published on this page is the current policy for
          {` ${siteConfig.name}`}.
        </p>
      </article>
    </main>
  );
}
