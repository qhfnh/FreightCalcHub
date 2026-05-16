import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/site";

interface SeoInput {
  title: string;
  description: string;
  path: string;
}

export function buildMetadata({ title, description, path }: SeoInput): Metadata {
  const url = absoluteUrl(path);
  const fullTitle = title.includes(siteConfig.name)
    ? title
    : `${title} | ${siteConfig.name}`;

  return {
    title: fullTitle,
    description,
    alternates: {
      canonical: url
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: siteConfig.name,
      type: "website",
      locale: "en_US"
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description
    }
  };
}
