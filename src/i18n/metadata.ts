import type { Metadata } from "next"
import { resources } from "./resources"
import { locales, type Locale } from "./settings"
import { siteUrl, siteName } from "@/lib/site"

type Namespace = keyof (typeof resources)["en"]

// Локализованные title/description из словарей + hreflang + Open Graph
export const buildPageMetadata = (locale: Locale, ns: Namespace, path: string): Metadata => {
  const dict = resources[locale][ns] as Record<string, string>
  const languages = Object.fromEntries(locales.map((l) => [l, `/${l}${path}`]))

  const title = `${dict.title} | ${siteName}`
  const description =
    dict.subtitle ?? dict.orchestraDescription ?? "Official website of the Ort Raziel Orchestra"

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    alternates: {
      canonical: `/${locale}${path}`,
      languages: { ...languages, "x-default": `/en${path}` },
    },
    openGraph: {
      title,
      description,
      url: `/${locale}${path}`,
      siteName,
      locale,
      type: "website",
      images: [{ url: "/images/og.jpg", width: 1200, height: 630, alt: siteName }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/og.jpg"],
    },
  }
}
