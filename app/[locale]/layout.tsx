import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations } from 'next-intl/server'
import {
  Playfair_Display,
  Montserrat,
  IBM_Plex_Sans_Arabic,
} from 'next/font/google'
import StoreProvider from '@/lib/redux/StoreProvider'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CartDrawer from '@/components/layout/CartDrawer'
import { locales, rtlLocales, type Locale } from '@/lib/config'
import '@/styles/globals.css'
import BackToTop from '@/components/ui/BackToTop'
import AboutFooterSection from '@/components/sections/AboutFooterSection'
import Image from 'next/image'
import { Instagram, Facebook, Twitter } from 'lucide-react'


// ── Font Configuration ────────────────────────────────────────────
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
  style: ['normal', 'italic'],
})

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
})

const ibmArabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic'],
  variable: '--font-ibm-arabic',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
})

// ── Metadata ──────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const t = await getTranslations({
    locale: params.locale,
    namespace: 'metadata',
  })

  return {
    title: {
      default: t('title'),
      template: `%s | MemoElle`,
    },
    description: t('description'),
    keywords: t('keywords').split(', '),
    authors: [{ name: 'MemoElle Boutique' }],
    creator: 'MemoElle',
    openGraph: {
      type: 'website',
      locale: params.locale === 'ar' ? 'ar_EG' : 'en_US',
      siteName: 'MemoElle',
      title: t('ogTitle'),
      description: t('ogDescription'),
    },
    twitter: {
      card: 'summary_large_image',
      title: t('ogTitle'),
      description: t('ogDescription'),
    },
    robots: {
      index: true,
      follow: true,
    },
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_SITE_URL ?? 'https://memoelle.com'
    ),
  }
}

// ── Static Params ─────────────────────────────────────────────────
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

// ── Layout ────────────────────────────────────────────────────────
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const { locale } = params

  // Validate locale
  if (!locales.includes(locale as Locale)) {
    notFound()
  }

  // Direction
  const direction = rtlLocales.includes(locale as Locale) ? 'rtl' : 'ltr'

  // Load messages server-side for NextIntlClientProvider
  const messages = await getMessages()

  // Build font class string
  const fontClasses = [
    playfair.variable,
    montserrat.variable,
    ibmArabic.variable,
  ].join(' ')

  return (
    <html
      lang={locale}
      dir={direction}
      className={fontClasses}
      suppressHydrationWarning
    >
      <body
        className={`
          min-h-screen bg-brand-cream-100 
          font-body text-brand-primary-800 
          antialiased selection:bg-brand-secondary-300 selection:text-brand-primary-800
          ${direction === 'rtl' ? 'font-arabic' : ''}
        `}
      >
        {/* Noise texture overlay for luxury feel */}
        <div
          className="pointer-events-none fixed inset-0 z-0 opacity-[0.025]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
          aria-hidden="true"
        />

        <NextIntlClientProvider locale={locale} messages={messages}>
          <StoreProvider>
            {/* Skip to main content for accessibility */}
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-brand-primary-500 focus:text-white focus:rounded-pill focus:text-sm focus:font-body"
            >
              Skip to main content
            </a>

            {/* Sticky Navigation */}
            <Navbar locale={locale as Locale} />

            {/* Cart Drawer (portal-based, always rendered) */}
            <CartDrawer locale={locale as Locale} />

{/* Main Content */}

        {/* Main Content */}
        <main id="main-content" className="relative z-10">
          {children}
        </main>


        {/* Footer */}
        <Footer locale={locale as Locale} />


          </StoreProvider>
        </NextIntlClientProvider>
        <BackToTop />
      </body>
    </html>
  )
}
