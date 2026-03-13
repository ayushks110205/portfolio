import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow:     '/',
        disallow:  ['/api/'],
      },
    ],
    sitemap: 'https://ayushks110205.github.io/portfolio/sitemap.xml',
  }
}
