"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Music, Calendar, MapPin } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import type { Performance } from "@/types/Performance"
import DynamicPhotoGrid from "@/components/DynamicPhotoGrid"
import ModernGallery from "@/components/ModernGallery"
import "@/styles/GridTemplates.css"

interface CardPerformanceProps {
  performance: Performance
  locale?: string
}

const CardPerformance = ({ performance, locale }: CardPerformanceProps) => {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false)
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const currentLocale = locale || document.documentElement.lang

  // Преобразуем cardPhotos в формат, необходимый для DynamicPhotoGrid
  const gridPhotos = performance.cardPhotos.map((photo) => ({
    src: `${performance.photoFolder}${photo}`,
    alt: `${performance.title} - Photo`,
  }))

  // Функция для открытия галереи
  const openGallery = (index: number) => {
    setActiveImageIndex(index)
    setIsGalleryOpen(true)
  }

  const closeGallery = () => {
    setIsGalleryOpen(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <Card className="overflow-hidden border-none shadow-lg">
        <div className="flex flex-col lg:flex-row">
          <CardContent
            className={cn(
              "flex-1 p-4 sm:p-6 lg:p-8 flex flex-col justify-between",
              "bg-gradient-to-br from-background to-muted/30",
            )}
          >
            <div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 sm:mb-4 text-foreground">
                {performance.title}
              </h2>
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <Calendar className="h-4 w-4 flex-shrink-0" />
                <span className="text-sm sm:text-base">
                  {performance.date}
                </span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground mb-3 sm:mb-4">
                <MapPin className="h-4 w-4 flex-shrink-0" />
                <span className="text-sm sm:text-base">{performance.venue}</span>
              </div>
              <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6">{performance.description}</p>

              <div className="mb-4 sm:mb-6 space-y-2 sm:space-y-3">
                <div className="flex items-center gap-2 text-primary font-medium">
                  <Music className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                  <h3 className="text-sm sm:text-base">Program</h3>
                </div>
                <ul className="space-y-1 sm:space-y-2 pl-5 sm:pl-7">
                  {performance.program.map((item, index) => (
                    <li key={index} className="text-sm sm:text-base text-foreground/80 list-disc">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>

          {/* Обновленная часть с сеткой фотографий */}
          <div className="flex-1 bg-muted/10 p-2 sm:p-4 min-h-[200px]">
            <div className="h-full w-full cursor-pointer">
              <DynamicPhotoGrid photos={gridPhotos} openGallery={openGallery} />
            </div>
          </div>
        </div>
      </Card>

      {/* Современная галерея фотографий с поддержкой локализации */}
      <ModernGallery
        isOpen={isGalleryOpen}
        onClose={closeGallery}
        initialIndex={activeImageIndex}
        photoFolder={performance.photoFolder}
        photos={performance.cardPhotos}
        title={performance.title}
        locale={currentLocale}
      />
    </motion.div>
  )
}

export default CardPerformance

