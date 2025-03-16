/** @type {import('next').NextConfig} */
const nextConfig = {
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
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Отключаем строгий режим для уменьшения времени сборки
  reactStrictMode: false,
  
}

export default nextConfig

