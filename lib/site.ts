export const siteConfig = {
  name: "FreightCalcHub",
  tagline: "Free calculators for shipping, freight, pallets, containers, and warehouse planning.",
  description:
    "FreightCalcHub provides free online calculators for ecommerce sellers, logistics teams, warehouse planners, and freight shippers.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://freightcalchub.com",
  contactEmail: "hello@freightcalchub.com",
  adsenseClientId: process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID
};

export function absoluteUrl(path: string): string {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return new URL(cleanPath, siteConfig.url).toString();
}
