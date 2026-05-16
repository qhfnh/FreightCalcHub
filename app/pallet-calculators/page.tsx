import type { Metadata } from "next";
import { CategoryLanding } from "@/components/CategoryLanding";
import { getCategoryBySlug } from "@/lib/categories";
import { buildMetadata } from "@/lib/seo";

const category = getCategoryBySlug("pallet-calculators")!;

export const metadata: Metadata = buildMetadata({
  title: "Pallet Calculators",
  description:
    "Free pallet calculators for cartons per pallet, cases per pallet, stack height, pallet footprint, and pallet storage planning.",
  path: category.path
});

export default function PalletCalculatorsPage() {
  return <CategoryLanding category={category} />;
}
