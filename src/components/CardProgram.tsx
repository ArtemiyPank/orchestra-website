"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Music, Calendar, MapPin, ChevronRight } from "lucide-react"
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
  ticketLink: string
}

interface CardProgramProps {
  program: Program
  viewProgramText: string
  buyTicketsText: string
}

const CardProgram = ({ program, viewProgramText, buyTicketsText }: CardProgramProps) => {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false)
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  const openGallery = (index: number) => {
    setActiveImageIndex(index)
    setIsGalleryOpen(true)
  }

  const closeGallery = () => {
    setIsGalleryOpen(false)
  }

  const nextImage = () => {
    setActiveImageIndex((prevIndex) => (prevIndex + 1) % program.cardPhotos.length)
  }

  const prevImage = () => {
    setActiveImageIndex((prevIndex) => (prevIndex - 1 + program.cardPhotos.length) % program.cardPhotos.length)
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

            <div className="flex flex-wrap gap-4 mt-6">
              <Button className="gap-2" size="lg" asChild>
                <a href={program.ticketLink} target="_blank" rel="noopener noreferrer">
                  {buyTicketsText}
                </a>
              </Button>
              <Button variant="outline" className="gap-2" size="lg" onClick={() => openGallery(0)}>
                {viewProgramText}
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>

          <div className="flex-1 bg-muted/10">
            <div className="grid grid-cols-2 gap-2 p-4">
              {program.cardPhotos.map((photo, index) => (
                <div
                  key={index}
                  className="relative aspect-[4/3] cursor-pointer overflow-hidden rounded-lg"
                  onClick={() => openGallery(index)}
                >
                  <Image
                    src={`${program.photoFolder}${photo}`}
                    alt={`${program.title} - Photo ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-110"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {isGalleryOpen && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-4xl relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 text-white bg-black/50 hover:bg-black/70 z-10"
              onClick={closeGallery}
            >
              <span className="sr-only">Close</span>✕
            </Button>
            <Image
              src={`${program.photoFolder}${program.cardPhotos[activeImageIndex]}`}
              alt={`Gallery image ${activeImageIndex + 1}`}
              width={1200}
              height={800}
              className="object-contain rounded-md"
            />
            <div className="absolute left-2 right-2 bottom-2 flex justify-between">
              <Button onClick={prevImage} variant="ghost" className="text-white bg-black/50 hover:bg-black/70">
                Previous
              </Button>
              <Button onClick={nextImage} variant="ghost" className="text-white bg-black/50 hover:bg-black/70">
                Next
              </Button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  )
}

export default CardProgram

