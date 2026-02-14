'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ArrowLeft,
  Tag,
} from 'lucide-react'
import { useAppDispatch, useAppSelector } from '@/lib/redux/store'
import {
  selectCartItems,
  selectCartSubtotal,
  selectCartTotal,
  selectShippingCost,
  selectCartDiscount,
  removeFromCart,
  updateQuantity,
  applyPromoCode,
  removePromoCode,
  selectPromoCode,
} from '@/lib/redux/cartSlice'
import { Link } from '@/lib/navigation'
import { formatPrice } from '@/lib/utils'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import type { Locale } from '@/lib/config'

// Hardcoded for demo — in real app from route params
const LOCALE: Locale = 'en'

export default function CartPage() {
  const t = useTranslations('cart')
  const dispatch = useAppDispatch()
  const items = useAppSelector(selectCartItems)
  const subtotal = useAppSelector(selectCartSubtotal)
  const discount = useAppSelector(selectCartDiscount)
  const shipping = useAppSelector(selectShippingCost)
  const total = useAppSelector(selectCartTotal)
  const activePromo = useAppSelector(selectPromoCode)

  const [promoInput, setPromoInput] = useState('')
  const [promoStatus, setPromoStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleApplyPromo = () => {
    const code = promoInput.trim().toUpperCase()
    if (code === 'THANKYOU10') {
      dispatch(applyPromoCode({ code, discount: 10, type: 'percentage', minOrder: 200 }))
      setPromoStatus('success')
    } else {
      setPromoStatus('error')
    }
  }

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-6"
        >
          <div className="w-24 h-24 mx-auto rounded-full bg-brand-cream-300 flex items-center justify-center">
            <ShoppingBag size={36} className="text-brand-secondary-500" />
          </div>
          <h1 className="font-display text-2xl font-semibold text-brand-primary-800">
            {t('empty')}
          </h1>
          <p className="text-brand-secondary-500 font-body">{t('emptySubtext')}</p>
          <Link href="/products" className="btn-luxury btn-primary inline-flex">
            {t('continueShopping')}
            <ArrowRight size={15} />
          </Link>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-brand-cream-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-10">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-xs text-brand-secondary-500 hover:text-brand-primary-500 font-body font-medium tracking-wider uppercase transition-colors mb-4"
          >
            <ArrowLeft size={13} className="rtl:rotate-180" />
            {t('continueShopping')}
          </Link>
          <h1 className="section-title">
            {t('title')}
            <span className="text-brand-secondary-400 font-body text-lg font-normal ltr:ml-3 rtl:mr-3">
              ({items.reduce((s, i) => s + i.quantity, 0)} items)
            </span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* ── Cart Items ─────────────────────────────── */}
          <div className="lg:col-span-8">
            <ul className="space-y-4" role="list">
              <AnimatePresence>
                {items.map((item) => (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="glass-card rounded-luxury p-5 flex gap-5"
                  >
                    {/* Image */}
                    <div className="relative w-24 h-28 rounded-luxury overflow-hidden flex-shrink-0 bg-brand-cream-300 img-zoom-wrapper">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="96px"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="font-display text-base font-semibold text-brand-primary-800 leading-snug">
                          {item.name}
                        </h3>
                        <button
                          onClick={() => dispatch(removeFromCart(item.id))}
                          className="flex-shrink-0 p-2 rounded-full text-brand-secondary-500 hover:text-brand-primary-500 hover:bg-brand-cream-400 transition-colors"
                          aria-label={`${t('removeItem')}: ${item.name}`}
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>

                      <p className="text-xs text-brand-secondary-500 font-body capitalize mt-0.5">
                        {item.category}
                        {item.variant?.size && ` · ${item.variant.size}`}
                      </p>

                      <div className="flex items-center justify-between mt-4">
                        {/* Qty Controls */}
                        <div className="flex items-center border border-brand-cream-500 rounded-pill overflow-hidden">
                          <button
                            onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}
                            className="w-8 h-8 flex items-center justify-center text-brand-primary-600 hover:bg-brand-cream-400 transition-colors"
                            aria-label="Decrease"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="w-8 text-center text-sm font-semibold font-body text-brand-primary-800">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                            className="w-8 h-8 flex items-center justify-center text-brand-primary-600 hover:bg-brand-cream-400 transition-colors"
                            aria-label="Increase"
                          >
                            <Plus size={12} />
                          </button>
                        </div>

                        <span className="font-display font-bold text-brand-primary-600">
                          {formatPrice(item.price * item.quantity, LOCALE)}
                        </span>
                      </div>
                    </div>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          </div>

          {/* ── Order Summary ──────────────────────────── */}
          <aside className="lg:col-span-4 glass-card rounded-luxury p-6 space-y-5 sticky top-24">
            <h2 className="font-display text-lg font-semibold text-brand-primary-800">
              {t('orderSummary')}
            </h2>

            {/* Promo Code */}
            {!activePromo ? (
              <div className="space-y-2">
                <label className="text-xs font-body font-medium text-brand-primary-700 flex items-center gap-1.5">
                  <Tag size={12} /> {t('promoCode')}
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => { setPromoInput(e.target.value); setPromoStatus('idle') }}
                    placeholder={t('promoPlaceholder')}
                    className={cn(
                      'flex-1 h-10 px-3 rounded-luxury border text-sm font-body bg-white/60',
                      'focus:outline-none focus:ring-2 transition-all',
                      promoStatus === 'error'
                        ? 'border-red-400 focus:ring-red-300/30'
                        : 'border-brand-cream-500 focus:ring-brand-secondary-300/30 focus:border-brand-secondary-400'
                    )}
                  />
                  <button
                    onClick={handleApplyPromo}
                    className="btn-luxury btn-ghost !py-0 h-10 !px-4 !text-xs"
                  >
                    {t('promoApply')}
                  </button>
                </div>
                {promoStatus === 'error' && (
                  <p className="text-[11px] text-red-500 font-body">{t('promoError')}</p>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-between py-2 px-3 rounded-luxury bg-green-50 border border-green-200">
                <span className="text-xs font-semibold text-green-700 font-body">
                  {t('promoSuccess')} ({activePromo.code})
                </span>
                <button
                  onClick={() => dispatch(removePromoCode())}
                  className="text-[11px] text-green-600 hover:text-red-500 transition-colors font-body"
                >
                  ✕
                </button>
              </div>
            )}

            <div className="divider-rose" />

            {/* Line Items */}
            <div className="space-y-3 text-sm font-body">
              <div className="flex justify-between text-brand-primary-700">
                <span>{t('subtotal')}</span>
                <span className="font-medium">{formatPrice(subtotal, LOCALE)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount (-{activePromo?.discount}%)</span>
                  <span className="font-medium">−{formatPrice(discount, LOCALE)}</span>
                </div>
              )}
              <div className="flex justify-between text-brand-primary-700">
                <span>{t('shipping')}</span>
                <span className={cn('font-medium', shipping === 0 && 'text-green-600')}>
                  {shipping === 0 ? t('shippingFree') : formatPrice(shipping, LOCALE)}
                </span>
              </div>
            </div>

            <div className="divider-rose" />

            {/* Total */}
            <div className="flex justify-between items-center">
              <span className="font-display font-semibold text-brand-primary-800">{t('total')}</span>
              <span className="font-display font-bold text-2xl text-brand-primary-600">
                {formatPrice(total, LOCALE)}
              </span>
            </div>

            {/* Checkout */}
            <button className="btn-luxury btn-primary w-full justify-center group">
              {t('checkout')}
              <ArrowRight
                size={15}
                className="transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1"
              />
            </button>

            {/* Security badge */}
            <p className="text-center text-[11px] text-brand-secondary-400 font-body">
              🔒 Secure checkout — SSL encrypted
            </p>
          </aside>
        </div>
      </div>
    </div>
  )
}
