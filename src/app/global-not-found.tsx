// Глобальная 404 (experimental.globalNotFound) — автономный документ для всех
// несуществующих URL. Вложенный not-found.tsx в [locale] не срабатывает из-за
// бага Next (vercel/next.js#53344), поэтому используем глобальную страницу:
// локаль неизвестна на этом уровне, показываем текст на трёх языках.
import "@/styles/globals.css"
import Link from "next/link"

export const metadata = {
  title: "404 — Ort Raziel Orchestra",
}

export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body className="bg-background text-foreground min-h-screen">
        <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
          <p className="text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-brand-red mb-6">
            404
          </p>
          <div className="space-y-1 mb-8 text-muted-foreground">
            <p>Page not found</p>
            <p>Страница не найдена</p>
            <p dir="rtl">העמוד לא נמצא</p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/en/about"
              className="px-4 py-2 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
            >
              English
            </Link>
            <Link
              href="/ru/about"
              className="px-4 py-2 rounded-md border border-input font-medium hover:bg-accent transition-colors"
            >
              Русский
            </Link>
            <Link
              href="/he/about"
              className="px-4 py-2 rounded-md border border-input font-medium hover:bg-accent transition-colors"
            >
              עברית
            </Link>
          </div>
        </div>
      </body>
    </html>
  )
}
