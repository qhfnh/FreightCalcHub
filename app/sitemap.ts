import type { MetadataRoute } from "next";
import { calculatorCategories } from "@/lib/categories";
import { calculatorPages } from "@/lib/calculator-content";
import { guideArticles } from "@/lib/guides";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "/",
    "/guides",
    "/about",
    "/contact",
    "/privacy-policy",
    "/terms-of-use"
  ];
  const categoryPaths = calculatorCategories.map((category) => category.path);
  const calculatorPaths = calculatorPages.map(
    (calculator) => `/calculators/${calculator.slug}`
  );
  const guidePaths = guideArticles.map((guide) => `/guides/${guide.slug}`);

  return [
    ...staticPaths,
    ...categoryPaths,
    ...calculatorPaths,
    ...guidePaths
  ].map((path) => ({
    url: absoluteUrl(path),
    lastModified: new Date(),
    changeFrequency: path.includes("/calculators/") ? "monthly" : "weekly",
    priority: path === "/" ? 1 : path.includes("/calculators/") ? 0.9 : 0.7
  }));
}
