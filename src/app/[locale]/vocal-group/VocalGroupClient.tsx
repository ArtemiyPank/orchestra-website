"use client"

import { useTranslation } from "react-i18next"
import { m } from "framer-motion"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import VocalGroupLeader from "@/components/VocalGroupLeader"
import SoloistCard from "@/components/SoloistCard"
import type { Soloist } from "@/types/Soloist"
import soloistsData from "@/data/soloists.json"
import type { Locale } from "@/i18n/settings"

interface VocalGroupClientProps {
  locale: Locale
}

export default function VocalGroupClient({ locale }: VocalGroupClientProps) {
  const { t } = useTranslation("vocal-group")

  // Данные о солистах — синхронно из бандла по локали маршрута
  const soloists: Soloist[] = soloistsData[locale]

  // Анимация для элементов страницы
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <div className="pt-2 pb-8 sm:py-8">
      <m.div initial="hidden" animate="visible" variants={containerVariants} className="space-y-12">
        {/* Заголовок страницы */}
        <m.div variants={itemVariants} className="text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-brand-red">
            {t("title")}
          </h1>
          <p className="text-muted-foreground max-w-3xl mx-auto">{t("subtitle")}</p>
        </m.div>

        {/* Баннер вокальной группы */}
        <m.div variants={itemVariants} className="relative w-full h-64 md:h-80 lg:h-96 rounded-xl overflow-hidden">
          <Image src="/images/vocal-group.jpg" alt={t("bannerAlt")} fill sizes="(max-width: 1024px) 100vw, 1024px" className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
            <div className="p-6 text-white">
              <h2 className="text-2xl md:text-3xl font-bold">{t("bannerTitle")}</h2>
              <p className="text-white/80 max-w-2xl">{t("bannerDescription")}</p>
            </div>
          </div>
        </m.div>

        {/* Описание вокальной группы */}
        <m.div variants={itemVariants}>
          <Card>
            <CardContent className="p-6 md:p-8">
              <h2 className="text-2xl font-bold mb-4">{t("aboutTitle")}</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>{t("aboutParagraph1")}</p>
                <p>{t("aboutParagraph2")}</p>
              </div>
            </CardContent>
          </Card>
        </m.div>

        {/* Руководитель вокальной группы */}
        <m.div variants={itemVariants}>
          <h2 className="text-2xl font-bold mb-6 border-s-4 border-brand-red ps-3">{t("leaderTitle")}</h2>
          <VocalGroupLeader />
        </m.div>

        {/* Солисты */}
        <m.div variants={itemVariants} className="space-y-6">
          <h2 className="text-2xl font-bold mb-2 border-s-4 border-brand-red ps-3">{t("soloistsTitle")}</h2>
          <p className="text-muted-foreground mb-6">{t("soloistsDescription")}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {soloists.map((soloist) => (
              <m.div key={soloist.id} variants={itemVariants}>
                <SoloistCard soloist={soloist} locale={locale} />
              </m.div>
            ))}
          </div>
        </m.div>
      </m.div>
    </div>
  )
}

