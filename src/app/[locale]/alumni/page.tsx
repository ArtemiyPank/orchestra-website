import AlumniClient from "./AlumniClient"
import { buildPageMetadata } from "@/i18n/metadata"
import type { Locale } from "@/i18n/settings"

interface PageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: PageProps) {
  const locale = (await params).locale as Locale
  return buildPageMetadata(locale, "alumni", "/alumni")
}

const AlumniPage = async ({ params }: PageProps) => {
  const locale = (await params).locale as Locale
  return (
    <div className="p-4 sm:p-8">
      <AlumniClient locale={locale} />
    </div>
  )
}

export default AlumniPage
