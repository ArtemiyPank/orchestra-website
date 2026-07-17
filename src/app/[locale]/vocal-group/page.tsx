import VocalGroupClient from "./VocalGroupClient"
import { buildPageMetadata } from "@/i18n/metadata"
import type { Locale } from "@/i18n/settings"

interface PageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: PageProps) {
  const locale = (await params).locale as Locale
  return buildPageMetadata(locale, "vocal-group", "/vocal-group")
}

const VocalGroupPage = async ({ params }: PageProps) => {
  const locale = (await params).locale as Locale
  return <VocalGroupClient locale={locale} />
}

export default VocalGroupPage
