import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

export async function GET(request: Request) {
  try {
    // Получаем путь после /api/photos/
    const url = new URL(request.url)
    const folderParam = url.pathname.split("/api/photos/")[1]

    if (!folderParam) {
      return NextResponse.json({ error: "Folder parameter is required" }, { status: 400 })
    }

    const decodedFolder = decodeURIComponent(folderParam)
    const folderPath = decodedFolder.startsWith("/") ? decodedFolder.substring(1) : decodedFolder
    const imagesDir = path.join(process.cwd(), "public", folderPath)

    console.log("Searching for images in:", imagesDir)

    if (!fs.existsSync(imagesDir)) {
      console.error("Directory does not exist:", imagesDir)
      return NextResponse.json({ error: "Directory not found", path: imagesDir }, { status: 404 })
    }

    const files = fs.readdirSync(imagesDir)
    const imageExtensions = [".jpg", ".jpeg", ".png", ".webp", ".gif"]
    const images = files
      .filter((file) => imageExtensions.includes(path.extname(file).toLowerCase()))
      .map((file) => file)

    console.log("Found images:", images)
    return NextResponse.json(images)
  } catch (error) {
    console.error("Error reading image directory:", error)
    return NextResponse.json({ error: "Failed to load images", details: (error as Error).message }, { status: 500 })
  }
}
