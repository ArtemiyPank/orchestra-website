import type { ReactNode } from "react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import "@/styles/globals.css"
import { ThemeProvider } from "next-themes"
import TranslationsProvider from "@/i18n/TranslationsProvider"
import { locales, getDirection, type Locale } from "@/i18n/settings"
import { siteUrl, siteName } from "@/lib/site"

// Пререндерим все локали на сборке; неизвестный префикс (/fr/...) -> 404
export const dynamicParams = false

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: siteName,
  description: "Official website of the Atid Raziel Orchestra",
}

interface LocaleLayoutProps {
  children: ReactNode
  params: Promise<{ locale: string }>
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  // dynamicParams=false гарантирует, что сюда попадают только валидные локали
  const locale = (await params).locale as Locale
  const dir = getDirection(locale)

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <body className={`bg-background text-foreground min-h-screen overflow-auto${dir === "rtl" ? " rtl" : ""}`}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <TranslationsProvider locale={locale}>
            <Navbar />
            <main className="p-4 max-w-6xl mx-auto">{children}</main>
            <Footer />
          </TranslationsProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
