"use client"

import { useTranslation } from "react-i18next"
import CardAlumni from "@/components/CardAlumni"
import { m } from "framer-motion"
import { fetchData } from "@/utils/fetchData"
import type { Locale } from "@/i18n/settings"

interface AlumniClientProps {
  locale: Locale
}

const AlumniClient = ({ locale }: AlumniClientProps) => {
  const { t } = useTranslation("alumni")
  // Данные — статически импортированный JSON, читаем синхронно:
  // контент попадает в SSR-HTML без промежуточных состояний загрузки
  const alumni = fetchData("alumni", locale)

  if (alumni.length === 0) {
    return (
      <div className="text-center text-muted-foreground text-lg p-8">
        {t("noAlumni", "No alumni available at the moment.")}
      </div>
    )
  }

  return (
    <div className="container mx-auto pt-2 pb-8 sm:py-12 px-0 sm:px-4 space-y-8 sm:space-y-12">
      <m.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-8 sm:mb-16"
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
          {t("title", { defaultValue: "Our Alumni" })}
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          {t("subtitle", "Meet the talented musicians who have been part of our orchestra")}
        </p>
      </m.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {alumni.map((person) => (
          <CardAlumni key={person.name} {...person} />
        ))}
      </div>
    </div>
  )
}

export default AlumniClient
