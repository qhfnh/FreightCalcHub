export interface CalculatorCategory {
  title: string;
  slug: string;
  path: string;
  description: string;
  calculatorSlugs: string[];
}

export const calculatorCategories: CalculatorCategory[] = [
  {
    title: "Shipping Calculators",
    slug: "shipping-calculators",
    path: "/shipping-calculators",
    description:
      "Estimate billable package weight, compare actual and dimensional weight, and prepare parcel or ecommerce shipments with fewer surprises.",
    calculatorSlugs: [
      "dimensional-weight-calculator",
      "actual-vs-dimensional-weight-calculator"
    ]
  },
  {
    title: "Freight Calculators",
    slug: "freight-calculators",
    path: "/freight-calculators",
    description:
      "Check freight density and estimate density-based freight class before requesting LTL quotes or reviewing carrier charges.",
    calculatorSlugs: [
      "freight-class-calculator",
      "freight-density-calculator"
    ]
  },
  {
    title: "Pallet Calculators",
    slug: "pallet-calculators",
    path: "/pallet-calculators",
    description:
      "Plan pallet builds, case counts, stack heights, and pallet storage needs for outbound shipping and warehouse operations.",
    calculatorSlugs: [
      "pallet-calculator",
      "cases-per-pallet-calculator"
    ]
  },
  {
    title: "Container Calculators",
    slug: "container-calculators",
    path: "/container-calculators",
    description:
      "Estimate how many cartons, pallets, or loose-loaded units can fit in common ocean and domestic container spaces.",
    calculatorSlugs: [
      "container-loading-calculator",
      "cartons-per-container-calculator"
    ]
  },
  {
    title: "Warehouse Calculators",
    slug: "warehouse-calculators",
    path: "/warehouse-calculators",
    description:
      "Estimate warehouse floor area, rack positions, pallet storage, and planning assumptions for space conversations.",
    calculatorSlugs: [
      "warehouse-space-calculator",
      "pallet-storage-calculator"
    ]
  }
];

export function getCategoryBySlug(slug: string): CalculatorCategory | undefined {
  return calculatorCategories.find((category) => category.slug === slug);
}
