"use client"

import { useTranslation } from "react-i18next"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Music } from "lucide-react"

export default function VocalGroupLeader() {
  const { t } = useTranslation("vocal-group")

  return (
    <Card className="overflow-hidden">
      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-1/3 relative">
          <div className="aspect-[3/4] relative overflow-hidden lg:h-full">
            <Image
              src="/images/vocal-leader.jpg"
              alt={t("leader.name")}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
        </div>
        <CardContent className="flex-1 p-6 lg:p-8">
          <div className="space-y-4">
            <div>
              <h3 className="text-2xl font-bold">{t("leader.name")}</h3>
              <p className="text-primary font-medium">{t("leader.position")}</p>
            </div>

            <div className="space-y-3 text-muted-foreground">
              <p>{t("leader.bio")}</p>
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <Music className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium">{t("leader.specialization.title")}</h4>
                  <p className="text-sm text-muted-foreground">{t("leader.specialization.description")}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  )
}

