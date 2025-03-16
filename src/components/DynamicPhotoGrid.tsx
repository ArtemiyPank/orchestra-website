"use client"

import { useEffect, useState, useMemo } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

// Типы фотографий по соотношению сторон
type PhotoType = "horizontal" | "vertical" | "square"

// Интерфейс для фотографии
export interface Photo {
  src: string
  alt: string
  ratio?: number
  type?: PhotoType
}

// Интерфейс для шаблона сетки
interface GridTemplate {
  id: string
  name: string
  // Количество фотографий в шаблоне
  photoCount: number
  // Функция для определения "счета" соответствия шаблона имеющимся фотографиям
  getScore: (photos: Photo[]) => number
}

interface DynamicPhotoGridProps {
  photos: Photo[]
  openGallery: (index: number) => void
  className?: string
}

// Определяем тип фотографии на основе соотношения сторон
const getPhotoType = (ratio: number): PhotoType => {
  if (ratio > 1.2) return "horizontal"
  if (ratio < 0.8) return "vertical"
  return "square"
}

// Определяем шаблоны сеток для разного количества фотографий
const gridTemplates: GridTemplate[] = [
  // Шаблоны для 2 фотографий
  {
    id: "grid-2-a",
    name: "2 фото: горизонтальные в ряд",
    photoCount: 2,
    getScore: (photos) => {
      const horizontalCount = photos.filter((p) => p.type === "horizontal").length
      return horizontalCount * 2
    },
  },
  {
    id: "grid-2-b",
    name: "2 фото: вертикальные в столбец",
    photoCount: 2,
    getScore: (photos) => {
      const verticalCount = photos.filter((p) => p.type === "vertical").length
      return verticalCount * 2
    },
  },
  {
    id: "grid-2-c",
    name: "2 фото: большая и маленькая",
    photoCount: 2,
    getScore: (photos) => {
      // Идеально, если фотографии разных типов
      return photos[0]?.type !== photos[1]?.type ? 3 : 1
    },
  },

  // Шаблоны для 3 фотографий
  {
    id: "grid-3-a",
    name: "3 фото: вертикальные в ряд",
    photoCount: 3,
    getScore: (photos) => {
      const verticalCount = photos.filter((p) => p.type === "vertical").length
      return verticalCount * 1.5
    },
  },
  {
    id: "grid-3-b",
    name: "3 фото: вертикальная + 2 квадратных",
    photoCount: 3,
    getScore: (photos) => {
      const verticalCount = photos.filter((p) => p.type === "vertical").length
      const squareCount = photos.filter((p) => p.type === "square").length
      return verticalCount * 2 + squareCount
    },
  },
  {
    id: "grid-3-c",
    name: "3 фото: большая горизонтальная + 2 маленьких",
    photoCount: 3,
    getScore: (photos) => {
      const hasHorizontalFirst = photos[0]?.type === "horizontal" ? 3 : 0
      return hasHorizontalFirst + 1
    },
  },

  // Шаблоны для 4 фотографий
  {
    id: "grid-4-a",
    name: "4 фото: сетка 2x2",
    photoCount: 4,
    getScore: (photos) => {
      const squareCount = photos.filter((p) => p.type === "square").length
      return squareCount * 1.5
    },
  },
  {
    id: "grid-4-b",
    name: "4 фото: большая + 3 маленьких",
    photoCount: 4,
    getScore: (photos) => {
      const hasHorizontalFirst = photos[0]?.type === "horizontal" ? 3 : 0
      const hasVerticalFirst = photos[0]?.type === "vertical" ? 2 : 0
      return Math.max(hasHorizontalFirst, hasVerticalFirst) + 1
    },
  },
  {
    id: "grid-4-c",
    name: "4 фото: 2 строки по 2 фото",
    photoCount: 4,
    getScore: (photos) => {
      // Хорошо работает с чередованием горизонтальных и вертикальных фото
      const types = photos.map((p) => p.type)
      const alternating = types[0] !== types[1] && types[2] !== types[3] ? 3 : 1
      return alternating
    },
  },

  // Шаблоны для 5 фотографий
  {
    id: "grid-5-a",
    name: "5 фото: мозаика",
    photoCount: 5,
    getScore: (photos) => {
      // Бонус за разнообразие типов фотографий
      const diversity = new Set(photos.map((p) => p.type)).size * 2
      return diversity
    },
  },
  {
    id: "grid-5-b",
    name: "5 фото: большая + 4 маленьких",
    photoCount: 5,
    getScore: (photos) => {
      const hasHorizontalFirst = photos[0]?.type === "horizontal" ? 3 : 0
      return hasHorizontalFirst + 1
    },
  },
  {
    id: "grid-5-c",
    name: "5 фото: 2 большие + 3 маленьких",
    photoCount: 5,
    getScore: (photos) => {
      const horizontalCount = photos.slice(0, 2).filter((p) => p.type === "horizontal").length
      return horizontalCount * 2
    },
  },

  // Шаблоны для 6 фотографий
  {
    id: "grid-6-a",
    name: "6 фото: сетка 3x2",
    photoCount: 6,
    getScore: (photos) => {
      const squareCount = photos.filter((p) => p.type === "square").length
      return squareCount
    },
  },
  {
    id: "grid-6-b",
    name: "6 фото: большая + 5 маленьких",
    photoCount: 6,
    getScore: (photos) => {
      const hasHorizontalFirst = photos[0]?.type === "horizontal" ? 3 : 0
      return hasHorizontalFirst + 1
    },
  },
  {
    id: "grid-6-c",
    name: "6 фото: 3 строки по 2 фото",
    photoCount: 6,
    getScore: (photos) => {
      // Хорошо работает с чередованием горизонтальных и вертикальных фото
      const horizontalCount = photos.filter((p) => p.type === "horizontal").length
      const verticalCount = photos.filter((p) => p.type === "vertical").length
      return Math.min(horizontalCount, verticalCount) * 1.5
    },
  },

  // Шаблоны для 7 фотографий
  {
    id: "grid-7-a",
    name: "7 фото: мозаика",
    photoCount: 7,
    getScore: (photos) => {
      // Бонус за разнообразие типов фотографий
      const diversity = new Set(photos.map((p) => p.type)).size * 2
      return diversity
    },
  },
  {
    id: "grid-7-b",
    name: "7 фото: большая + 6 маленьких",
    photoCount: 7,
    getScore: (photos) => {
      const hasHorizontalFirst = photos[0]?.type === "horizontal" ? 3 : 0
      return hasHorizontalFirst + 1
    },
  },
  {
    id: "grid-7-c",
    name: "7 фото: 3 большие + 4 маленьких",
    photoCount: 7,
    getScore: (photos) => {
      const horizontalCount = photos.slice(0, 3).filter((p) => p.type === "horizontal").length
      return horizontalCount * 1.5
    },
  },
]

