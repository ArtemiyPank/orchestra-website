"use client"

import { useTranslation } from "react-i18next"
import Image from "next/image"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Separator } from "@/components/ui/separator"
import AchievementsCarousel, { type Achievement } from "./AchievementsCarousel"
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
    <section className="container mx-auto px-2 sm:px-4 py-8 sm:py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-8 sm:mb-16"
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
          {t("title")}
        </h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative w-full h-[200px] sm:h-[300px] md:h-[500px] mb-6 sm:mb-10 rounded-xl sm:rounded-2xl overflow-hidden shadow-xl"
      >
        <Image
          src="/images/orchestra.jpg"
          alt="Atid Raziel Orchestra"
          fill
          className="object-cover object-center"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, 1200px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-6 md:p-8 text-white">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2">{t("heroTitle", "Our Orchestra")}</h2>
          <p className="text-sm sm:text-base text-white/90 max-w-2xl">
            {t("heroDescription", "A community of talented young musicians dedicated to excellence")}
          </p>
        </div>
      </motion.div>

      {/*описание оркестра */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="text-sm sm:text-base text-muted-foreground text-center max-w-4xl mx-auto mb-8 sm:mb-12 leading-relaxed"
      >
        {t("orchestraDescription", "Atid Raziel Orchestra brings together young talents from across the region, fostering musical growth, cultural appreciation, and community through powerful performances and artistic collaboration.")}
      </motion.div>


      {/* Achievements Carousel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mb-6 sm:mb-10"
      >
        <AchievementsCarousel achievements={achievements} title={t("achievementsTitle", "Orchestra Achievements")} />
      </motion.div>

      <Separator className="my-6 sm:my-10" />

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="flex flex-col md:flex-row items-center gap-6 sm:gap-12"
      >
        <div className="relative w-full md:w-1/2 h-[250px] sm:h-[300px] md:h-[400px] rounded-xl overflow-hidden shadow-lg">
          <Image
            src="/images/conductor.jpg"
            alt="Lev Arshtein"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 600px"
          />
        </div>
        <div className="md:w-1/2 space-y-3 sm:space-y-4">
          <h2 className="text-2xl sm:text-3xl font-bold">{t("conductorTitle")}</h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{t("conductorDescription")}</p>
          <div className="space-y-3 sm:space-y-4 pt-2 sm:pt-4">
            <p className="text-sm sm:text-base">{t("description1")}</p>
            <p className="text-sm sm:text-base">{t("description2")}</p>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export default AboutContent

