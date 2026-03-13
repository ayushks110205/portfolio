import type { Metadata } from 'next'
import './globals.css'
import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider'
import CustomCursor from '@/components/ui/CustomCursor'

export const metadata: Metadata = {
  title: 'Ayush Kumar Singh | Galactic AI Lab',
  description: 'Computer Science Student, Web Developer, Machine Learning Enthusiast. Exploring the universe of intelligent systems and interactive algorithms.',
  keywords: ['Ayush Kumar Singh', 'Portfolio', 'KIIT', 'Web Developer', 'Machine Learning', 'React', 'Next.js'],
  openGraph: {
    title: 'Ayush Kumar Singh | Galactic AI Lab',
    description: 'Exploring the universe of intelligent systems and interactive algorithms.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#020408] text-slate-200 overflow-x-hidden">
        <SmoothScrollProvider>
          <CustomCursor />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
