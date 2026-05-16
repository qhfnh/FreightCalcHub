import type { Metadata } from "next";
import { CategoryLanding } from "@/components/CategoryLanding";
import { getCategoryBySlug } from "@/lib/categories";
import { buildMetadata } from "@/lib/seo";

const category = getCategoryBySlug("container-calculators")!;

export const metadata: Metadata = buildMetadata({
  title: "Container Calculators",
  description:
    "Free container calculators for cartons per container, loading capacity, fill efficiency, payload limits, and import planning.",
  path: category.path
});

export default function ContainerCalculatorsPage() {
  return <CategoryLanding category={category} />;
}
