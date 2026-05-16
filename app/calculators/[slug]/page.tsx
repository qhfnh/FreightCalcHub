import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CalculatorPageLayout } from "@/components/CalculatorPageLayout";
import {
  calculatorPages,
  getCalculatorBySlug
} from "@/lib/calculator-content";
import { buildMetadata } from "@/lib/seo";

interface CalculatorRouteProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return calculatorPages.map((calculator) => ({
    slug: calculator.slug
  }));
}

export async function generateMetadata({
  params
}: CalculatorRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const calculator = getCalculatorBySlug(slug);

  if (!calculator) {
    return {};
  }

  return buildMetadata({
    title: calculator.metaTitle,
    description: calculator.metaDescription,
    path: `/calculators/${calculator.slug}`
  });
}

export default async function CalculatorPage({ params }: CalculatorRouteProps) {
  const { slug } = await params;
  const calculator = getCalculatorBySlug(slug);

  if (!calculator) {
    notFound();
  }

  return <CalculatorPageLayout content={calculator} />;
}
