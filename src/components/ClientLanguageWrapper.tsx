"use client"

import { type ReactNode, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import "@/i18n/i18n"

interface ClientLanguageWrapperProps {
  children: ReactNode
}

export default function ClientLanguageWrapper({ children }: ClientLanguageWrapperProps) {
  const { i18n } = useTranslation()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)

    // Разрешаем прокрутку после загрузки
    document.body.style.overflow = "auto"
    document.documentElement.style.overflow = "auto"
  }, [])

  useEffect(() => {
    if (isClient) {
      const currentLang = i18n.language || "en"
      const isRTL = currentLang === "he"

      // Устанавливаем атрибуты для HTML
      document.documentElement.lang = currentLang
      document.documentElement.dir = isRTL ? "rtl" : "ltr"

      // Добавляем классы для RTL
      if (isRTL) {
        document.body.classList.add("rtl")
      } else {
        document.body.classList.remove("rtl")
      }
    }
  }, [i18n.language, isClient])

  if (!isClient) {
    return <div className="text-center p-4">Loading interface...</div>
  }

  return <>{children}</>
}

