"use client"

import { useTranslation } from "react-i18next"
import Image from "next/image"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Separator } from "@/components/ui/separator"
import AchievementsCarousel, { type Achievement } from "./AchievementsСarousel"
import achievementsData from "@/data/achievements.json"

type AchievementsData = {
  [key: string]: Achievement[]
}

const AboutContent = () => {
  const { t, i18n } = useTranslation("about")
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-pulse text-primary">Loading...</div>
      </div>
    )
  }

  const currentLanguage = i18n.language || "en"
  const achievements = (achievementsData as AchievementsData)[currentLanguage] || achievementsData.en

  return (
    <section className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
          {t("title")}
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          {t("subtitle", "Inspiring young musicians through orchestral excellence and cultural heritage")}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative w-full h-[500px] mb-16 rounded-2xl overflow-hidden shadow-xl"
      >
        <Image src="/images/orchestra.jpg" alt="Atid Raziel Orchestra" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <h2 className="text-3xl font-bold mb-2">{t("heroTitle", "Our Orchestra")}</h2>
          <p className="text-white/90 max-w-2xl">
            {t("heroDescription", "A community of talented young musicians dedicated to excellence")}
          </p>
        </div>
      </motion.div>

      {/* Achievements Carousel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mb-16"
      >
        <AchievementsCarousel achievements={achievements} title={t("achievementsTitle", "Orchestra Achievements")} />
      </motion.div>

      <Separator className="my-16" />

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="flex flex-col md:flex-row items-center gap-12"
      >
        <div className="relative w-full md:w-1/2 h-[400px] rounded-xl overflow-hidden shadow-lg">
          <Image src="/images/conductor.jpg" alt="Lev Arshtein" fill className="object-cover" />
        </div>
        <div className="md:w-1/2 space-y-4">
          <h2 className="text-3xl font-bold">{t("conductorTitle")}</h2>
          <p className="text-muted-foreground leading-relaxed">{t("conductorDescription")}</p>
          <div className="space-y-4 pt-4">
            <p>{t("description1")}</p>
            <p>{t("description2")}</p>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export default AboutContent

