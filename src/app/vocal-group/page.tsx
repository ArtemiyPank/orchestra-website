"use client"

import { useTranslation } from "react-i18next"
import { motion } from "framer-motion"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import VocalGroupLeader from "@/components/VocalGroupLeader"
import SoloistCard from "@/components/SoloistCard"
import type { Soloist } from "@/types/Soloist"
import soloistsData from "@/data/soloists.json"

export default function VocalGroupPage() {
  const { t, i18n } = useTranslation("vocal-group")

  // Получаем данные о солистах из JSON файла в соответствии с текущим языком
  const currentLanguage = i18n.language || "en"
  // Используем язык из списка доступных или английский по умолчанию
  const language = ["en", "ru", "he"].includes(currentLanguage) ? currentLanguage : "en"
  const soloists: Soloist[] = soloistsData[language as keyof typeof soloistsData]

  console.log("currentLanguage - ", currentLanguage)

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
    <div className="py-8">
      <motion.div initial="hidden" animate="visible" variants={containerVariants} className="space-y-12">
        {/* Заголовок страницы */}
        <motion.div variants={itemVariants} className="text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{t("title")}</h1>
          <p className="text-muted-foreground max-w-3xl mx-auto">{t("subtitle")}</p>
        </motion.div>

        {/* Баннер вокальной группы */}
        <motion.div variants={itemVariants} className="relative w-full h-64 md:h-80 lg:h-96 rounded-xl overflow-hidden">
          <Image src="/images/vocal-group.jpg" alt={t("bannerAlt")} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
            <div className="p-6 text-white">
              <h2 className="text-2xl md:text-3xl font-bold">{t("bannerTitle")}</h2>
              <p className="text-white/80 max-w-2xl">{t("bannerDescription")}</p>
            </div>
          </div>
        </motion.div>

        {/* Описание вокальной группы */}
        <motion.div variants={itemVariants}>
          <Card>
            <CardContent className="p-6 md:p-8">
              <h2 className="text-2xl font-bold mb-4">{t("aboutTitle")}</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>{t("aboutParagraph1")}</p>
                <p>{t("aboutParagraph2")}</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Руководитель вокальной группы */}
        <motion.div variants={itemVariants}>
          <h2 className="text-2xl font-bold mb-6">{t("leaderTitle")}</h2>
          <VocalGroupLeader />
        </motion.div>

        {/* Солисты */}
        <motion.div variants={itemVariants} className="space-y-6">
          <h2 className="text-2xl font-bold mb-2">{t("soloistsTitle")}</h2>
          <p className="text-muted-foreground mb-6">{t("soloistsDescription")}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {soloists.map((soloist) => (
              <motion.div key={soloist.id} variants={itemVariants}>
                <SoloistCard soloist={soloist} locale={currentLanguage}/>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

