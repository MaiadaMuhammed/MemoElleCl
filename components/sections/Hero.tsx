'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import { Link } from '@/lib/navigation'
import { cn } from '@/lib/utils'
import type { Locale } from '@/lib/config'

interface HeroProps {
  locale: Locale
}

export default function Hero({ locale }: HeroProps) {
  const t = useTranslations('hero')
  const containerRef = useRef<HTMLDivElement>(null)
  const isRtl = locale === 'ar'

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  // Stagger delays for text elements
  const stagger = {
    eyebrow: { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
    headline: { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.25, duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
    sub: { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.45, duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
    cta: { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.6, duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
  }

  return (
    <section
      ref={containerRef}
      className="relative min-h-[92vh] flex items-center overflow-hidden bg-brand-gradient"
      aria-label="Hero section"
    >
      {/* ── Background: Packaging Lifestyle Image ────────── */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 z-0"
      >
        {/* Gradient mesh background */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-cream-100 via-brand-cream-200 to-brand-cream-400/60" />

        {/* Decorative circles */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full border border-brand-secondary-400/15"
          aria-hidden="true"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
          className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full border border-brand-secondary-400/10"
          aria-hidden="true"
        />

        {/* Soft glow blobs */}
        <div
          className={cn(
            'absolute top-1/4 w-[500px] h-[500px] rounded-full opacity-25 pointer-events-none',
            'bg-gradient-radial from-brand-secondary-300 to-transparent',
            isRtl ? 'right-1/4' : 'left-1/4'
          )}
          style={{
            background: 'radial-gradient(ellipse at center, rgba(212,165,165,0.25) 0%, transparent 70%)',
          }}
          aria-hidden="true"
        />
      </motion.div>

      {/* ── Hero Image (Right/Left column) ──────────────── */}
      <motion.div
        initial={{ opacity: 0, scale: 1.04, x: isRtl ? -40 : 40 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          'absolute z-10 hidden lg:block',
          'top-12 bottom-12 w-[45%]',
          isRtl ? 'left-0' : 'right-0'
        )}
      >
        <div className="relative h-full rounded-[2rem] overflow-hidden shadow-luxury-lg">
          <Image
            src="/images/packaging.png"
            alt="MemoElle — Luxury Packaging"
            fill
            className="object-cover object-center"
            priority
            sizes="45vw"
          />
          {/* Gradient overlay for text legibility */}
          <div
            className={cn(
              'absolute inset-0',
              isRtl
                ? 'bg-gradient-to-r from-transparent to-brand-cream-100/20'
                : 'bg-gradient-to-l from-transparent to-brand-cream-100/20'
            )}
          />
        </div>

        {/* Floating badge */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className={cn(
            'absolute -bottom-4 glass-card rounded-2xl px-5 py-3 shadow-luxury flex items-center gap-3',
            isRtl ? 'right-8' : 'left-8'
          )}
        >
          <div className="w-8 h-8 rounded-full bg-brand-secondary-gradient flex items-center justify-center">
            <Sparkles size={14} className="text-white" />
          </div>
          <div>
            <p className="text-xs font-semibold text-brand-primary-800 font-body">
              {t('badge')}
            </p>
            <p className="text-[10px] text-brand-secondary-500 font-body tracking-wider">
              MEMOELLE BOUTIQUE
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* ── Hero Text Content ────────────────────────────── */}
      <motion.div
        style={{ opacity }}
        className={cn(
          'relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
          'grid grid-cols-1 lg:grid-cols-2',
          'items-center min-h-[92vh]',
          'pt-12 lg:pt-0'
        )}
      >
        <div className={cn(
          'py-20 lg:py-0 max-w-lg',
          isRtl ? 'lg:col-start-2' : ''
        )}>

          {/* Eyebrow */}
          <motion.div {...stagger.eyebrow} className="mb-5">
            <span className="section-eyebrow inline-flex items-center gap-2">
              <span className="w-8 h-px bg-brand-secondary-500" aria-hidden="true" />
              {t('eyebrow')}
              <span className="w-8 h-px bg-brand-secondary-500" aria-hidden="true" />
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1 {...stagger.headline} className="section-title mb-3">
            {t('headline')}
            <br />
            <span className="gradient-text italic">{t('headlineAccent')}</span>
          </motion.h1>

          {/* Decorative divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="origin-left divider-rose w-24 my-6"
            aria-hidden="true"
          />

          {/* Subheadline */}
          <motion.p {...stagger.sub} className="text-brand-primary-600 text-lg font-body font-light leading-relaxed mb-10 max-w-md">
            {t('subheadline')}
          </motion.p>

          {/* CTAs */}
          <motion.div {...stagger.cta} className="flex flex-wrap gap-4">
            <Link
              href="/products"
              className="btn-luxury btn-primary group"
            >
              {t('cta')}
              <ArrowRight
                size={15}
                className="transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180"
              />
            </Link>
            <Link
              href="/about"
              className="btn-luxury btn-secondary"
            >
              {t('ctaSecondary')}
            </Link>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="flex items-center gap-6 mt-10 pt-8 border-t border-brand-cream-500/50"
          >
            {[
              { num: '5K+', label: locale === 'ar' ? 'عميلة سعيدة' : 'Happy Customers' },
              { num: '200+', label: locale === 'ar' ? 'منتج مختار' : 'Curated Items' },
              { num: '4.9★', label: locale === 'ar' ? 'تقييم العملاء' : 'Customer Rating' },
            ].map(({ num, label }) => (
              <div key={label} className="text-center">
                <p className="font-display text-xl font-bold text-brand-primary-600">{num}</p>
                <p className="text-[10px] text-brand-secondary-500 font-body tracking-wide mt-0.5">{label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="text-[10px] text-brand-secondary-500 font-body tracking-widest uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-8 bg-gradient-to-b from-brand-secondary-400 to-transparent"
        />
      </motion.div>
    </section>
  )
}
