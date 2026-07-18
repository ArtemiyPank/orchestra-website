"use client"

import Link from "next/link"
import { useTranslation } from "react-i18next"
import { Music, Mail, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

const Footer = () => {
  const { t, i18n } = useTranslation("footer")
  const locale = i18n.language
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-muted/40 pt-8 sm:pt-12 pb-4 sm:pb-6">
      <div className="container mx-auto px-2 sm:px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
          {/* Logo and About */}
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-primary rounded-full p-2">
                <Music className="h-4 w-4 sm:h-5 sm:w-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-lg sm:text-xl">Ort Raziel</span>
            </div>
            <p className="text-sm sm:text-base text-muted-foreground">
              {t("tagline")}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="font-semibold text-base sm:text-lg">{t("quickLinks")}</h3>
            <div className="flex flex-col items-start gap-1 sm:gap-2">
              <Button variant="link" className="justify-start p-0 h-auto text-sm sm:text-base" asChild>
                <Link href={`/${locale}/about`}>{t("about")}</Link>
              </Button>
              <Button variant="link" className="justify-start p-0 h-auto text-sm sm:text-base" asChild>
                <Link href={`/${locale}/vocal-group`}>{t("vocalGroup")}</Link>
              </Button>
              <Button variant="link" className="justify-start p-0 h-auto text-sm sm:text-base" asChild>
                <Link href={`/${locale}/performances`}>{t("performances")}</Link>
              </Button>
              {/*<Button variant="link" className="justify-start p-0 h-auto text-sm sm:text-base" asChild>*/}
              {/*  <a href="/alumni">{t("alumni")}</a>*/}
              {/*</Button>*/}
            </div>

          </div>

          {/* Contact */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="font-semibold text-base sm:text-lg">{t("contactUs")}</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground text-sm sm:text-base">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span>contact@ortraziel.org</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground text-sm sm:text-base">
                <MapPin className="h-4 w-4 flex-shrink-0" />
                <a href="https://maps.app.goo.gl/sktbTV7734kBb56a6" className="hover:text-primary transition-colors">
                  {t("address")}
                </a>
                {/*<span>Raziel David 24, Herzliya, Israel</span>*/}
              </div>
            </div>
          </div>
        </div>

        <Separator />

        <div className="pt-4 sm:pt-6 text-center text-muted-foreground text-xs sm:text-sm">
          {t("copyright", { year: currentYear })}
        </div>
      </div>
    </footer>
  )
}

export default Footer

