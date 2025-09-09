import { Analytics } from '@vercel/analytics/next'

import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import { Roboto_Mono } from 'next/font/google'
import { Roboto } from 'next/font/google'
import React from 'react'

import { AdminBar } from '@/components/AdminBar'
import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'

import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'
import type { Config } from '@/payload-types'

const robotoSans = Roboto({ subsets: ['latin'], weight: 'variable', variable: '--font-sans' })
const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-mono',
})

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: Config['locale'] }>
}) {
  const { isEnabled } = await draftMode()
  const { lang } = await params

  return (
    <html lang={lang} suppressHydrationWarning>
      <head>
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body className={cn(robotoSans.className, 'text-foreground')}>
        {/* backgrounds from  https://patterncraft.fun */}
        {/* Stellar Mist */}
        <div
          className="fixed inset-0 h-screen z-[-1] hidden dark:block opacity-40"
          style={{
            background: `
     radial-gradient(ellipse 140% 50% at 15% 60%, rgba(124, 58, 237, 0.11), transparent 48%),
     radial-gradient(ellipse 90% 80% at 85% 25%, rgba(245, 101, 101, 0.09), transparent 58%),
     radial-gradient(ellipse 120% 65% at 40% 90%, rgba(34, 197, 94, 0.13), transparent 52%),
     radial-gradient(ellipse 100% 45% at 70% 5%, rgba(251, 191, 36, 0.07), transparent 42%),
     radial-gradient(ellipse 80% 75% at 90% 80%, rgba(168, 85, 247, 0.10), transparent 55%),
     #000000
     `,
          }}
        />
        {/* Glow Right with auto accent-color */}
        <div
          className="fixed inset-0 h-screen z-[-1] dark:hidden"
          style={{
            background: '#ffffff',
            backgroundImage: `
        radial-gradient(
          circle at top right,
          color-mix(in hsl, hsl(var(--accent)) 70%, transparent),
          transparent 70%
        )
      `,
            filter: 'blur(80px)',
            backgroundRepeat: 'no-repeat',
          }}
        />

        <Providers>
          <Analytics debug={true} />
          <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          />

          <Header locale={lang} />
          {children}
          <Footer locale={lang} />
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@mobbing-vorarlberg',
  },
}
