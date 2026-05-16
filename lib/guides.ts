export interface GuideArticle {
  title: string;
  slug: string;
  description: string;
  category: string;
  body: string[];
}

export const guideArticles: GuideArticle[] = [
  {
    title: "How dimensional weight affects ecommerce shipping costs",
    slug: "dimensional-weight-ecommerce-shipping",
    category: "Shipping",
    description:
      "A practical explanation of dimensional weight, carrier divisors, and carton choices for online sellers.",
    body: [
      "Dimensional weight is a pricing method that lets carriers charge for the space a package occupies, not only for its scale weight. It matters most when a carton is large, light, or padded with excess void fill.",
      "For ecommerce teams, the practical takeaway is simple: carton selection changes transportation cost. A slightly smaller box can lower billable weight, reduce zone-based surcharges, and make rate comparisons easier to explain.",
      "Use a dimensional weight calculator during packaging reviews, new product launches, and carrier negotiations. The calculation is an estimate, but it gives teams a shared number before they commit to a carton."
    ]
  },
  {
    title: "Freight density and NMFC class basics",
    slug: "freight-density-nmfc-class-basics",
    category: "Freight",
    description:
      "Learn why density is one part of freight class and how to use it without ignoring NMFC rules.",
    body: [
      "Density is one of the most visible inputs in LTL freight class, but it is not the only factor. NMFC classification can also consider handling, stowability, liability, and commodity-specific rules.",
      "A density-based class estimate is useful early in quoting because it helps a shipper understand whether a shipment is likely to rate as compact freight or low-density freight. It should not replace an official NMFC lookup.",
      "Teams should keep product descriptions, packaging dimensions, weights, and historical bills of lading aligned. Cleaner data reduces disputes and makes carrier conversations more productive."
    ]
  },
  {
    title: "Pallet build planning checklist",
    slug: "pallet-build-planning-checklist",
    category: "Pallets",
    description:
      "A concise checklist for stack height, case orientation, pallet footprint, and load stability.",
    body: [
      "A pallet build is more than a layer count. The best plan balances cube utilization, stack strength, handling limits, labeling visibility, and customer receiving requirements.",
      "Before locking a build, confirm case dimensions, pallet footprint, allowed overhang, maximum stack height, gross weight, and whether cartons can be rotated. Small assumptions can change the finished pallet count.",
      "Use calculator estimates as a first pass, then validate the physical build with the warehouse team. Real cartons compress, straps take space, and product-specific handling rules can override the math."
    ]
  },
  {
    title: "Container loading assumptions to verify before booking",
    slug: "container-loading-assumptions-before-booking",
    category: "Containers",
    description:
      "Review the assumptions that affect container capacity before making ocean or domestic loading commitments.",
    body: [
      "Container loading estimates depend on internal dimensions, carton orientation, payload, floor loading, bracing, door clearance, and the amount of space lost to practical handling.",
      "A calculator can show whether space or payload is likely to become the limiting factor. That helps teams decide whether to change carton size, split shipments, or review loading patterns.",
      "Before booking, confirm the actual equipment dimensions with the carrier or forwarder. Published dimensions are useful for planning, but operational availability and local loading rules still matter."
    ]
  },
  {
    title: "Warehouse space planning for growing inventory",
    slug: "warehouse-space-planning-growing-inventory",
    category: "Warehouse",
    description:
      "Use pallet counts, stack levels, aisle factors, and rack assumptions to estimate space needs.",
    body: [
      "Warehouse space planning starts with inventory positions, but it should not stop there. A useful estimate also includes aisle allowances, staging space, replenishment patterns, and target occupancy.",
      "Fast-growing ecommerce and wholesale operations often underestimate the floor area needed for receiving and outbound staging. Storage positions can look adequate on paper while workflows remain congested.",
      "A space calculator gives an early planning number for lease discussions, 3PL conversations, and slotting reviews. Final decisions should include fire code, racking engineering, and local operating requirements."
    ]
  },
  {
    title: "Why billable weight and pallet density should be reviewed together",
    slug: "billable-weight-pallet-density-review",
    category: "Operations",
    description:
      "Understand the connection between package billable weight, pallet cube, freight density, and shipping decisions.",
    body: [
      "Parcel teams often focus on dimensional weight while freight teams focus on density. In practice, both metrics describe the same operational problem: how much transportation space a shipment consumes.",
      "Reviewing billable weight and pallet density together helps teams spot packaging decisions that look harmless in one mode but become expensive in another. A carton optimized for parcel may not build efficiently on a pallet.",
      "The best reviews include packaging, fulfillment, transportation, and sales operations. When each team sees the same measurements, cost tradeoffs become easier to explain."
    ]
  }
];

export function getGuideBySlug(slug: string): GuideArticle | undefined {
  return guideArticles.find((guide) => guide.slug === slug);
}
