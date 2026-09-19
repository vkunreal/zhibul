import path from 'path'

// Устанавливаем переменную окружения для работы с небезопасными SSL сертификатами
// Это нужно для оптимизатора изображений Next.js
if (typeof process !== 'undefined') {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
}

import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    // Next.js 16 blocks Image Optimization from private IPs (SSRF guard).
    // Local backend at localhost:5001 resolves to 127.0.0.1 / ::1.
    dangerouslyAllowLocalIP: process.env.NODE_ENV === 'development',
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.zhbl.by',
        pathname: '/images/**',
      },
      {
        protocol: 'https',
        hostname: 'api.zhbl.by',
        pathname: '/trailers/**',
      },
      {
        protocol: 'https',
        hostname: 'api.zhbl.by',
        pathname: '/trailer/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5001',
        pathname: '/images/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5001',
        pathname: '/trailers/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5001',
        pathname: '/trailer/**',
      },
    ],
  },
  sassOptions: {
    loadPaths: [path.resolve(process.cwd(), 'src', 'core', 'styles')],
    includePaths: [path.resolve(process.cwd(), 'src', 'core', 'styles')],
    additionalData: `
      @use "media" as *;
      @use "variables" as *;
    `,
  },
}

export default nextConfig
