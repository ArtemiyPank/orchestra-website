export const locales = ["en", "ru", "he"] as const
export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = "en"

export const namespaces = [
  "about",
  "alumni",
  "footer",
  "gallery",
  "navbar",
  "performances",
  "vocal-group",
] as const

export const isLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value)

export const getDirection = (locale: Locale): "rtl" | "ltr" =>
  locale === "he" ? "rtl" : "ltr"
