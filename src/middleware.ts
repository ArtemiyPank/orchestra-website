import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Получаем текущие заголовки ответа
  const response = NextResponse.next()

  // Добавляем заголовки для API-маршрутов
  if (request.nextUrl.pathname.startsWith("/api/")) {
    response.headers.set("Cache-Control", "no-store, max-age=0")
  }

  return response
}

