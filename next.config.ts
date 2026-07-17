import path from "path"

/** @type {import('next').NextConfig} */
const nextConfig = {
  // В системе есть второй lockfile выше по дереву — явно фиксируем корень проекта,
  // чтобы Next правильно трейсил файлы при сборке.
  outputFileTracingRoot: path.join(process.cwd()),
  // Увеличиваем лимит времени для сборки страниц до 120 секунд
  serverExternalPackages: ['sharp', 'onnxruntime-node'],
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
    turbo: {
      maxBuildTime: 180000, // 180 секунд (3 мин)
    },
  },
  // Все изображения раздаются локально из /public, поэтому внешние источники
  // для оптимизатора не разрешаем (иначе /_next/image работает как open-proxy).
  // Отключаем строгий режим для уменьшения времени сборки
  reactStrictMode: false,
  
}

export default nextConfig

