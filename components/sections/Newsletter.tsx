'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { motion, useInView } from 'framer-motion'
import { Mail, ArrowRight, Check, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Locale } from '@/lib/config'

interface NewsletterProps {
  locale: Locale
}

export default function Newsletter({ locale }: NewsletterProps) {
  const t = useTranslations('newsletter')
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async () => {
    if (!email.trim() || status === 'loading') return
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('error')
      return
    }

    setStatus('loading')

    // Simulate API call — replace with real newsletter service
    await new Promise((r) => setTimeout(r, 1200))
    setStatus('success')
    setEmail('')
  }

  return (
    <section
      ref={ref}
      className="relative py-20 lg:py-28 overflow-hidden"
      aria-label="Newsletter signup"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-primary-800 via-brand-primary-700 to-brand-primary-600" />

      {/* Decorative pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'%3E%3Ccircle cx='40' cy='40' r='1'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
        aria-hidden="true"
      />

      {/* Glow orb */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(212,165,165,0.12) 0%, transparent 65%)',
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        {/* Icon */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.5, ease: 'backOut' }}
          className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-secondary-500/20 border border-brand-secondary-500/30 mb-6"
        >
          <Mail size={24} className="text-brand-secondary-400" />
        </motion.div>

        {/* Discount badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-pill bg-brand-secondary-500/20 border border-brand-secondary-500/30 mb-5"
        >
          <Sparkles size={12} className="text-brand-secondary-400" />
          <span className="text-brand-secondary-300 text-xs font-body font-semibold tracking-wider">
            {t('discount')}
          </span>
        </motion.div>

        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="text-brand-secondary-400 text-[11px] font-body font-semibold tracking-[0.2em] uppercase mb-3"
        >
          {t('eyebrow')}
        </motion.p>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.28 }}
          className="font-display text-3xl sm:text-4xl font-semibold text-white mb-4 leading-tight"
        >
          {t('title')}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.36 }}
          className="text-brand-cream-300/70 font-body text-base leading-relaxed mb-10 max-w-md mx-auto"
        >
          {t('subtitle')}
        </motion.p>

        {/* Email Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.44 }}
          className="max-w-md mx-auto"
        >
          {status === 'success' ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex items-center justify-center gap-3 py-4 px-6 rounded-full bg-brand-secondary-500/20 border border-brand-secondary-500/40"
            >
              <div className="w-7 h-7 rounded-full bg-brand-secondary-500 flex items-center justify-center flex-shrink-0">
                <Check size={14} className="text-white" />
              </div>
              <p className="text-brand-cream-200 font-body text-sm font-medium">
                {t('success')}
              </p>
            </motion.div>
          ) : (
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Mail
                  size={15}
                  className="absolute top-1/2 -translate-y-1/2 ltr:left-4 rtl:right-4 text-brand-secondary-400/60 pointer-events-none"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    if (status === 'error') setStatus('idle')
                  }}
                  onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                  placeholder={t('placeholder')}
                  className={cn(
                    'w-full h-14 ltr:pl-11 rtl:pr-11 ltr:pr-5 rtl:pl-5 rounded-full',
                    'bg-white/10 backdrop-blur-sm border',
                    'text-white placeholder:text-brand-cream-300/40 text-sm font-body',
                    'focus:outline-none transition-all duration-300',
                    status === 'error'
                      ? 'border-red-400/60 focus:border-red-400'
                      : 'border-white/20 focus:border-brand-secondary-400/60 focus:ring-2 focus:ring-brand-secondary-400/20'
                  )}
                  aria-label={t('placeholder')}
                  aria-invalid={status === 'error'}
                />
              </div>

              <button
                onClick={handleSubmit}
                disabled={status === 'loading'}
                className={cn(
                  'btn-luxury flex-shrink-0 h-14 px-6',
                  'bg-brand-secondary-500 hover:bg-brand-secondary-400 text-white',
                  'disabled:opacity-70 disabled:cursor-not-allowed',
                  'transition-all duration-300 shadow-button'
                )}
              >
                {status === 'loading' ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                    className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                  />
                ) : (
                  <>
                    <span className="hidden sm:block">{t('cta')}</span>
                    <ArrowRight size={16} className="sm:hidden rtl:rotate-180" />
                  </>
                )}
              </button>
            </div>
          )}

          <p className="text-brand-cream-300/40 text-[11px] font-body mt-4 tracking-wide">
            {t('privacy')}
          </p>
        </motion.div>

        {/* Packaging Image Accent */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="hidden lg:block absolute -bottom-8 ltr:-right-8 rtl:-left-8 w-64 h-64 opacity-15 pointer-events-none select-none"
          aria-hidden="true"
        >
          <Image
            src="/images/thankyou-card.png"
            alt=""
            fill
            className="object-contain rotate-12"
          />
        </motion.div>
      </div>
    </section>
  )
}
