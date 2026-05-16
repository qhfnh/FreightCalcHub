import Link from "next/link";
import { calculatorCategories } from "@/lib/categories";
import { calculatorPages } from "@/lib/calculator-content";
import { siteConfig } from "@/lib/site";

const legalLinks = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-of-use", label: "Terms of Use" }
];

export function Footer() {
  return (
    <footer className="mt-16 border-t border-line bg-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-4 lg:px-8">
        <div>
          <h2 className="text-base font-bold text-ink">{siteConfig.name}</h2>
          <p className="mt-3 text-sm leading-6 text-steel">
            Free calculators for shipping, freight, pallets, containers, and
            warehouse planning.
          </p>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-ink">
            Categories
          </h3>
          <ul className="mt-3 space-y-2 text-sm text-steel">
            {calculatorCategories.map((category) => (
              <li key={category.path}>
                <Link className="hover:text-mint" href={category.path}>
                  {category.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-ink">
            Popular Tools
          </h3>
          <ul className="mt-3 space-y-2 text-sm text-steel">
            {calculatorPages.slice(0, 5).map((calculator) => (
              <li key={calculator.slug}>
                <Link
                  className="hover:text-mint"
                  href={`/calculators/${calculator.slug}`}
                >
                  {calculator.shortTitle}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-ink">
            Site
          </h3>
          <ul className="mt-3 space-y-2 text-sm text-steel">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <Link className="hover:text-mint" href={link.href}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-line px-4 py-4 text-center text-xs text-steel">
        © {new Date().getFullYear()} {siteConfig.name}. Results are planning
        estimates, not carrier, NMFC, warehouse, or loading approvals.
      </div>
    </footer>
  );
}
