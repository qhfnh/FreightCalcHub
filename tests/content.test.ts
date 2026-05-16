import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { calculatorPages } from "@/lib/calculator-content";
import { calculatorCategories } from "@/lib/categories";
import {
  featuredCalculatorSlugs,
  homepageCategories,
  homepageFaqs,
  homepageSeoContent
} from "@/lib/homepage-content";

function wordCount(text: string) {
  return text
    .replace(/[`'"]/g, "")
    .split(/\s+/)
    .filter(Boolean).length;
}

function calculatorText(page: (typeof calculatorPages)[number]) {
  return [
    page.title,
    page.metaTitle,
    page.metaDescription,
    ...page.intro,
    ...page.howItWorks,
    ...page.formula,
    page.example.title,
    page.example.body,
    page.example.result,
    ...page.whenToUse,
    ...page.planningNotes,
    ...page.faqs.flatMap((faq) => [faq.question, faq.answer])
  ].join(" ");
}

describe("calculator content quality", () => {
  it("has ten calculator pages", () => {
    expect(calculatorPages).toHaveLength(10);
  });

  it("keeps each calculator page substantial and unique", () => {
    const slugs = new Set(calculatorPages.map((page) => page.slug));
    const wordCounts: string[] = [];
    const underTarget: string[] = [];
    const overTarget: string[] = [];
    expect(slugs.size).toBe(10);

    for (const page of calculatorPages) {
      const text = calculatorText(page);
      const count = wordCount(text);
      wordCounts.push(`${page.slug}: ${count}`);

      expect(page.relatedCalculatorSlugs).toHaveLength(3);
      expect(page.relatedGuideSlugs).toHaveLength(3);
      expect(page.faqs.length).toBeGreaterThanOrEqual(4);
      expect(text.toLowerCase()).not.toContain("lorem ipsum");
      if (count < 800) underTarget.push(`${page.slug}: ${count}`);
      if (count > 1200) overTarget.push(`${page.slug}: ${count}`);
    }

    expect(
      underTarget,
      `Word counts:\n${wordCounts.join("\n")}`
    ).toHaveLength(0);
    expect(overTarget, `Word counts:\n${wordCounts.join("\n")}`).toHaveLength(0);
  });

  it("keeps homepage content aligned with the requested structure", () => {
    const seoWordCount = wordCount(homepageSeoContent.join(" "));

    expect(homepageCategories.map((category) => category.title)).toEqual([
      "Shipping Weight",
      "Freight Class",
      "Pallet Planning",
      "Container Loading",
      "Warehouse Storage"
    ]);
    expect(featuredCalculatorSlugs).toEqual([
      "dimensional-weight-calculator",
      "freight-class-calculator",
      "pallet-calculator",
      "container-loading-calculator"
    ]);
    expect(homepageFaqs.length).toBeGreaterThanOrEqual(4);
    expect(seoWordCount).toBeGreaterThanOrEqual(600);
    expect(seoWordCount).toBeLessThanOrEqual(900);
  });

  it("keeps the privacy policy ready for AdSense review", () => {
    const privacyPage = readFileSync(
      join(process.cwd(), "app/privacy-policy/page.tsx"),
      "utf8"
    );

    [
      "Information we collect",
      "How we use information",
      "Cookies",
      "Third-party advertising",
      "Google AdSense and advertising cookies",
      "Third-party vendors may use cookies to serve ads based on prior visits",
      "User choices and opt-out",
      "External links",
      "Data security",
      "Contact information",
      "Policy updates"
    ].forEach((heading) => {
      expect(privacyPage).toContain(heading);
    });
  });

  it("keeps the homepage focused on a primary interactive calculator", () => {
    const homePage = readFileSync(join(process.cwd(), "app/page.tsx"), "utf8");
    const primaryCalculator = readFileSync(
      join(process.cwd(), "components/HomeDimensionalWeightCalculator.tsx"),
      "utf8"
    );
    const homepageSurface = `${homePage}\n${primaryCalculator}`;

    expect(homepageSurface).toContain("Calculate billable weight");
    expect(homepageSurface).toContain("Explore Calculators");
    expect(homepageSurface).toContain("Dimensional Weight Calculator");
    expect(homepageSurface).toContain("HomeDimensionalWeightCalculator");
    expect(homepageSurface).toContain("Most-used shipping tool");
    expect(homepageSurface).toContain("Ecommerce shipping calculator");
    expect(homePage).not.toContain(">Featured calculator<");
    expect(homePage.indexOf("<HomeDimensionalWeightCalculator")).toBeLessThan(
      homePage.indexOf("<h1")
    );
  });

  it("keeps calculator pages centered on the interactive tool first", () => {
    const layout = readFileSync(
      join(process.cwd(), "components/CalculatorPageLayout.tsx"),
      "utf8"
    );
    const widget = readFileSync(
      join(process.cwd(), "components/CalculatorWidget.tsx"),
      "utf8"
    );
    const homeWidget = readFileSync(
      join(process.cwd(), "components/HomeDimensionalWeightCalculator.tsx"),
      "utf8"
    );

    expect(layout.indexOf("<CalculatorWidget")).toBeGreaterThan(-1);
    expect(layout.indexOf("<CalculatorWidget")).toBeLessThan(
      layout.indexOf("<h1")
    );
    expect(layout.indexOf("Live estimate")).toBeGreaterThan(
      layout.indexOf("<CalculatorWidget")
    );
    expect(widget).not.toContain("Live estimate");
    expect(widget).not.toContain("Enter your shipment values first");
    expect(homeWidget).not.toContain("Live estimate");
    expect(widget).toContain("{title}</h2>");
    expect(homeWidget).toContain("Dimensional Weight Calculator");
    expect(layout).toContain('className="rounded-2xl');
    expect(layout).not.toContain("lg:grid-cols-[0.72fr_1.28fr]");
    expect(widget).toContain("bg-ink px-5 py-4 text-white");
    expect(widget).toContain("bg-mint p-5 text-white");
    expect(homeWidget).toContain("bg-ink px-5 py-4 text-white");
  });

  it("keeps calculator categories as top navigation dropdowns", () => {
    const header = readFileSync(
      join(process.cwd(), "components/Header.tsx"),
      "utf8"
    );
    const categories = readFileSync(
      join(process.cwd(), "lib/categories.ts"),
      "utf8"
    );
    const navigationSurface = `${header}\n${categories}`;

    [
      "Calculator navigation",
      "Shipping Calculators",
      "Freight Calculators",
      "Pallet Calculators",
      "Container Calculators",
      "Warehouse Calculators",
      "openCategory",
      "onClick={closeMenu}",
      "getRelatedCalculators(category.calculatorSlugs)",
      "/calculators/${calculator.slug}"
    ].forEach((text) => {
      expect(navigationSurface).toContain(text);
    });
    expect(header).not.toContain("calculator.metaDescription");
    expect(header).not.toContain("All {category.title}");
    expect(header).not.toContain("Mobile calculator navigation");
  });

  it("keeps top navigation calculator dropdowns unique by category", () => {
    const navSlugs = calculatorCategories.flatMap(
      (category) => category.calculatorSlugs
    );
    const uniqueNavSlugs = new Set(navSlugs);

    expect(uniqueNavSlugs.size).toBe(navSlugs.length);
  });
});
