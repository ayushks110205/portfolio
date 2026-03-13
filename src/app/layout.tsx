import type { Metadata } from 'next'
import './globals.css'
import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider'
import CustomCursor from '@/components/ui/CustomCursor'

const BASE_URL   = 'https://ayushks110205.github.io/portfolio'
const OG_IMAGE   = `${BASE_URL}/api/og`
const FULL_NAME  = 'Ayush Kumar Singh'
const TITLE      = `${FULL_NAME} | Galactic AI Lab`
const DESCRIPTION =
  'Computer Science Student, Web Developer & ML Enthusiast at KIIT University. ' +
  'Building intelligent systems and interactive 3D experiences.'

export const metadata: Metadata = {
  // ── Core ──────────────────────────────────────────────────────────────────
  metadataBase:  new URL(BASE_URL),
  title:         TITLE,
  description:   DESCRIPTION,
  keywords:      [
    'Ayush Kumar Singh', 'Portfolio', 'KIIT', 'Web Developer',
    'Machine Learning', 'React', 'Next.js', 'Three.js', 'Full Stack',
    'Computer Science', 'Bhubaneswar', 'India',
  ],
  authors:       [{ name: FULL_NAME, url: 'https://github.com/ayushks110205' }],
  creator:       FULL_NAME,

  // ── Canonical ─────────────────────────────────────────────────────────────
  alternates: { canonical: BASE_URL },

  // ── Open Graph ────────────────────────────────────────────────────────────
  openGraph: {
    type:        'website',
    url:         BASE_URL,
    siteName:    'AKS.lab',
    title:       TITLE,
    description: DESCRIPTION,
    images: [
      {
        url:    OG_IMAGE,
        width:  1200,
        height: 630,
        alt:    `${FULL_NAME} — Galactic AI Portfolio`,
      },
    ],
  },

  // ── Twitter Card ──────────────────────────────────────────────────────────
  twitter: {
    card:        'summary_large_image',
    title:       TITLE,
    description: DESCRIPTION,
    images:      [OG_IMAGE],
    creator:     '@ayushks110205',
  },

  // ── Robots ────────────────────────────────────────────────────────────────
  robots: {
    index:  true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
}

// ── JSON-LD Person Schema ──────────────────────────────────────────────────
const jsonLd = {
  '@context': 'https://schema.org',
  '@type':    'Person',
  name:       FULL_NAME,
  url:        BASE_URL,
  image:      OG_IMAGE,
  jobTitle:   ['Computer Science Student', 'Web Developer', 'Machine Learning Enthusiast'],
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name:    'Kalinga Institute of Industrial Technology (KIIT)',
    url:     'https://kiit.ac.in',
  },
  sameAs: [
    'https://github.com/ayushks110205',
    'https://www.linkedin.com/in/ayush-kumar-singh-384a58285/',
  ],
  email:     'classsciencea@gmail.com',
  telephone: '+91-8987864093',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
        {/* JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
