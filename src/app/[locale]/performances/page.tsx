import PerformancesClient from "./PerformancesClient"
import { buildPageMetadata } from "@/i18n/metadata"
import type { Locale } from "@/i18n/settings"

interface PageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: PageProps) {
  const locale = (await params).locale as Locale
  return buildPageMetadata(locale, "performances", "/performances")
}

const PerformancesPage = async ({ params }: PageProps) => {
  const locale = (await params).locale as Locale
  return (
    <div className="p-0 pd:p-8">
      <PerformancesClient locale={locale} />
    </div>
  )
}

export default PerformancesPage
