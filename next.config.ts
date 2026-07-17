import path from "path"

/** @type {import('next').NextConfig} */
const nextConfig = {
  // В системе есть второй lockfile выше по дереву — явно фиксируем корень проекта,
  // чтобы Next правильно трейсил файлы при сборке.
  outputFileTracingRoot: path.join(process.cwd()),
  // Все изображения раздаются локально из /public, поэтому внешние источники
  // для оптимизатора не разрешаем (иначе /_next/image работает как open-proxy).
  reactStrictMode: true,
  experimental: {
    // Автономная глобальная 404-страница (см. src/app/global-not-found.tsx)
    globalNotFound: true,
  },
}

export default nextConfig
