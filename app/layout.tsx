import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'
import { fontHtmlClassName } from '@/app/fonts'
import { Providers } from '@/app/providers'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { SITE_URL, TAGLINE, THEME_COLORS } from '@/lib/site'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `pixelactions — ${TAGLINE}`,
    template: '%s — pixelactions',
  },
  description:
    'Execute desktop interactions from a pixelcoords session: click, type, and drag by label — re-located before acting, verified after, refused rather than guessed. Free, MIT. macOS and Linux today.',
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: THEME_COLORS.light },
    { media: '(prefers-color-scheme: dark)', color: THEME_COLORS.dark },
  ],
}

// suppressHydrationWarning: next-themes mutates <html>'s class before React
// hydrates (its pre-paint script), so the server-emitted attribute won't match.
export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={fontHtmlClassName} suppressHydrationWarning>
      <body className="flex min-h-dvh flex-col">
        <Providers>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-surface focus:px-3 focus:py-2 focus:text-sm"
          >
            Skip to content
          </a>
          <SiteHeader />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <SiteFooter />
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}
