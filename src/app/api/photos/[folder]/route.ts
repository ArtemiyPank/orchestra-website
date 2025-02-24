import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(
  request: Request,
  context: { params: { folder: string } }
) {
  // Корректный асинхронный доступ к параметрам
  const { folder } = await Promise.resolve(context.params);

  if (!folder) {
    return NextResponse.json({ error: "Folder parameter is required" }, { status: 400 });
  }

  // Путь к директории с изображениями в public
  const imagesDir = path.join(process.cwd(), "public", "images", "programs", folder);

  try {
    // Чтение всех файлов из директории
    const files = fs.readdirSync(imagesDir);

    // Фильтрация только изображений (по расширениям)
    const imageExtensions = [".jpg", ".jpeg", ".png", ".webp", ".gif"];
    const images = files
      .filter(file => imageExtensions.includes(path.extname(file).toLowerCase()))
      .map(file => `/images/programs/${folder}/${file}`);

    return NextResponse.json(images);
  } catch (error) {
    console.error("Ошибка при чтении директории с изображениями:", error);
    return NextResponse.json({ error: "Failed to load images" }, { status: 500 });
  }
}
