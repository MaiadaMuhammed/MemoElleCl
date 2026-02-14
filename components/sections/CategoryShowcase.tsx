'use client'

import { useRef } from 'react'
import { useTranslations } from 'next-intl'
import { motion, useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from '@/lib/navigation'
import { cn } from '@/lib/utils'
import type { Locale } from '@/lib/config'

interface CategoryShowcaseProps {
  locale: Locale
}

const categories = [
  {
    key: 'fashion',
    href: '/products?category=fashion',
    bgColor: 'bg-brand-primary-500',
    textColor: 'text-white',
    accentColor: 'bg-white/20',
    emoji: '✦',
    image: 'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=600&q=80',
  },
  {
    key: 'beauty',
    href: '/products?category=beauty',
    bgColor: 'bg-brand-cream-400',
    textColor: 'text-brand-primary-800',
    accentColor: 'bg-brand-secondary-500/20',
    emoji: '◈',
    image: 'https://images.unsplash.com/photo-1580870069867-74c57ee1bb07?w=600&q=80',
  },
  {
    key: 'home',
    href: '/products?category=home',
    bgColor: 'bg-brand-secondary-500',
    textColor: 'text-white',
    accentColor: 'bg-white/20',
    emoji: '❋',
    image: 'https://images.unsplash.com/photo-1616627547584-bf28cee262db?w=600&q=80',
  },
]

export default function CategoryShowcase({ locale }: CategoryShowcaseProps) {
  const t = useTranslations('categories')
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      className="py-20 lg:py-28 bg-brand-cream-300"
      aria-label="Shop by category"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="section-eyebrow mb-3"
          >
            {t('subtitle')}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="section-title"
          >
            {t('title')}
          </motion.h2>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map(({ key, href, bgColor, textColor, accentColor, emoji, image }, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                delay: 0.2 + i * 0.12,
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <Link
                href={href as '/'}
                className={cn(
                  'group relative block rounded-luxury overflow-hidden',
                  'aspect-[3/4] md:aspect-[4/5]',
                  'shadow-card hover:shadow-card-hover transition-shadow duration-500'
                )}
                aria-label={`Shop ${t(key as 'fashion')}`}
              >
                {/* Background Image */}
                <div className="absolute inset-0 img-zoom-wrapper">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={image}
                    alt={t(key as 'fashion')}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-primary-900/75 via-brand-primary-900/20 to-transparent" />

                {/* Top accent badge */}
                <div
                  className={cn(
                    'absolute top-5 ltr:right-5 rtl:left-5 w-10 h-10 rounded-full flex items-center justify-center',
                    'glass-card text-brand-secondary-400 text-lg',
                    'transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12'
                  )}
                >
                  {emoji}
                </div>

                {/* Content */}
                <div className="absolute bottom-0 inset-x-0 p-6">
                  <h3
                    className={cn(
                      'font-display text-2xl sm:text-3xl font-semibold text-white mb-1'
                    )}
                  >
                    {t(key as 'fashion')}
                  </h3>
                  <p className="text-brand-cream-300/80 text-sm font-body mb-5">
                    {t(`${key}Desc` as 'fashionDesc')}
                  </p>
                  <div className="inline-flex items-center gap-2 text-white/90 text-xs font-body font-semibold tracking-widest uppercase group-hover:gap-3 transition-all duration-300">
                    {t('exploreAll')}
                    <ArrowRight size={13} className="rtl:rotate-180" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
