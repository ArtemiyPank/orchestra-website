"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Music, Calendar, MapPin } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import type { Performance } from "@/types/Performance"

interface CardPerformanceProps {
  performance: Performance
}

const CardPerformance = ({ performance }: CardPerformanceProps) => {
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
                  {performance.date} at {performance.time}
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

          <div className="flex-1 bg-muted/10">
            <div className="grid grid-cols-2 gap-2 p-2 sm:p-4">
              {performance.cardPhotos.map((photo, index) => (
                <div key={index} className="relative aspect-[4/3] overflow-hidden rounded-lg">
                  <Image
                    src={`${performance.photoFolder}${photo}`}
                    alt={`${performance.title} - Photo ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

export default CardPerformance

