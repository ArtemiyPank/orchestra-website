import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { defaultLocale, isLocale, type Locale } from "@/i18n/settings"

// Определяем язык для редиректа со старых URL:
// cookie (выбор пользователя) -> Accept-Language -> en
const detectLocale = (request: NextRequest): Locale => {
  const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value
  if (cookieLocale && isLocale(cookieLocale)) return cookieLocale

  const acceptLanguage = request.headers.get("accept-language") ?? ""
  for (const part of acceptLanguage.split(",")) {
    const code = part.split(";")[0].trim().toLowerCase().split("-")[0]
    if (isLocale(code)) return code
  }
  return defaultLocale
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const locale = detectLocale(request)
  const target = pathname === "/" ? "/about" : pathname
  return NextResponse.redirect(new URL(`/${locale}${target}`, request.url))
}

// Срабатывает ТОЛЬКО на старых путях без локали — контентные страницы,
// статика и API проходят мимо middleware без накладных расходов
export const config = {
  matcher: ["/", "/about", "/alumni", "/performances", "/vocal-group"],
}
