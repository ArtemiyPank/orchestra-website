"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Trophy } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export type Achievement = {
  id: string;
  title: string;
  description: string;
  winner: string;
  image: string;
  date: string;
};

interface AchievementsCarouselProps {
  achievements: Achievement[];
  title?: string;
}

const AchievementsCarousel = ({ achievements, title = "Orchestra Achievements" }: AchievementsCarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(1);
  const [isScrolling, setIsScrolling] = useState(false); // 🔹 Новый флаг
  const carouselRef = useRef<HTMLDivElement>(null);
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "he";

  useEffect(() => {
    setActiveIndex(0);
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = isRTL ? carouselRef.current.scrollWidth : 0;
    }
  }, [i18n.language, isRTL]);

  // Рассчитываем количество карточек, видимых одновременно
  useEffect(() => {
    const updateVisibleCards = () => {
      if (carouselRef.current) {
        const gap = 16;
        const containerWidth = carouselRef.current.clientWidth;
        const cardWidth = carouselRef.current.querySelector(".achievement-card")?.clientWidth || 300;
        const newVisibleCards = Math.floor(containerWidth / (cardWidth + gap)) || 1;
        setVisibleCards(newVisibleCards);
      }
    };

    updateVisibleCards();
    window.addEventListener("resize", updateVisibleCards);
    return () => window.removeEventListener("resize", updateVisibleCards);
  }, [achievements]);


  const totalPages = Math.max(achievements.length - visibleCards + 1, 1);

  const scrollToIndex = (index: number) => {
    if (!carouselRef.current) return;
    const newIndex = Math.max(0, Math.min(index, totalPages - 1));

    setIsScrolling(true);
    setActiveIndex(newIndex);

    const cardWidth = carouselRef.current.querySelector(".achievement-card")?.clientWidth || 300;
    const scrollPosition = newIndex * (cardWidth + 16);

    carouselRef.current.scrollTo({
      left: isRTL
        ? carouselRef.current.scrollWidth - carouselRef.current.clientWidth - scrollPosition
        : scrollPosition,
      behavior: "smooth",
    });

    setTimeout(() => {
      setIsScrolling(false);
    }, 300);
  };

  const handleScroll = () => {
    if (!carouselRef.current || isScrolling) return; // 🔹 Если скролл идёт, не обновляем `activeIndex`

    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
    const cardWidth = carouselRef.current.querySelector(".achievement-card")?.clientWidth || 300;
    const scrollPosition = isRTL ? scrollWidth - clientWidth - scrollLeft : scrollLeft;
    const newIndex = Math.round(scrollPosition / (cardWidth + 16));

    if (newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  };

  const scrollPrev = () => scrollToIndex(activeIndex - 1);
  const scrollNext = () => scrollToIndex(activeIndex + 1);

  return (
    <div className="relative" dir={isRTL ? "rtl" : "ltr"}>
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
            {isRTL ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            <span className="sr-only">Previous</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={scrollNext}
            disabled={activeIndex === totalPages - 1}
            className="rounded-full"
          >
            {isRTL ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            <span className="sr-only">Next</span>
          </Button>
        </div>
      </div>

      <div
        ref={carouselRef}
        className={cn(
          "flex overflow-x-auto pb-6 gap-4 snap-x snap-mandatory scrollbar-hide",
          isRTL && "flex-row-reverse",
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

      {/* 🔹 Генерация точек с учётом `visibleCards` */}
      <div className="flex justify-center gap-1 mt-2">
        {Array.from({ length: totalPages }).map((_, index) => (
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
  );
};

export default AchievementsCarousel;
