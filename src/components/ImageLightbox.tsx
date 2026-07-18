"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { m, AnimatePresence } from "framer-motion"
import { X, ZoomIn, ZoomOut } from "lucide-react"
import { useTranslation } from "react-i18next"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ImageLightboxProps {
  // src === null означает, что лайтбокс закрыт
  src: string | null
  alt: string
  onClose: () => void
}

// Полноэкранный просмотр одного изображения с зумом — например,
// чтобы прочитать скан диплома. Закрытие по ESC / клику по фону / крестику.
export default function ImageLightbox({ src, alt, onClose }: ImageLightboxProps) {
  const { t } = useTranslation("gallery")
  const [zoomed, setZoomed] = useState(false)

  useEffect(() => {
    if (!src) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKey)
    // Блокируем прокрутку страницы под лайтбоксом
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [src, onClose])

  // Сбрасываем зум при смене/закрытии изображения
  useEffect(() => {
    setZoomed(false)
  }, [src])

  return (
    <AnimatePresence>
      {src && (
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          {/* Панель управления */}
          <div className="absolute top-4 right-4 z-10 flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10 h-10 w-10"
              onClick={(e) => {
                e.stopPropagation()
                setZoomed((z) => !z)
              }}
              title={zoomed ? t("zoomOut") : t("zoomIn")}
            >
              {zoomed ? <ZoomOut className="h-5 w-5" /> : <ZoomIn className="h-5 w-5" />}
              <span className="sr-only">{zoomed ? t("zoomOut") : t("zoomIn")}</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10 h-10 w-10"
              onClick={onClose}
              title={t("close")}
            >
              <X className="h-5 w-5" />
              <span className="sr-only">{t("close")}</span>
            </Button>
          </div>

          {/* Область с изображением. В режиме зума можно прокручивать. */}
          <div
            className={cn("relative h-full w-full", zoomed ? "overflow-auto" : "overflow-hidden")}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className={cn(
                "relative mx-auto transition-transform duration-200",
                zoomed ? "h-[180vh] w-[180vw] cursor-zoom-out sm:w-[110vw]" : "h-full w-full cursor-zoom-in",
              )}
              onClick={() => setZoomed((z) => !z)}
            >
              <Image
                src={src}
                alt={alt}
                fill
                sizes={zoomed ? "180vw" : "90vw"}
                className="object-contain select-none"
                priority
              />
            </div>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  )
}
