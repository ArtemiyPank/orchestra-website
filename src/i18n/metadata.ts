import type { Metadata } from "next"
import { resources } from "./resources"
import { locales, type Locale } from "./settings"

type Namespace = keyof (typeof resources)["en"]

// Локализованные title/description из словарей + hreflang-альтернативы
export const buildPageMetadata = (locale: Locale, ns: Namespace, path: string): Metadata => {
  const dict = resources[locale][ns] as Record<string, string>
  const languages = Object.fromEntries(locales.map((l) => [l, `/${l}${path}`]))

  return {
    title: `${dict.title} | Atid Raziel Orchestra`,
    description: dict.subtitle ?? dict.orchestraDescription ?? "Official website of the Atid Raziel Orchestra",
    alternates: {
      languages: { ...languages, "x-default": `/en${path}` },
    },
  }
}
