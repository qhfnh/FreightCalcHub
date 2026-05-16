# FreightCalcHub Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a complete static Next.js App Router calculator site named FreightCalcHub.

**Architecture:** Pure calculation functions live in `lib/calculations.ts` and are exercised by Vitest. Structured content in `lib/calculator-content.ts` and `lib/guides.ts` drives static dynamic routes, metadata, internal links, and page sections. Reusable server components handle layout, breadcrumbs, ads, FAQs, and content sections while a small client component handles calculator interaction.

**Tech Stack:** Next.js App Router, TypeScript, Tailwind CSS, Vitest.

---

### Task 1: Scaffold Project

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next.config.ts`
- Create: `postcss.config.js`
- Create: `tailwind.config.ts`
- Create: `app/globals.css`

- [ ] Add a Next.js App Router TypeScript project configuration.
- [ ] Configure Tailwind content scanning for `app`, `components`, and `lib`.
- [ ] Add scripts for `dev`, `build`, `start`, `typecheck`, and `test`.

### Task 2: Calculation Tests

**Files:**
- Create: `tests/calculations.test.ts`

- [ ] Add failing tests for dimensional weight, density, freight class, pallet counts, container capacity, warehouse space, and pallet storage.
- [ ] Run `pnpm test` after dependencies are installed and confirm the test suite catches missing implementation.

### Task 3: Calculation Logic

**Files:**
- Create: `lib/calculations.ts`

- [ ] Implement pure TypeScript calculation functions with unit conversion helpers.
- [ ] Re-run `pnpm test` and confirm the calculation suite passes.

### Task 4: Content And SEO Data

**Files:**
- Create: `lib/site.ts`
- Create: `lib/seo.ts`
- Create: `lib/calculator-content.ts`
- Create: `lib/guides.ts`
- Create: `lib/categories.ts`

- [ ] Add site metadata helpers with canonical, Open Graph, and Twitter card support.
- [ ] Add ten unique calculator content records with related calculators, guide links, examples, formulas, FAQs, and calculator type references.
- [ ] Add category and guide records for crawlable internal links.

### Task 5: Reusable Components

**Files:**
- Create: `components/Header.tsx`
- Create: `components/Footer.tsx`
- Create: `components/Breadcrumbs.tsx`
- Create: `components/AdSlot.tsx`
- Create: `components/FAQ.tsx`
- Create: `components/CalculatorPageLayout.tsx`
- Create: `components/CalculatorWidget.tsx`
- Create: `components/CardLink.tsx`

- [ ] Implement crawlable navigation and footer links.
- [ ] Implement ad slots that render only when an AdSense client id exists.
- [ ] Implement reusable calculator page layout and client calculator widget.

### Task 6: Routes

**Files:**
- Create: `app/layout.tsx`
- Create: `app/page.tsx`
- Create: `app/calculators/[slug]/page.tsx`
- Create: `app/shipping-calculators/page.tsx`
- Create: `app/freight-calculators/page.tsx`
- Create: `app/pallet-calculators/page.tsx`
- Create: `app/container-calculators/page.tsx`
- Create: `app/warehouse-calculators/page.tsx`
- Create: `app/guides/page.tsx`
- Create: `app/guides/[slug]/page.tsx`
- Create: `app/about/page.tsx`
- Create: `app/contact/page.tsx`
- Create: `app/privacy-policy/page.tsx`
- Create: `app/terms-of-use/page.tsx`
- Create: `app/sitemap.ts`
- Create: `app/robots.ts`
- Create: `app/not-found.tsx`

- [ ] Wire all static pages and dynamic content routes.
- [ ] Generate sitemap and robots from structured data.
- [ ] Ensure every nav item resolves to a complete page.

### Task 7: Verification

- [ ] Run `pnpm install` or `pnpm add` as needed.
- [ ] Run `pnpm test`.
- [ ] Run `pnpm typecheck`.
- [ ] Run `pnpm build`.
- [ ] Start a dev server and provide the local URL.
