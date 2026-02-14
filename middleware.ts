import createMiddleware from 'next-intl/middleware'
import { locales, defaultLocale } from './lib/config'

// Re-export types for any legacy imports (prefer lib/config directly)
export type { Locale } from './lib/config'

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always',
  localeDetection: true,
})

export default intlMiddleware

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|images|fonts|icons|.*\\..*).*)',
  ],
}
