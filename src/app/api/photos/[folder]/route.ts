import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

// Базовая директория, за пределы которой выходить нельзя.
// Все легитимные папки с фото лежат внутри public/images.
const PUBLIC_DIR = path.join(process.cwd(), "public")
const ALLOWED_BASE = path.join(PUBLIC_DIR, "images")

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif"])

export async function GET(request: Request) {
  try {
    // Получаем путь после /api/photos/
    const url = new URL(request.url)
    const folderParam = url.pathname.split("/api/photos/")[1]

    if (!folderParam) {
      return NextResponse.json({ error: "Folder parameter is required" }, { status: 400 })
    }

    let decodedFolder: string
    try {
      decodedFolder = decodeURIComponent(folderParam)
    } catch {
      return NextResponse.json({ error: "Invalid folder parameter" }, { status: 400 })
    }

    // Отклоняем null-байты и явные попытки обхода
    if (decodedFolder.includes("\0")) {
      return NextResponse.json({ error: "Invalid folder parameter" }, { status: 400 })
    }

    const folderPath = decodedFolder.replace(/^\/+/, "")

    // Нормализуем и проверяем, что итоговый путь не выходит за пределы ALLOWED_BASE.
    // path.resolve схлопывает "..", поэтому любой traversal будет пойман проверкой ниже.
    const requestedDir = path.resolve(PUBLIC_DIR, folderPath)
    const isInsideAllowed =
      requestedDir === ALLOWED_BASE || requestedDir.startsWith(ALLOWED_BASE + path.sep)

    if (!isInsideAllowed) {
      // Не раскрываем абсолютные пути — отвечаем нейтрально
      return NextResponse.json({ error: "Not found" }, { status: 404 })
    }

    // Директория должна существовать и быть именно директорией
    let stat: fs.Stats
    try {
      stat = fs.statSync(requestedDir)
    } catch {
      return NextResponse.json({ error: "Not found" }, { status: 404 })
    }
    if (!stat.isDirectory()) {
      return NextResponse.json({ error: "Not found" }, { status: 404 })
    }

    const images = fs
      .readdirSync(requestedDir, { withFileTypes: true })
      .filter((entry) => entry.isFile() && IMAGE_EXTENSIONS.has(path.extname(entry.name).toLowerCase()))
      .map((entry) => entry.name)

    // Список фото меняется только при деплое — разрешаем кэширование
    return NextResponse.json(images, {
      headers: { "Cache-Control": "public, max-age=300, s-maxage=3600, stale-while-revalidate=86400" },
    })
  } catch {
    // Никаких деталей ошибки наружу
    return NextResponse.json({ error: "Failed to load images" }, { status: 500 })
  }
}
