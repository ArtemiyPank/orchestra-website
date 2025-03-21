"use client"

import { useTranslation } from "react-i18next"
import { useEffect, useState } from "react"
import CardPerformance from "@/components/CardPerformance"
import type { Performance } from "@/types/Performance"
import { motion } from "framer-motion"
import { fetchData } from "@/utils/fetchData"

const PerformancesClient = () => {
  const { t, i18n, ready } = useTranslation("performances")
  const [performances, setPerformances] = useState<Performance[]>([])

  useEffect(() => {
    const loadPerformances = async () => {
      const data = await fetchData("performances", i18n.language as "en" | "ru" | "he")
      setPerformances(data)
    }
    loadPerformances()
  }, [i18n.language])

  if (!ready) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-pulse text-primary">Loading...</div>
      </div>
    )
  }

  if (performances.length === 0) {
    return (
      <div className="text-center text-muted-foreground text-lg p-8">
        {t("noPerformances", "No performances available at the moment.")}
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 sm:py-12 px-0 sm:px-4 space-y-8 sm:space-y-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-8 sm:mb-16"
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
          {t("title", { defaultValue: "Our Performances" })}
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          {t("subtitle", "Explore our diverse musical performances")}
        </p>
      </motion.div>

      <div className="space-y-8 sm:space-y-16">
        {performances.map((performance) => (
          <CardPerformance key={performance.id} performance={performance} />
        ))}
      </div>
    </div>
  )
}

export default PerformancesClient

