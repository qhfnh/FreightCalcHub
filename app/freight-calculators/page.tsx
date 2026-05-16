import type { Metadata } from "next";
import { CategoryLanding } from "@/components/CategoryLanding";
import { getCategoryBySlug } from "@/lib/categories";
import { buildMetadata } from "@/lib/seo";

const category = getCategoryBySlug("freight-calculators")!;

export const metadata: Metadata = buildMetadata({
  title: "Freight Calculators",
  description:
    "Free freight calculators for LTL density, estimated freight class, pallet cube, NMFC planning, and shipping quote review.",
  path: category.path
});

export default function FreightCalculatorsPage() {
  return <CategoryLanding category={category} />;
}
