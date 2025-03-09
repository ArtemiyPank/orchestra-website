"use client"

import { useTranslation } from "react-i18next"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

const LanguageSwitcher = () => {
  const { i18n } = useTranslation()

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
  }

  const isRTL = i18n.language === "he"

  const languages = [
    { code: "en", label: "EN" },
    { code: "ru", label: "RU" },
    { code: "he", label: "HE" },
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={cn("flex gap-1", isRTL ? "flex-row-reverse" : "")}
    >
      {languages.map((lang) => (
        <Button
          key={lang.code}
          onClick={() => changeLanguage(lang.code)}
          variant={i18n.language === lang.code ? "default" : "outline"}
          size="sm"
          className={cn(
            "rounded-full px-3 font-medium transition-all",
            i18n.language === lang.code ? "shadow-sm" : "text-foreground/70 hover:text-foreground",
          )}
        >
          {lang.label}
        </Button>
      ))}
    </motion.div>
  )
}

export default LanguageSwitcher

