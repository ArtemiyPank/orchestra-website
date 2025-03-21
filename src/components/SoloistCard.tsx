"use client"

import Image from "next/image"
import { useTranslation } from "react-i18next"
import { Card, CardContent } from "@/components/ui/card"
import { Music } from "lucide-react"
import type { Soloist } from "@/types/Soloist"
import { cn } from "@/lib/utils"

interface SoloistCardProps {
  soloist: Soloist
  locale: string
}

export default function SoloistCard({ soloist, locale = "en" }: SoloistCardProps) {
  const isRTL = locale === "he"
console.log("locale - ", locale)
    const { t } = useTranslation("vocal-group")
    
  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <div className="relative aspect-square">
        <Image
          src={soloist.photo || "/placeholder.svg?height=400&width=400"}
          alt={soloist.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <CardContent className="p-4 flex-1 flex flex-col">
        <div className="mb-3">
          <h3 className="font-bold text-lg">{soloist.name}</h3>
          <p className="text-primary text-sm">{soloist.voice}</p>
        </div>

        {soloist.featuredSongs && soloist.featuredSongs.length > 0 && (
          <div className="mt-2">
            <h4 className="text-sm font-medium flex items-center gap-1.5 mb-2">
              <Music className="h-4 w-4 text-primary" />
              {t("soloistProgramTitle")}
            </h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              {soloist.featuredSongs.map((song, index) => (
                <li key={index} className={cn("border-primary/20", isRTL ? "pr-2 border-r-2" : "pl-2 border-l-2")}>
                  {song}
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