// Максимальное количество фотографий для обработки
const MAX_PHOTOS = 7
// Таймаут для загрузки изображения (мс)
const IMAGE_LOAD_TIMEOUT = 500

const DynamicPhotoGrid = ({ photos, openGallery, className }: DynamicPhotoGridProps) => {
  const [processedPhotos, setProcessedPhotos] = useState<Photo[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Загружаем и анализируем фотографии
  useEffect(() => {
    const loadAndAnalyzePhotos = async () => {
      setIsLoading(true)

      try {
        // Ограничиваем количество обрабатываемых фотографий
        const limitedPhotos = photos.slice(0, MAX_PHOTOS)

        const photosWithDetails = await Promise.all(
          limitedPhotos.map(async (photo) => {
            return new Promise<Photo>((resolve) => {
              // Если у фото уже есть ratio и type, используем их
              if (photo.ratio && photo.type) {
                resolve(photo)
                return
              }

              const img = new window.Image()
              img.crossOrigin = "anonymous"
              img.src = photo.src

              // Устанавливаем таймаут для загрузки изображения
              const timeout = setTimeout(() => {
                // Если изображение не загрузилось за отведенное время,
                // используем значения по умолчанию
                console.log(`Image load timeout for ${photo.src}`)
                resolve({
                  ...photo,
                  ratio: 1.33, // Стандартное соотношение 4:3
                  type: "horizontal" as PhotoType,
                })
              }, IMAGE_LOAD_TIMEOUT)

              img.onload = () => {
                clearTimeout(timeout)
                const ratio = img.naturalWidth / img.naturalHeight
                const type = getPhotoType(ratio)
                resolve({ ...photo, ratio, type })
              }

              img.onerror = () => {
                clearTimeout(timeout)
                // Если изображение не загрузилось, используем значения по умолчанию
                console.error(`Failed to load image: ${photo.src}`)
                resolve({ ...photo, ratio: 1, type: "square" })
              }
            })
          }),
        )

        setProcessedPhotos(photosWithDetails)
      } catch (error) {
        console.error("Error analyzing photos:", error)
        // В случае ошибки используем исходные фотографии с типом "square"
        setProcessedPhotos(
          photos.slice(0, MAX_PHOTOS).map((photo) => ({
            ...photo,
            ratio: 1,
            type: "square" as PhotoType,
          })),
        )
      }

      setIsLoading(false)
    }

    loadAndAnalyzePhotos()
  }, [photos])

  // Выбираем наиболее подходящий шаблон сетки
  const { selectedGrid, selectedPhotos } = useMemo(() => {
    if (processedPhotos.length === 0) {
      return { selectedGrid: null, selectedPhotos: [] }
    }

    // Фильтруем шаблоны, которые подходят по количеству фотографий
    const suitableTemplates = gridTemplates.filter((template) => template.photoCount === processedPhotos.length)

    if (suitableTemplates.length === 0) {
      // Если нет шаблонов с точным совпадением, найдем ближайший подходящий
      // Предпочитаем шаблоны, которые могут вместить все фотографии
      const closestTemplate =
        gridTemplates
          .filter((t) => t.photoCount >= processedPhotos.length)
          .sort((a, b) => a.photoCount - b.photoCount)[0] ||
        gridTemplates.sort((a, b) => b.photoCount - a.photoCount)[0]

      return {
        selectedGrid: closestTemplate,
        selectedPhotos: processedPhotos.slice(0, closestTemplate.photoCount),
      }
    }

    // Вычисляем оценку для каждого подходящего шаблона
    const scoredTemplates = suitableTemplates.map((template) => ({
      template,
      score: template.getScore(processedPhotos),
    }))

    // Выбираем шаблон с наивысшей оценкой
    const bestTemplate = scoredTemplates.sort((a, b) => b.score - a.score)[0].template

    return {
      selectedGrid: bestTemplate,
      selectedPhotos: processedPhotos,
    }
  }, [processedPhotos])

  if (isLoading) {
    return (
      <div className="w-full h-full min-h-[300px] bg-muted/20 animate-pulse rounded-md flex items-center justify-center">
        <p className="text-muted-foreground">Загрузка фотографий...</p>
      </div>
    )
  }

  return (
    <div className={cn("w-full h-full min-h-[300px]", className)}>
      {selectedGrid && (
        <div className={cn("photo-grid", selectedGrid.id, "w-full h-full")}>
          {selectedPhotos.map((photo, index) => (
            <div
              key={index}
              className={cn(
                "photo-item",
                `photo-${index + 1}`,
                "relative overflow-hidden rounded-md cursor-pointer group",
              )}
              onClick={() => openGallery(index)}
            >
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors z-10" />
              <Image
                src={photo.src || "/placeholder.svg"}
                alt={photo.alt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                priority={index < 2} // Приоритетная загрузка только для первых двух изображений
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default DynamicPhotoGrid

