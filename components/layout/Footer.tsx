'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Instagram, Mail, MapPin, Phone } from 'lucide-react'
import { Link } from '@/lib/navigation'
import { cn } from '@/lib/utils'
import type { Locale } from '@/lib/config'

interface FooterProps {
  locale: Locale
}

export default function Footer({ locale }: FooterProps) {
  const t = useTranslations('footer')

  const collections = [
    { label: t('fashionTitle'), href: '/products?category=fashion' },
    { label: t('beautyTitle'),  href: '/products?category=beauty' },
    { label: t('homeTitle'),    href: '/products?category=home' },
  ]

  const help = [
    { label: t('faqLink'),      href: '/faq' },
    { label: t('shippingLink'), href: '/shipping' },
    { label: t('contactLink'),  href: '/contact' },
    { label: t('privacyLink'),  href: '/privacy' },
    { label: t('termsLink'),    href: '/terms' },
  ]

  const company = [
    { label: t('aboutLink'),   href: '/about' },
    { label: t('sustainLink'), href: '/sustainability' },
    { label: t('careersLink'), href: '/careers' },
    { label: t('pressLink'),   href: '/press' },
  ]

  return (
    <footer className="bg-brand-primary-800 text-brand-cream-300 overflow-hidden relative">

      {/* Decorative top edge */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-secondary-500/40 to-transparent" />

      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Main Footer Grid ─────────────────────────────── */}
        <div className="pt-16 pb-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

          {/* Brand Column */}
          <div className="lg:col-span-1 space-y-6">
            {/* Logo (white variant via brightness filter) */}
            <div className="relative h-16 w-44">
              <Image
                src="/images/logo.jpg"
                alt="MemoElle"
                fill
                className="object-contain object-left brightness-0 invert opacity-90"
                sizes="176px"
              />
            </div>
            <p className="text-brand-cream-400/80 text-sm font-body leading-relaxed max-w-xs">
              {t('tagline')}
            </p>

            {/* Social */}
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com/MemoElleBoutique"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-10 h-10 rounded-full border border-brand-secondary-500/30 flex items-center justify-center hover:bg-brand-secondary-500 hover:border-brand-secondary-500 transition-all duration-300"
                aria-label="Follow us on Instagram"
              >
                <Instagram
                  size={16}
                  className="text-brand-secondary-400 group-hover:text-white transition-colors"
                />
              </a>
              <a
                href="mailto:hello@memoelle.com"
                className="group w-10 h-10 rounded-full border border-brand-secondary-500/30 flex items-center justify-center hover:bg-brand-secondary-500 hover:border-brand-secondary-500 transition-all duration-300"
                aria-label="Email us"
              >
                <Mail
                  size={16}
                  className="text-brand-secondary-400 group-hover:text-white transition-colors"
                />
              </a>
            </div>
          </div>

          {/* Collections */}
          <FooterColumn
            title={t('fashionTitle')}
            links={collections}
          />

          {/* Help */}
          <FooterColumn
            title={t('helpTitle')}
            links={help}
          />

          {/* Company + Contact */}
          <div className="space-y-6">
            <FooterColumn
              title={t('companyTitle')}
              links={company}
            />

            {/* Contact Info */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center gap-2.5 text-brand-cream-400/70 text-xs font-body">
                <MapPin size={12} className="text-brand-secondary-400 flex-shrink-0" />
                <span>Cairo, Egypt</span>
              </div>
              <div className="flex items-center gap-2.5 text-brand-cream-400/70 text-xs font-body">
                <Mail size={12} className="text-brand-secondary-400 flex-shrink-0" />
                <a
                  href="mailto:hello@memoelle.com"
                  className="hover:text-brand-secondary-400 transition-colors"
                >
                  hello@memoelle.com
                </a>
              </div>
              <div className="flex items-center gap-2.5 text-brand-cream-400/70 text-xs font-body">
                <Phone size={12} className="text-brand-secondary-400 flex-shrink-0" />
                <a
                  href="tel:+201000000000"
                  className="hover:text-brand-secondary-400 transition-colors"
                  dir="ltr"
                >
                  +20 100 000 0000
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom Bar ──────────────────────────────────── */}
        <div className="border-t border-brand-secondary-500/20 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-brand-cream-400/50 text-xs font-body text-center sm:text-start">
            {t('rights')}
          </p>
          <p className="text-brand-cream-400/50 text-xs font-body flex items-center gap-1">
            {t('madeWith')}
          </p>
        </div>
      </div>
    </footer>
  )
}

// ── Footer Link Column ────────────────────────────────────────────
function FooterColumn({
  title,
  links,
}: {
  title: string
  links: { label: string; href: string }[]
}) {
  return (
    <div className="space-y-5">
      <h3 className="text-brand-cream-200 text-xs font-body font-semibold tracking-widest uppercase">
        {title}
      </h3>
      <ul className="space-y-3" role="list">
        {links.map(({ label, href }) => (
          <li key={href}>
            <Link
              href={href as '/'}
              className="text-brand-cream-400/70 text-sm font-body hover:text-brand-secondary-400 transition-colors duration-200"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
