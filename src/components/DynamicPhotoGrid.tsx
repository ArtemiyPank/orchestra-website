"use client"

import type React from "react"
import { useEffect, useMemo, useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

type Photo = {
  src: string
  alt: string
  ratio?: number // Aspect ratio of the image
}

type DynamicPhotoGridProps = {
  photos: Photo[]
  openGallery: (index: number) => void
  gridClass?: string // Option to specify a specific grid
  selectedPhotoNames?: string[] // Option to specify specific photos
}

// 13 grid templates with requirements for photo types
const gridTemplates = [
  { template: "grid-template-1", required: { horizontal: 1, vertical: 1, square: 2 } },
  { template: "grid-template-2", required: { horizontal: 1, vertical: 1, square: 2 } },
  { template: "grid-template-3", required: { horizontal: 1, vertical: 1, square: 2 } },
  { template: "grid-template-4", required: { horizontal: 1, vertical: 1, square: 2 } },
  { template: "grid-template-5", required: { horizontal: 2, vertical: 1 } },
  { template: "grid-template-6", required: { horizontal: 2, vertical: 1 } },
  { template: "grid-template-7", required: { square: 4 } },
  { template: "grid-template-8", required: { square: 1, horizontal: 2 } },
  { template: "grid-template-9", required: { square: 1, horizontal: 2 } },
  { template: "grid-template-10", required: { horizontal: 2 } },
  { template: "grid-template-11", required: { horizontal: 3 } },
  { template: "grid-template-12", required: { horizontal: 5 } },
  { template: "grid-template-13", required: { horizontal: 5 } },
]

const getRandomElement = <T,>(array: T[]): T => array[Math.floor(Math.random() * array.length)]

const DynamicPhotoGrid: React.FC<DynamicPhotoGridProps> = ({ photos, openGallery, gridClass, selectedPhotoNames }) => {
  const [photosWithRatios, setPhotosWithRatios] = useState<Photo[]>([])

  useEffect(() => {
    const calculateImageRatios = async () => {
      const photosWithRatios = await Promise.all(
        photos.map(async (photo) => {
          return new Promise<Photo>((resolve) => {
            const img = new Image()
            img.crossOrigin = "anonymous"
            img.src = photo.src
            img.onload = () => {
              const ratio = img.naturalWidth / img.naturalHeight
              resolve({ ...photo, ratio })
            }
            img.onerror = () => {
              // If image fails to load, use a default ratio
              resolve({ ...photo, ratio: 1 })
            }
          })
        }),
      )
      setPhotosWithRatios(photosWithRatios)
    }

    calculateImageRatios()
  }, [photos])

  const { selectedPhotos, chosenGridClass } = useMemo(() => {
    // If specific photos and grid are specified, use them
    if (gridClass && selectedPhotoNames?.length) {
      const filteredPhotos = photosWithRatios.filter((photo) =>
        selectedPhotoNames.includes(photo.src.split("/").pop() || ""),
      )
      console.log("Using explicit grid:", gridClass)
      console.log(
        "Using photos:",
        filteredPhotos.map((p) => p.src),
      )

      return { selectedPhotos: filteredPhotos, chosenGridClass: gridClass }
    }

    // Automatic selection of a suitable grid
    const suitableTemplates = gridTemplates.filter(({ required }) => {
      return photos.length >= Object.values(required).reduce((sum, val) => sum + val, 0)
    })

    if (suitableTemplates.length > 0) {
      const chosenTemplate = getRandomElement(suitableTemplates)
      const selected: Photo[] = photos.slice(
        0,
        Object.values(chosenTemplate.required).reduce((a, b) => a + b, 0),
      )

      console.log("Selected random grid:", chosenTemplate.template)
      console.log(
        "Selected photos:",
        selected.map((photo) => photo.src),
      )

      return { selectedPhotos: selected, chosenGridClass: chosenTemplate.template }
    }

    console.warn("No suitable templates, using default grid.")
    return { selectedPhotos: photosWithRatios.slice(0, 5), chosenGridClass: "grid-template-1" }
  }, [photosWithRatios, gridClass, selectedPhotoNames, photos])

  return (
    <div className={cn("photo-grid-container", chosenGridClass)}>
      {selectedPhotos.map((photo, index) => (
        <div key={index} className={cn("photo-item", `photo-${index + 1}`, "group")} onClick={() => openGallery(index)}>
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors z-10" />
          <Image
            src={photo.src || "/placeholder.svg"}
            alt={photo.alt}
            fill
            className="object-cover transition-all duration-300 group-hover:scale-105"
          />
        </div>
      ))}
    </div>
  )
}

export default DynamicPhotoGrid

