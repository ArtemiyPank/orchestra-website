"use client"

import { useTranslation } from "react-i18next"
import { Music, Mail, MapPin, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

const Footer = () => {
  const { t } = useTranslation()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-muted/40 pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Logo and About */}
          <div className="space-y-4 ">
            <div className="flex items-center gap-2">
              <div className="bg-primary rounded-full p-2">
                <Music className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl">Atid Raziel</span>
            </div>
            <p className="text-muted-foreground">
              Inspiring young musicians through orchestral excellence and cultural heritage.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4" >
            <h3 className="font-semibold text-lg">Quick Links</h3>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="link" className="justify-start p-0 h-auto" asChild>
                <a href="/about">About</a>
              </Button>
              <Button variant="link" className="justify-start p-0 h-auto" asChild>
                <a href="/programs">Programs</a>
              </Button>
              <Button variant="link" className="justify-start p-0 h-auto" asChild>
                <a href="/alumni">Alumni</a>
              </Button>
              <Button variant="link" className="justify-start p-0 h-auto" asChild>
                <a href="/contact">Contact</a>
              </Button>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Contact Us</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>contact@atidraziel.org</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>Jerusalem, Israel</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <ExternalLink className="h-4 w-4" />
                <a href="#" className="hover:text-primary transition-colors">
                  Follow us on social media
                </a>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        <div className="pt-6 text-center text-muted-foreground text-sm">
          &copy; {currentYear} Atid Raziel Orchestra. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer

