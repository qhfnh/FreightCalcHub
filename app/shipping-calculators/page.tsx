import type { Metadata } from "next";
import { CategoryLanding } from "@/components/CategoryLanding";
import { getCategoryBySlug } from "@/lib/categories";
import { buildMetadata } from "@/lib/seo";

const category = getCategoryBySlug("shipping-calculators")!;

export const metadata: Metadata = buildMetadata({
  title: "Shipping Calculators",
  description:
    "Free shipping calculators for dimensional weight, actual weight, billable weight, parcel cartons, and ecommerce shipping planning.",
  path: category.path
});

export default function ShippingCalculatorsPage() {
  return <CategoryLanding category={category} />;
}
