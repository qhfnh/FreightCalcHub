import type { Metadata } from "next";
import { CategoryLanding } from "@/components/CategoryLanding";
import { getCategoryBySlug } from "@/lib/categories";
import { buildMetadata } from "@/lib/seo";

const category = getCategoryBySlug("warehouse-calculators")!;

export const metadata: Metadata = buildMetadata({
  title: "Warehouse Calculators",
  description:
    "Free warehouse calculators for pallet storage positions, floor space, rack bays, aisle factors, and inventory planning.",
  path: category.path
});

export default function WarehouseCalculatorsPage() {
  return <CategoryLanding category={category} />;
}
