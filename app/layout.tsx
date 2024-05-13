import { Toaster } from '@/components/ui/sonner'
import { fontHeading } from '@/lib/font'
import { Analytics } from '@vercel/analytics/react'
import type { Metadata, Viewport } from 'next'
import './globals.css'
import { Footer } from '@/components/layouts/footer'
import { RootProvider } from 'fumadocs-ui/provider'
import 'fumadocs-ui/style.css'
import { siteConfig } from '@/config/site'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'

export const metadata: Metadata = {
  metadataBase: new URL('https://uitopia.vercel.app/'),
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    'Next.js',
    'React',
    'Tailwind CSS',
    'UI Library',
    'UI Kit',
    'UI Components',
    'UI Elements',
    'Open Source',
    'shadcn/ui',
  ],
  authors: [
    {
      name: 'cahya wibawa',
      url: 'https://git.new/cahya',
    },
  ],
  creator: 'cahya wibawa',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${siteConfig.url}/opengraph-image.png`],
    creator: '@kyuotaka',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
}
export const viewport: Viewport = {
  colorScheme: 'dark light',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

interface RootLayoutProps {
  children: React.ReactNode
}
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} ${fontHeading.variable} `}
      suppressHydrationWarning
    >
      <body className="flex min-h-screen flex-col">
        <RootProvider>
          <main className="flex-1">{children}</main>
          <Footer />
          <Analytics />
          <Toaster />
        </RootProvider>
      </body>
    </html>
  )
}
