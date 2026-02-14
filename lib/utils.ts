import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

// ── cn: Tailwind-aware class merger ──────────────────────────────
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

// ── Price formatting ─────────────────────────────────────────────
export function formatPrice(
  price: number,
  locale: string = 'en',
  currency: string = 'EGP'
): string {
  return new Intl.NumberFormat(locale === 'ar' ? 'ar-EG' : 'en-EG', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(price)
}

// ── Discount calculation ─────────────────────────────────────────
export function calculateDiscount(original: number, sale: number): number {
  if (!original || original <= sale) return 0
  return Math.round(((original - sale) / original) * 100)
}

// ── Truncate text ────────────────────────────────────────────────
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trimEnd() + '…'
}

// ── RTL check ────────────────────────────────────────────────────
export function isRTL(locale: string): boolean {
  return locale === 'ar'
}

// ── Debounce ─────────────────────────────────────────────────────
export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn(...args), delay)
  }
}

// ── Stagger animation delay generator ───────────────────────────
export function staggerDelay(index: number, base: number = 100): string {
  return `${index * base}ms`
}
