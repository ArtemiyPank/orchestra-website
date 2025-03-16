"use client"

import { useTranslation } from "react-i18next"
import { useEffect, useState } from "react"
import CardAlumni from "@/components/CardAlumni"
import type { Alumni } from "@/types/Alumni"
import { motion } from "framer-motion"
import { fetchData } from "@/utils/fetchData"

const AlumniClient = () => {
  const { t, i18n, ready } = useTranslation("alumni")
  const [alumni, setAlumni] = useState<Alumni[]>([])

  useEffect(() => {
    const loadAlumni = async () => {
      const data = await fetchData("alumni", i18n.language as "en" | "ru" | "he")
      setAlumni(data)
    }
    loadAlumni()
  }, [i18n.language])

  if (!ready) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-pulse text-primary">Loading...</div>
      </div>
    )
  }

  if (alumni.length === 0) {
    return (
      <div className="text-center text-muted-foreground text-lg p-8">
        {t("noAlumni", "No alumni available at the moment.")}
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
          {t("title", { defaultValue: "Our Alumni" })}
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          {t("subtitle", "Meet the talented musicians who have been part of our orchestra")}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {alumni.map((person) => (
          <CardAlumni key={person.name} {...person} />
        ))}
      </div>
    </div>
  )
}

export default AlumniClient

