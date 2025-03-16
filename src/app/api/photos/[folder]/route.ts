import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

export async function GET(request: Request, { params }: { params: { folder: string } }) {
  try {
    const { folder } = params

    if (!folder) {
      return NextResponse.json({ error: "Folder parameter is required" }, { status: 400 })
    }

    // Декодируем URL-параметр, так как он может содержать слеши
    const decodedFolder = decodeURIComponent(folder)

    // Путь к директории с изображениями в public
    // Удаляем начальный слеш, если он есть
    const folderPath = decodedFolder.startsWith("/") ? decodedFolder.substring(1) : decodedFolder
    const imagesDir = path.join(process.cwd(), "public", folderPath)

    console.log("Searching for images in:", imagesDir)

    // Проверяем, существует ли директория
    if (!fs.existsSync(imagesDir)) {
      console.error("Directory does not exist:", imagesDir)
      return NextResponse.json({ error: "Directory not found", path: imagesDir }, { status: 404 })
    }

    // Чтение всех файлов из директории
    const files = fs.readdirSync(imagesDir)

    // Фильтрация только изображений (по расширениям)
    const imageExtensions = [".jpg", ".jpeg", ".png", ".webp", ".gif"]
    const images = files
      .filter((file) => {
        const ext = path.extname(file).toLowerCase()
        return imageExtensions.includes(ext)
      })
      .map((file) => file) // Возвращаем только имена файлов

    console.log("Found images:", images)

    return NextResponse.json(images)
  } catch (error) {
    console.error("Error reading image directory:", error)
    return NextResponse.json({ error: "Failed to load images", details: (error as Error).message }, { status: 500 })
  }
}

