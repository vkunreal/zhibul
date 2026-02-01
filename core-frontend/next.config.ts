import path from 'path'

// // Устанавливаем переменную окружения для работы с небезопасными SSL сертификатами
// // Это нужно для оптимизатора изображений Next.js
// if (typeof process !== 'undefined') {
//   process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
// }

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
  sassOptions: {
    includePaths: [path.join(__dirname, 'src', 'shared', 'styles')],
    prependData: `
      @use "media" as *;
      @use "variables" as *;
    `,
  },

  // Для serverless функций (Vercel)
  serverRuntimeConfig: {
    // Время в миллисекундах
    apiTimeout: 30000,
  },

  // Для статических генераций
  staticPageGenerationTimeout: 120,

  // Для on-demand revalidation
  onDemandEntries: {
    maxInactiveAge: 60 * 60 * 1000, // 1 час
    pagesBufferLength: 5,
  },
}

export default nextConfig
