import type { MetadataRoute } from "next"
import { locales } from "@/i18n/settings"
import { siteUrl } from "@/lib/site"

const pages = ["/about", "/vocal-group", "/performances", "/alumni"]

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map((page) => ({
    url: `${siteUrl}/en${page}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: page === "/about" ? 1 : 0.8,
    alternates: {
      languages: Object.fromEntries(locales.map((l) => [l, `${siteUrl}/${l}${page}`])),
    },
  }))
}
