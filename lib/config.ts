// ================================================================
// MEMOELLE — Shared i18n Configuration
// ================================================================
// This is the SINGLE SOURCE OF TRUTH for locale config.
// Both middleware.ts and all app code import from here.
// middleware.ts CANNOT be imported by regular modules because
// it runs in the Next.js Edge Runtime.
// ================================================================

export const locales = ['en', 'ar'] as const
export type Locale = typeof locales[number]

export const defaultLocale: Locale = 'en'

/** Locales that require RTL layout direction */
export const rtlLocales: Locale[] = ['ar']

/** Returns true if the given locale uses RTL */
export function isRtlLocale(locale: string): boolean {
  return rtlLocales.includes(locale as Locale)
}
