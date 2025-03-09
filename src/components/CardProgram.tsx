"use client"

import { useEffect, useState } from "react"
import type { Program } from "@/types/Program"
import { Dialog } from "@headlessui/react"
import DynamicPhotoGrid from "./DynamicPhotoGrid"
import { loadProgramPhotos } from "@/utils/ProgramPhotosLoader"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Music, Video } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

const CardProgram = ({ title, description, songs, videoLink, photoFolder, photoGrid, selectedPhotos }: Program) => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [photos, setPhotos] = useState<string[]>([])

  useEffect(() => {
    const fetchPhotos = async () => {
      const loadedPhotos = await loadProgramPhotos(photoFolder)

      // Filter photos by explicitly specified names
      const filteredPhotos = selectedPhotos?.length
        ? loadedPhotos.filter((photo) => selectedPhotos.includes(photo.split("/").pop() || ""))
        : loadedPhotos

      setPhotos(filteredPhotos)
    }

    fetchPhotos()
  }, [photoFolder, selectedPhotos])

  const openGallery = (index: number) => {
    setActiveImageIndex(index)
    setIsOpen(true)
  }

  const closeGallery = () => {
    setIsOpen(false)
  }

  if (!photoGrid || photos.length === 0) {
    console.warn(`Skipped program: "${title}". Grid: "${photoGrid}", Photos: ${photos.length}`)
    return null
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
              <h2 className="text-3xl font-bold mb-6 text-foreground">{title}</h2>
              <p className="text-muted-foreground mb-6">{description}</p>

              {songs && songs.length > 0 && (
                <div className="mb-6 space-y-3">
                  <div className="flex items-center gap-2 text-primary font-medium">
                    <Music className="h-5 w-5" />
                    <h3>Program</h3>
                  </div>
                  <ul className="space-y-2 pl-7">
                    {songs.map((song, index) => (
                      <li key={index} className="text-foreground/80 list-disc">
                        {song}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {videoLink && (
              <Button className="mt-6 gap-2 w-fit" size="lg" asChild>
                <a href={videoLink} target="_blank" rel="noopener noreferrer">
                  <Video className="h-4 w-4" />
                  <span>Watch Performance</span>
                </a>
              </Button>
            )}
          </CardContent>

          <div className="flex-1 bg-muted/10">
            <DynamicPhotoGrid
              photos={photos.map((src, index) => ({
                src,
                alt: `Photo ${index + 1} of ${title}`,
              }))}
              openGallery={openGallery}
              gridClass={photoGrid}
              selectedPhotoNames={selectedPhotos}
            />
          </div>
        </div>
      </Card>

      <Dialog open={isOpen} onClose={closeGallery} className="relative z-50">
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-4xl relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 text-white bg-black/50 hover:bg-black/70 z-10"
              onClick={closeGallery}
            >
              <span className="sr-only">Close</span>✕
            </Button>
            <Image
              src={photos[activeImageIndex] || "/placeholder.svg"}
              alt={`Gallery image ${activeImageIndex + 1}`}
              width={1200}
              height={800}
              className="object-contain rounded-md"
            />
          </Dialog.Panel>
        </div>
      </Dialog>
    </motion.div>
  )
}

export default CardProgram

