"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { X, ChevronLeft, ChevronRight, Download, Share, ZoomIn, ZoomOut, Info } from 'lucide-react'
import { cn } from "@/lib/utils"
import { useSwipeable } from "react-swipeable"
import { useTranslation } from "next-i18next"
import { useParams } from "next/navigation"

interface ModernGalleryProps {
  isOpen: boolean
  onClose: () => void
  initialIndex: number
  photoFolder: string
  photos: string[]
  title?: string
  locale?: string
}

export default function ModernGallery({
  isOpen,
  onClose,
  initialIndex,
  photoFolder,
  photos,
  title,
  locale = "en"
}: ModernGalleryProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const params = useParams()
  const { t } = useTranslation("gallery")
  const [activeIndex, setActiveIndex] = useState(initialIndex)
  const [isLoading, setIsLoading] = useState(true)
  const [isInfoVisible, setIsInfoVisible] = useState(false)
  const [zoomLevel, setZoomLevel] = useState(1)
  const [allPhotos, setAllPhotos] = useState<string[]>(photos)
  const [isLoadingPhotos, setIsLoadingPhotos] = useState(false)

  // Определяем направление текста в зависимости от локали
  const isRTL = locale === "he"

  // Загрузка всех фотографий из папки
  useEffect(() => {
    const fetchAllPhotos = async () => {
      if (!isOpen || isLoadingPhotos) return

      setIsLoadingPhotos(true)

      try {
        // Удаляем начальный слеш, если он есть
        const folderPath = photoFolder.startsWith("/") ? photoFolder.substring(1) : photoFolder

        console.log("Fetching photos from folder:", folderPath)

        const response = await fetch(`/api/photos/${encodeURIComponent(folderPath)}`)

        if (!response.ok) {
          const errorData = await response.json()
          console.error("API error:", errorData)
          throw new Error(`HTTP error! status: ${response.status}, message: ${JSON.stringify(errorData)}`)
        }

        const data = await response.json()
        console.log("API response:", data)

        if (Array.isArray(data) && data.length > 0) {
          console.log("Setting all photos:", data)
          setAllPhotos(data)

          // Если текущий индекс выходит за пределы нового массива, сбрасываем его
          if (activeIndex >= data.length) {
            setActiveIndex(0)
          }
        } else {
          console.warn("No photos found or invalid response format, using provided photos")
        }
      } catch (error) {
        console.error("Error fetching photos:", error)
        // Если не удалось загрузить все фотографии, используем те, что уже есть
      } finally {
        setIsLoadingPhotos(false)
      }
    }

    if (isOpen) {
      fetchAllPhotos()
    }
  }, [isOpen, photoFolder])

  // Сброс состояния при открытии галереи
  useEffect(() => {
    if (isOpen) {
      setActiveIndex(initialIndex)
      setZoomLevel(1)
      setIsInfoVisible(false)
    }
  }, [isOpen, initialIndex])

  // Навигация по галерее
  const nextImage = useCallback(() => {
    if (zoomLevel > 1) return // Не переключаем при увеличении
    setActiveIndex((prevIndex) => (prevIndex + 1) % allPhotos.length)
    setIsLoading(true)
  }, [allPhotos.length, zoomLevel])

  const prevImage = useCallback(() => {
    if (zoomLevel > 1) return // Не переключаем при увеличении
    setActiveIndex((prevIndex) => (prevIndex - 1 + allPhotos.length) % allPhotos.length)
    setIsLoading(true)
  }, [allPhotos.length, zoomLevel])

  // Обработка свайпов для мобильных устройств
  const handlers = useSwipeable({
    onSwipedLeft: () => nextImage(),
    onSwipedRight: () => prevImage(),
    trackMouse: true,
    touchEventOptions: { passive: false }
  });

  // Обработчик клавиш для навигации по галерее
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return

      if (e.key === "ArrowRight") {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        isRTL ? prevImage() : nextImage()
      } else if (e.key === "ArrowLeft") {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        isRTL ? nextImage() : prevImage()
      } else if (e.key === "Escape") {
        onClose()
      } else if (e.key === "+" || e.key === "=") {
        setZoomLevel((prev) => Math.min(prev + 0.5, 3))
      } else if (e.key === "-") {
        setZoomLevel((prev) => Math.max(prev - 0.5, 1))
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, nextImage, prevImage, onClose, isRTL])

  // Функция для скачивания текущего изображения
  const downloadImage = () => {
    const link = document.createElement("a")
    link.href = `${photoFolder}${allPhotos[activeIndex]}`
    link.download = allPhotos[activeIndex]
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Функция для поделиться изображением
  const shareImage = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: t("shareTitle"),
          text: t("shareText"),
          url: window.location.origin + `${photoFolder}${allPhotos[activeIndex]}`,
        })
      } catch (error) {
        console.error("Error sharing:", error)
      }
    } else {
      // Копируем ссылку в буфер обмена, если API share недоступен
      navigator.clipboard
        .writeText(window.location.origin + `${photoFolder}${allPhotos[activeIndex]}`)
        .then(() => alert(t("linkCopied")))
        .catch((err) => console.error("Failed to copy link:", err))
    }
  }

  // Функция для увеличения/уменьшения изображения
  const toggleZoom = () => {
    setZoomLevel((prev) => (prev > 1 ? 1 : 2))
  }

  if (allPhotos.length === 0) {
    return null
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={cn("fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex flex-col", isRTL ? "rtl" : "ltr")}
          onClick={onClose}
          dir={isRTL ? "rtl" : "ltr"}
        >
          {/* Верхняя панель */}
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="w-full p-4 flex justify-between items-center z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-white text-sm md:text-base truncate max-w-[60%]">
              {title && <h3 className="font-medium">{title}</h3>}
              <p className="text-white/70 text-xs md:text-sm">
                {activeIndex + 1} {t("of")} {allPhotos.length}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10 h-8 w-8 md:h-10 md:w-10"
                onClick={(e) => {
                  e.stopPropagation()
                  setIsInfoVisible(!isInfoVisible)
                }}
                title={t("info")}
              >
                <Info className="h-4 w-4 md:h-5 md:w-5" />
                <span className="sr-only">{t("info")}</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10 h-8 w-8 md:h-10 md:w-10"
                onClick={(e) => {
                  e.stopPropagation()
                  toggleZoom()
                }}
                title={zoomLevel > 1 ? t("zoomOut") : t("zoomIn")}
              >
                {zoomLevel > 1 ? (
                  <ZoomOut className="h-4 w-4 md:h-5 md:w-5" />
                ) : (
                  <ZoomIn className="h-4 w-4 md:h-5 md:w-5" />
                )}
                <span className="sr-only">{t("zoom")}</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10 h-8 w-8 md:h-10 md:w-10"
                onClick={(e) => {
                  e.stopPropagation()
                  downloadImage()
                }}
                title={t("download")}
              >
                <Download className="h-4 w-4 md:h-5 md:w-5" />
                <span className="sr-only">{t("download")}</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10 h-8 w-8 md:h-10 md:w-10"
                onClick={(e) => {
                  e.stopPropagation()
                  shareImage()
                }}
                title={t("share")}
              >
                <Share className="h-4 w-4 md:h-5 md:w-5" />
                <span className="sr-only">{t("share")}</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10 h-8 w-8 md:h-10 md:w-10"
                onClick={onClose}
                title={t("close")}
              >
                <X className="h-4 w-4 md:h-5 md:w-5" />
                <span className="sr-only">{t("close")}</span>
              </Button>
            </div>
          </motion.div>

          {/* Основной контент галереи */}
          <div className="flex-1 flex items-center justify-center overflow-hidden" {...handlers}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  transition: { duration: 0.3 },
                }}
                exit={{ opacity: 0, scale: 0.9 }}
                className={cn(
                  "relative w-full h-full flex items-center justify-center",
                  zoomLevel > 1 ? "cursor-move" : "cursor-default",
                )}
                onClick={(e) => e.stopPropagation()}
              >
                <div
                  className={cn(
                    "relative max-w-full max-h-full transition-transform duration-200",
                    zoomLevel > 1 ? "overflow-auto" : "overflow-hidden",
                  )}
                  style={{
                    transform: `scale(${zoomLevel})`,
                    transformOrigin: "center",
                  }}
                >
                  <Image
                    src={`${photoFolder}${allPhotos[activeIndex]}`}
                    alt={`${title || ""} - ${activeIndex + 1}`}
                    width={1200}
                    height={800}
                    priority
                    className="object-contain max-h-[calc(100vh-120px)] w-auto h-auto"
                    onLoad={() => setIsLoading(false)}
                  />
                  {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                      <div className="w-8 h-8 border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
                    </div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Нижняя панель с навигацией */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="w-full p-4 flex justify-between items-center z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              onClick={(e) => {
                e.stopPropagation()
                prevImage()
              }}
              variant="ghost"
              className="text-white bg-black/50 hover:bg-black/70 h-10 px-4"
              disabled={zoomLevel > 1}
            >
              {isRTL ? <ChevronRight className="h-5 w-5 ml-2" /> : <ChevronLeft className="h-5 w-5 mr-2" />}

              {/* <ChevronLeft className="h-5 w-5 mr-2" /> */}
              <span className="hidden sm:inline">{t("previous")}</span>
            </Button>

            <div className="flex-1 mx-4 overflow-x-auto py-2 hidden md:block">
              <div className="flex gap-2 justify-center">
                {allPhotos.map((photo, index) => (
                  <button
                    key={index}
                    className={cn(
                      "w-12 h-12 relative rounded-md overflow-hidden transition-all",
                      activeIndex === index ? "ring-2 ring-primary" : "opacity-60 hover:opacity-100",
                    )}
                    onClick={(e) => {
                      e.stopPropagation()
                      setActiveIndex(index)
                      setIsLoading(true)
                    }}
                  >
                    <Image
                      src={`${photoFolder}${photo}`}
                      alt={`${t("thumbnail")} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            <Button
              onClick={(e) => {
                e.stopPropagation()
                nextImage()
              }}
              variant="ghost"
              className="text-white bg-black/50 hover:bg-black/70 h-10 px-4"
              disabled={zoomLevel > 1}
            >
              <span className="hidden sm:inline">{t("next")}</span>
              {isRTL ? <ChevronLeft className="h-5 w-5 mr-2" /> : <ChevronRight className="h-5 w-5 ml-2" />}
              {/* <ChevronRight className="h-5 w-5 ml-2" /> */}
            </Button>
          </motion.div>

          {/* Информационная панель */}
          <AnimatePresence>
            {isInfoVisible && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="absolute bottom-20 left-4 right-4 md:left-auto md:right-4 md:bottom-24 md:w-80 bg-black/80 backdrop-blur-sm p-4 rounded-lg"
                onClick={(e) => e.stopPropagation()}
              >
                <h4 className="text-white font-medium mb-2">{t("photoInfo")}</h4>
                <p className="text-white/70 text-sm">
                  {t("fileName")}: {allPhotos[activeIndex]}
                </p>
                <div className="mt-4 text-xs text-white/50">
                  <p>{t("navigation")}</p>
                  <p>{t("zoomKeys")}</p>
                  <p>{t("escapeKey")}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
