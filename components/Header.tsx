"use client";

import { useState } from "react";
import Link from "next/link";
import { calculatorCategories } from "@/lib/categories";
import { getRelatedCalculators } from "@/lib/calculator-content";
import { siteConfig } from "@/lib/site";

const staticLinks = [
  { href: "/guides", label: "Guides" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" }
];

export function Header() {
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  function closeMenu() {
    setOpenCategory(null);
  }

  return (
    <header className="relative z-40 border-b border-line bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-5 px-4 py-3 sm:px-6 lg:flex-nowrap lg:px-8">
        <div className="shrink-0">
          <Link className="flex items-center gap-3" href="/">
            <span className="flex h-10 w-10 items-center justify-center rounded-md bg-ink text-sm font-black text-white shadow-sm">
              FC
            </span>
            <span>
              <span className="block text-lg font-black tracking-tight text-ink">
                {siteConfig.name}
              </span>
              <span className="hidden text-xs text-steel sm:block">
                Logistics planning tools
              </span>
            </span>
          </Link>
        </div>

        <nav
          aria-label="Calculator navigation"
          className="hidden min-w-0 flex-1 lg:block"
        >
          <ul className="flex items-center justify-center gap-1 text-sm font-semibold text-steel">
            {calculatorCategories.map((category) => (
              <li
                className="relative"
                key={category.path}
                onFocus={() => setOpenCategory(category.slug)}
                onMouseEnter={() => setOpenCategory(category.slug)}
                onMouseLeave={closeMenu}
              >
                <Link
                  className={`block rounded-md px-3 py-2 transition hover:bg-paper hover:text-ink ${
                    openCategory === category.slug ? "bg-paper text-ink" : ""
                  }`}
                  href={category.path}
                  onClick={closeMenu}
                >
                  {category.title}
                </Link>
                <div
                  className={`absolute left-1/2 top-full w-64 -translate-x-1/2 pt-3 transition ${
                    openCategory === category.slug
                      ? "visible opacity-100"
                      : "invisible opacity-0"
                  }`}
                >
                  <div className="rounded-xl border border-line bg-white p-2 shadow-soft">
                    <ul className="space-y-1">
                      {getRelatedCalculators(category.calculatorSlugs).map(
                        (calculator) => (
                          <li key={calculator.slug}>
                            <Link
                              className="block rounded-lg px-3 py-2 text-sm font-semibold text-steel transition hover:bg-paper hover:text-ink"
                              href={`/calculators/${calculator.slug}`}
                              onClick={closeMenu}
                            >
                              {calculator.shortTitle}
                            </Link>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Utility navigation" className="hidden shrink-0 md:block">
          <ul className="flex items-center gap-4 text-sm font-semibold text-steel">
            {staticLinks.map((link) => (
              <li key={link.href}>
                <Link className="hover:text-mint" href={link.href}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

      </div>
    </header>
  );
}
