// Устанавливаем переменную окружения для работы с небезопасными SSL сертификатами
// Это нужно для оптимизатора изображений Next.js
if (typeof process !== 'undefined') {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
}

import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.zhbl.by',
        pathname: '/images/**',
      },
    ],
  },
}

export default nextConfig
