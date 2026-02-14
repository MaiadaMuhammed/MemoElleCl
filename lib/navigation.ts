import { createSharedPathnamesNavigation } from 'next-intl/navigation'
import { locales } from './config'

// ── Typed navigation helpers ──────────────────────────────────────
// Type-safe wrappers around Next.js navigation hooks that
// automatically handle the locale prefix.
export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({ locales })

// Re-export for convenience
export { locales }
export type { Locale } from './config'
