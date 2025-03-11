"use client"

import { useState, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Trophy } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"

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
  const carouselRef = useRef<HTMLDivElement>(null)

  const scrollToIndex = (index: number) => {
    if (carouselRef.current) {
      const newIndex = Math.max(0, Math.min(index, achievements.length - 1))
      setActiveIndex(newIndex)

      const cardWidth = carouselRef.current.querySelector(".achievement-card")?.clientWidth || 0
      const scrollPosition = newIndex * (cardWidth + 16) // 16px is the gap

      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      })
    }
  }

  const handleScroll = () => {
    if (carouselRef.current) {
      const scrollPosition = carouselRef.current.scrollLeft
      const cardWidth = carouselRef.current.querySelector(".achievement-card")?.clientWidth || 0
      const newIndex = Math.round(scrollPosition / (cardWidth + 16))

      if (newIndex !== activeIndex) {
        setActiveIndex(newIndex)
      }
    }
  }

  const scrollPrev = () => scrollToIndex(activeIndex - 1)
  const scrollNext = () => scrollToIndex(activeIndex + 1)

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 text-primary">
          <Trophy className="h-6 w-6" />
          <h2 className="text-2xl font-bold">{title}</h2>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={scrollPrev}
            disabled={activeIndex === 0}
            className="rounded-full"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={scrollNext}
            disabled={activeIndex === achievements.length - 1}
            className="rounded-full"
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next</span>
          </Button>
        </div>
      </div>

      <div
        ref={carouselRef}
        className="flex overflow-x-auto pb-6 gap-4 snap-x snap-mandatory scrollbar-hide"
        style={{ scrollbarWidth: "none" }}
        onScroll={handleScroll}
      >
        {achievements.map((achievement) => (
          <Card
            key={achievement.id}
            className={cn(
              "achievement-card min-w-[250px] md:min-w-[300px] snap-start",
              "transition-all duration-300 hover:shadow-lg",
            )}
          >
            <div className="relative h-[400px] overflow-hidden rounded-t-lg">
              <Image
                src={achievement.image || "/placeholder.svg?height=600&width=400"}
                alt={achievement.title}
                fill
                className="object-cover"
              />
            </div>
            <CardContent className="pt-4">
              <h3 className="text-lg font-semibold mb-1">{achievement.title}</h3>
              <p className="text-sm text-muted-foreground mb-3">{achievement.description}</p>
              <div className="flex items-center gap-2">
                <Trophy className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">{achievement.winner}</span>
              </div>
              <div className="mt-2 text-xs text-muted-foreground">{achievement.date}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination dots */}
      <div className="flex justify-center gap-1 mt-2">
        {achievements.map((_, index) => (
          <button
            key={index}
            className={cn(
              "w-2 h-2 rounded-full transition-all",
              index === activeIndex ? "bg-primary w-4" : "bg-primary/30",
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

