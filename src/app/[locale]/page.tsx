import { redirect } from "next/navigation"
import type { Locale } from "@/i18n/settings"

interface LocaleHomeProps {
  params: Promise<{ locale: string }>
}

export default async function LocaleHome({ params }: LocaleHomeProps) {
  const locale = (await params).locale as Locale
  redirect(`/${locale}/about`)
}
