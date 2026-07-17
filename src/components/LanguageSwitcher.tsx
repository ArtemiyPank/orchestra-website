"use client"

import { useTranslation } from "react-i18next"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { m } from "framer-motion"
import { isLocale, type Locale } from "@/i18n/settings"

const LanguageSwitcher = () => {
  const { i18n } = useTranslation()
  const pathname = usePathname()
  const router = useRouter()

  const currentLang = i18n.language
  const isRTL = currentLang === "he"

  // Язык живёт в URL: /en/about -> /he/about. Cookie запоминает выбор
  // для редиректа со старых ссылок без префикса (см. middleware).
  const changeLanguage = (lng: Locale) => {
    if (lng === currentLang) return
    document.cookie = `NEXT_LOCALE=${lng}; path=/; max-age=31536000; samesite=lax`

    const segments = pathname.split("/")
    if (isLocale(segments[1])) {
      segments[1] = lng
    } else {
      segments.splice(1, 0, lng)
    }
    router.push(segments.join("/") || `/${lng}/about`)
  }

  const languages: { code: Locale; label: string }[] = [
    { code: "en", label: "EN" },
    { code: "ru", label: "RU" },
    { code: "he", label: "HE" },
  ]

  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={cn("flex gap-1", isRTL ? "flex-row-reverse" : "")}
    >
      {languages.map((lang) => (
        <Button
          key={lang.code}
          onClick={() => changeLanguage(lang.code)}
          variant={currentLang === lang.code ? "default" : "outline"}
          size="sm"
          className={cn(
            "rounded-full px-3 font-medium transition-all",
            currentLang === lang.code ? "shadow-sm" : "text-foreground/70 hover:text-foreground",
          )}
        >
          {lang.label}
        </Button>
      ))}
    </m.div>
  )
}

export default LanguageSwitcher
