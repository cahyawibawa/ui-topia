import { Toaster } from '@/components/ui/sonner'
import { fontSans } from '@/lib/font'
import { Analytics } from '@vercel/analytics/react'
import type { Metadata } from 'next'
import './globals.css'
import { Footer } from '@/components/layouts/footer'
import { Header } from '@/components/layouts/header'
import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  metadataBase: new URL('https://ui-topia.vercel.app/'),
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
      url: 'https://github.com/cahyawibawa',
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

interface RootLayoutProps {
  children: React.ReactNode
}
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        <div className="relative flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <Analytics />
        <Toaster />
      </body>
    </html>
  )
}
