import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://zhbl.by'

  return {
    rules: [{ userAgent: '*' }],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
