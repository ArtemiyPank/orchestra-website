"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Music, Calendar, MapPin } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export type Program = {
  id: string
  title: string
  date: string
  time: string
  venue: string
  description: string
  photoFolder: string
  cardPhotos: string[]
  program: string[]
}

interface CardProgramProps {
  program: Program
}

const CardProgram = ({ program }: CardProgramProps) => {
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
            className={cn("flex-1 p-8 flex flex-col justify-between", "bg-gradient-to-br from-background to-muted/30")}
          >
            <div>
              <h2 className="text-3xl font-bold mb-4 text-foreground">{program.title}</h2>
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <Calendar className="h-4 w-4" />
                <span>
                  {program.date} at {program.time}
                </span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground mb-4">
                <MapPin className="h-4 w-4" />
                <span>{program.venue}</span>
              </div>
              <p className="text-muted-foreground mb-6">{program.description}</p>

              <div className="mb-6 space-y-3">
                <div className="flex items-center gap-2 text-primary font-medium">
                  <Music className="h-5 w-5" />
                  <h3>Program</h3>
                </div>
                <ul className="space-y-2 pl-7">
                  {program.program.map((item, index) => (
                    <li key={index} className="text-foreground/80 list-disc">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>

          <div className="flex-1 bg-muted/10">
            <div className="grid grid-cols-2 gap-2 p-4">
              {program.cardPhotos.map((photo, index) => (
                <div key={index} className="relative aspect-[4/3] cursor-pointer overflow-hidden rounded-lg">
                  <Image
                    src={`${program.photoFolder}${photo}`}
                    alt={`${program.title} - Photo ${index + 1}`}
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

export default CardProgram

