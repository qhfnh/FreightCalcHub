# FreightCalcHub Design

## Goal

Build FreightCalcHub as an English, SEO-first Next.js App Router calculator website for ecommerce sellers, logistics teams, warehouse planners, and freight shippers.

## Architecture

The site is a statically rendered content site with small client-side calculator widgets. Page copy, metadata, related links, FAQs, examples, and guide links are stored as structured TypeScript data so new calculators can be added without duplicating route code. Calculation logic is kept in pure TypeScript functions under `lib/` and covered by focused unit tests.

## Pages

The project includes a home page, five calculator category pages, a guides index, guide article pages, About, Contact, Privacy Policy, Terms of Use, sitemap, robots, and ten calculator pages under `/calculators/<slug>`.

## Calculator Experience

Each calculator page includes an introduction, interactive form, highlighted result, disclaimer, how-it-works section, formula explanation, worked example, when-to-use guidance, FAQ, related calculators, and related guides. The forms support inches/cm and lb/kg where relevant, reset controls, immediate validation, and real-time results.

## SEO And AdSense

Each calculator gets unique metadata, canonical URL, Open Graph metadata, Twitter card metadata, semantic headings, crawlable header/footer links, breadcrumbs, related internal links, and guide links. Ad slots are implemented as configurable components and render only when `NEXT_PUBLIC_ADSENSE_CLIENT_ID` is set.

## UI

The visual style is practical B2B: restrained color, compact cards, clear forms, prominent result panels, responsive grids, and readable editorial content. No fake ads, no lorem ipsum, no coming-soon pages.
