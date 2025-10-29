"use client"

import { useTranslation } from "react-i18next"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Music } from "lucide-react"

export default function VocalGroupLeader() {
  const { t } = useTranslation("vocal-group")

  return (
      <Card className="overflow-hidden rounded-xl">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-0">
          <div className="w-full lg:w-2/5 relative flex-shrink-0">
            <div className="aspect-[3/4] sm:aspect-[4/5] lg:aspect-auto relative overflow-hidden rounded-xl lg:h-full">
              <Image
                  src="/images/vocal-leader.jpg"
                  alt={t("leader.name")}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
                  priority
              />
            </div>
          </div>

          <CardContent className="flex-1 p-4 sm:p-6 lg:p-8">
            <div className="space-y-3 sm:space-y-4">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold leading-tight">{t("leader.name")}</h3>
                <p className="text-sm sm:text-base text-primary font-medium mt-1">{t("leader.position")}</p>
              </div>

              <div className="space-y-2 sm:space-y-3 text-sm sm:text-base text-muted-foreground">
                <p className="leading-relaxed">{t("leader.bio")}</p>
              </div>

              <div className="space-y-2 sm:space-y-3 pt-2">
                <div className="flex items-start gap-2 sm:gap-3">
                  <Music className="h-4 w-4 sm:h-5 sm:w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div className="min-w-0">
                    <h4 className="font-medium text-sm sm:text-base">{t("leader.specialization.title")}</h4>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {t("leader.specialization.description")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </div>
      </Card>
  )
}
