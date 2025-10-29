"use client"

import { useState, useRef, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Trophy } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-mobile"

export type Achievement = {
  id: string
  title: string
  description: string
  winner: string
  image: string
  date: string
}

interface AchievementsCarouselProps {
  achievements: Achievement[]
  title?: string
}

const AchievementsCarousel = ({ achievements, title = "Orchestra Achievements" }: AchievementsCarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [visibleCards, setVisibleCards] = useState(1)
  const [isScrolling, setIsScrolling] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null)
  const { i18n } = useTranslation()
  const isRTL = i18n.language === "he"
  const isMobile = useMediaQuery("(max-width: 768px)")

  useEffect(() => {
    setActiveIndex(0)
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = isRTL ? carouselRef.current.scrollWidth : 0
    }
  }, [i18n.language, isRTL])

  // Рассчитываем количество карточек, видимых одновременно
  useEffect(() => {
    const updateVisibleCards = () => {
      if (carouselRef.current) {
        const gap = 16
        const containerWidth = carouselRef.current.clientWidth
        const cardWidth = carouselRef.current.querySelector(".achievement-card")?.clientWidth || (isMobile ? 220 : 300)
        const newVisibleCards = Math.floor(containerWidth / (cardWidth + gap)) || 1
        setVisibleCards(newVisibleCards)
      }
    }

    updateVisibleCards()
    window.addEventListener("resize", updateVisibleCards)
    return () => window.removeEventListener("resize", updateVisibleCards)
  }, [achievements, isMobile])

  const totalPages = Math.max(achievements.length - visibleCards + 1, 1)

  const scrollToIndex = (index: number) => {
    if (!carouselRef.current) return
    const newIndex = Math.max(0, Math.min(index, totalPages - 1))

    setIsScrolling(true)
    setActiveIndex(newIndex)

    const cardWidth = carouselRef.current.querySelector(".achievement-card")?.clientWidth || (isMobile ? 180 : 300)
    const scrollPosition = newIndex * (cardWidth + 16)

    carouselRef.current.scrollTo({
      left: isRTL ? carouselRef.current.scrollWidth - carouselRef.current.clientWidth - scrollPosition : scrollPosition,
      behavior: "smooth",
    })

    setTimeout(() => {
      setIsScrolling(false)
    }, 300)
  }

  const handleScroll = () => {
    if (!carouselRef.current || isScrolling) return

    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current
    const cardWidth = carouselRef.current.querySelector(".achievement-card")?.clientWidth || (isMobile ? 180 : 300)
    const scrollPosition = isRTL ? scrollWidth - clientWidth - scrollLeft : scrollLeft
    const newIndex = Math.round(scrollPosition / (cardWidth + 16))

  // Проверяем, находимся ли мы в крайнем правом положении (учитываем возможную погрешность в 1px)
  const atRightEnd = Math.abs(scrollLeft + clientWidth - scrollWidth) < 1;

  if (atRightEnd) {
    setActiveIndex(totalPages - 1); // Устанавливаем последнюю точку
  } else if (newIndex !== activeIndex) {
    setActiveIndex(newIndex);
  }
  }

  const scrollPrev = () => scrollToIndex(activeIndex - 1)
  const scrollNext = () => scrollToIndex(activeIndex + 1)

  return (
    <div className="relative" dir={isRTL ? "rtl" : "ltr"}>
      <div className={cn("flex items-center justify-between", isMobile ? "mb-3" : "mb-6")}>
        <div className="flex items-center gap-2 text-primary">
          <Trophy className={cn(isMobile ? "h-4 w-4" : "h-6 w-6")} />
          <h2 className={cn("font-bold", isMobile ? "text-lg" : "text-2xl")}>{title}</h2>
        </div>

        <div className={cn("flex gap-2", isMobile ? "hidden" : "")}>
          <Button
            variant="outline"
            size={isMobile ? "sm" : "icon"}
            onClick={scrollPrev}
            disabled={activeIndex === 0}
            className={cn("rounded-full", isMobile && "h-7 w-7 p-0")}
          >
            {isRTL ? (
              <ChevronRight className={cn(isMobile ? "h-3.5 w-3.5" : "h-4 w-4")} />
            ) : (
              <ChevronLeft className={cn(isMobile ? "h-3.5 w-3.5" : "h-4 w-4")} />
            )}
            <span className="sr-only">Previous</span>
          </Button>
          <Button
            variant="outline"
            size={isMobile ? "sm" : "icon"}
            onClick={scrollNext}
            disabled={activeIndex === totalPages - 1}
            className={cn("rounded-full", isMobile && "h-7 w-7 p-0")}
          >
            {isRTL ? (
              <ChevronLeft className={cn(isMobile ? "h-3.5 w-3.5" : "h-4 w-4")} />
            ) : (
              <ChevronRight className={cn(isMobile ? "h-3.5 w-3.5" : "h-4 w-4")} />
            )}
            <span className="sr-only">Next</span>
          </Button>
        </div>
      </div>

      <div
        ref={carouselRef}
        className={cn(
          "flex overflow-x-auto snap-x snap-mandatory scrollbar-hide",
          isRTL && "flex-row-reverse",
          isMobile ? "pb-4 gap-3" : "pb-6 gap-4",
        )}
        style={{
          scrollbarWidth: "none",
          direction: isRTL ? "rtl" : "ltr",
          scrollBehavior: "smooth",
        }}
        onScroll={handleScroll}
      >
        {achievements.map((achievement) => (
          <Card
            key={achievement.id}
            className={cn(
              "achievement-card snap-start",
              "transition-all duration-300",
              isMobile ? "min-w-[180px] hover:shadow-md" : "min-w-[300px] hover:shadow-lg",
            )}
          >
            <div className={cn("relative overflow-hidden rounded-t-lg", isMobile ? "h-[200px]" : "h-[400px]")}>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
              <Image
                src={achievement.image || "/placeholder.svg?height=400&width=300"}
                alt={achievement.title}
                fill
                className={cn(isMobile ? "object-contain bg-muted/30" : "object-cover")}
              />
              {isMobile ? (
                <div className="absolute bottom-2 left-2 right-2 z-20">
                  <span className="text-white/90 text-xs bg-black/40 px-1.5 py-0.5 rounded">{achievement.date}</span>
                </div>
              ) : null}
            </div>
            <CardContent className={cn(isMobile ? "p-3" : "pt-4")}>
              <h3 className={cn("font-semibold mb-1", isMobile ? "text-sm line-clamp-1" : "text-lg")}>
                {achievement.title}
              </h3>
              <p className={cn("text-muted-foreground mb-3", isMobile ? "text-xs line-clamp-2" : "text-sm")}>
                {achievement.description}
              </p>
              <div className="flex items-center gap-2">
                <Trophy className={cn("text-primary", isMobile ? "h-3 w-3" : "h-4 w-4")} />
                <span className={cn("font-medium", isMobile ? "text-xs line-clamp-1" : "text-sm")}>
                  {achievement.winner}
                </span>
              </div>
              {!isMobile && <div className="mt-2 text-xs text-muted-foreground">{achievement.date}</div>}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination dots */}
      <div className="flex justify-center gap-1 mt-2">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            className={cn(
              "rounded-full transition-all",
              index === activeIndex
                ? "bg-primary" + (isMobile ? " w-3 h-1.5" : " w-4 h-2")
                : "bg-primary/30" + (isMobile ? " w-1.5 h-1.5" : " w-2 h-2"),
            )}
            onClick={() => scrollToIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default AchievementsCarousel

