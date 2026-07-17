import AboutContent from "@/components/AboutContent"
import { buildPageMetadata } from "@/i18n/metadata"
import type { Locale } from "@/i18n/settings"

interface PageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: PageProps) {
  const locale = (await params).locale as Locale
  return buildPageMetadata(locale, "about", "/about")
}

const AboutPage = () => {
  return (
    <div>
      <AboutContent />
    </div>
  )
}

export default AboutPage
