"use client"

import { useEffect } from "react"
import Link from "next/link"
import { useTranslation } from "react-i18next"
import { AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const { t, i18n } = useTranslation("common")
  const locale = i18n.language

  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="bg-destructive/10 rounded-full p-6 mb-6">
        <AlertTriangle className="h-12 w-12 text-destructive" />
      </div>
      <h1 className="text-xl sm:text-2xl font-bold mb-2">{t("errorTitle")}</h1>
      <p className="text-muted-foreground mb-8 max-w-md">{t("errorText")}</p>
      <div className="flex gap-3">
        <Button onClick={() => reset()}>{t("errorRetry")}</Button>
        <Button variant="outline" asChild>
          <Link href={`/${locale}/about`}>{t("errorHome")}</Link>
        </Button>
      </div>
    </div>
  )
}
