import performances from "@/data/performances.json"
import alumni from "@/data/alumni.json"
import type { Performance } from "@/types/Performance"
import type { Alumni } from "@/types/Alumni"

const availableLocales = ["en", "ru", "he"] as const
type Locale = (typeof availableLocales)[number] // "en" | "ru" | "he"

export const fetchData = <T extends "performances" | "alumni">(
  type: T,
  locale: Locale,
): T extends "performances" ? Performance[] : Alumni[] => {
  if (!availableLocales.includes(locale)) {
    console.warn(`Unsupported locale: ${locale}, defaulting to "en"`)
    locale = "en"
  }

  if (type === "performances") {
    return performances[locale] as never
  }

  if (type === "alumni") {
    return alumni[locale] as never
  }

  return [] as never
}

