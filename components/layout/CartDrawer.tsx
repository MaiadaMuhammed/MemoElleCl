'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '@/lib/redux/store'
import {
  selectIsCartOpen,
  selectCartItems,
  selectCartSubtotal,
  selectCartTotal,
  selectShippingCost,
  selectCartDiscount,
  selectCartItemCount,
  closeCart,
  removeFromCart,
  updateQuantity,
} from '@/lib/redux/cartSlice'
import { Link } from '@/lib/navigation'
import { formatPrice } from '@/lib/utils'
import { cn } from '@/lib/utils'
import type { Locale } from '@/lib/config'

interface CartDrawerProps {
  locale: Locale
}

export default function CartDrawer({ locale }: CartDrawerProps) {
  const t = useTranslations('cart')
  const dispatch = useAppDispatch()
  const isOpen = useAppSelector(selectIsCartOpen)
  const items = useAppSelector(selectCartItems)
  const subtotal = useAppSelector(selectCartSubtotal)
  const discount = useAppSelector(selectCartDiscount)
  const shipping = useAppSelector(selectShippingCost)
  const total = useAppSelector(selectCartTotal)
  const itemCount = useAppSelector(selectCartItemCount)
  const drawerRef = useRef<HTMLDivElement>(null)

  const isRtl = locale === 'ar'

  // Trap focus + close on Escape
  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') dispatch(closeCart())
    }
    document.addEventListener('keydown', handleKeyDown)
    // Prevent body scroll
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, dispatch])

  return (
    <>
      {/* ── Backdrop ───────────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[200] bg-brand-primary-900/40 backdrop-blur-sm"
            onClick={() => dispatch(closeCart())}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* ── Drawer ─────────────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={drawerRef}
            initial={{ x: isRtl ? '-100%' : '100%' }}
            animate={{ x: '0%' }}
            exit={{ x: isRtl ? '-100%' : '100%' }}
            transition={{ type: 'spring', damping: 32, stiffness: 300 }}
            className={cn(
              'fixed top-0 bottom-0 z-[210] w-full max-w-[420px]',
              'bg-brand-cream-100 flex flex-col',
              'shadow-luxury-lg',
              isRtl ? 'left-0 border-r' : 'right-0 border-l',
              'border-brand-cream-500/40'
            )}
            role="dialog"
            aria-modal="true"
            aria-label={t('title')}
          >

            {/* ── Header ─────────────────────────────────── */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-brand-cream-500/40 flex-shrink-0">
              <div className="flex items-center gap-3">
                <ShoppingBag size={20} className="text-brand-primary-500" />
                <h2 className="font-display text-lg font-semibold text-brand-primary-800">
                  {t('title')}
                </h2>
                {itemCount > 0 && (
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-brand-primary-500 text-white text-xs font-bold font-body">
                    {itemCount}
                  </span>
                )}
              </div>
              <button
                onClick={() => dispatch(closeCart())}
                className="p-2 rounded-full text-brand-primary-600 hover:bg-brand-cream-400 transition-colors duration-200"
                aria-label="Close cart"
              >
                <X size={18} />
              </button>
            </div>

            {/* ── Content ────────────────────────────────── */}
            {items.length === 0 ? (
              /* Empty State */
              <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 text-center gap-4">
                <div className="w-20 h-20 rounded-full bg-brand-cream-300 flex items-center justify-center">
                  <ShoppingBag size={28} className="text-brand-secondary-500" />
                </div>
                <div>
                  <p className="font-display text-xl font-medium text-brand-primary-700 mb-1">
                    {t('empty')}
                  </p>
                  <p className="text-sm text-brand-secondary-500 font-body">
                    {t('emptySubtext')}
                  </p>
                </div>
                <button
                  onClick={() => dispatch(closeCart())}
                  className="btn-luxury btn-primary mt-2"
                >
                  {t('continueShopping')}
                  <ArrowRight size={14} />
                </button>
              </div>
            ) : (
              /* Cart Items */
              <div className="flex-1 overflow-y-auto overscroll-contain">
                <ul className="divide-y divide-brand-cream-400/60 px-4" role="list">
                  {items.map((item, i) => (
                    <motion.li
                      key={`${item.id}-${item.variant?.size}-${item.variant?.color}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: isRtl ? -100 : 100 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex gap-4 py-5"
                    >
                      {/* Image */}
                      <div className="relative w-20 h-24 rounded-luxury overflow-hidden flex-shrink-0 bg-brand-cream-300 img-zoom-wrapper">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-body text-sm font-semibold text-brand-primary-800 leading-snug line-clamp-2">
                            {locale === 'ar' && item.nameAr ? item.nameAr : item.name}
                          </h3>
                          <button
                            onClick={() => dispatch(removeFromCart(item.id))}
                            className="flex-shrink-0 p-1 rounded-md text-brand-secondary-500 hover:text-brand-primary-500 hover:bg-brand-cream-400 transition-colors"
                            aria-label={`${t('removeItem')} ${item.name}`}
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>

                        {/* Variant */}
                        {item.variant && (
                          <p className="text-[11px] text-brand-secondary-500 font-body mt-0.5">
                            {[item.variant.size, item.variant.color, item.variant.shade]
                              .filter(Boolean)
                              .join(' · ')}
                          </p>
                        )}

                        {/* Price + Qty */}
                        <div className="flex items-center justify-between mt-3">
                          <span className="font-display text-sm font-semibold text-brand-primary-600">
                            {formatPrice(item.price * item.quantity, locale)}
                          </span>

                          {/* Quantity Controls */}
                          <div className="flex items-center gap-0 border border-brand-cream-500 rounded-pill overflow-hidden">
                            <button
                              onClick={() =>
                                dispatch(
                                  updateQuantity({
                                    id: item.id,
                                    quantity: item.quantity - 1,
                                  })
                                )
                              }
                              className="w-7 h-7 flex items-center justify-center text-brand-primary-600 hover:bg-brand-cream-400 transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus size={11} />
                            </button>
                            <span className="w-7 text-center text-xs font-semibold font-body text-brand-primary-800">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                dispatch(
                                  updateQuantity({
                                    id: item.id,
                                    quantity: item.quantity + 1,
                                  })
                                )
                              }
                              className="w-7 h-7 flex items-center justify-center text-brand-primary-600 hover:bg-brand-cream-400 transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus size={11} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </div>
            )}

            {/* ── Footer / Summary ─────────────────────── */}
            {items.length > 0 && (
              <div className="flex-shrink-0 border-t border-brand-cream-500/40 px-6 pt-5 pb-6 space-y-4">
                {/* Free shipping progress */}
                {shipping > 0 && (
                  <div className="space-y-1.5">
                    <p className="text-xs text-brand-secondary-600 font-body text-center">
                      {t('shippingNote')}
                    </p>
                    <div className="h-1 bg-brand-cream-400 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min((subtotal / 500) * 100, 100)}%` }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        className="h-full bg-gradient-to-r from-brand-secondary-400 to-brand-primary-500 rounded-full"
                      />
                    </div>
                  </div>
                )}

                {/* Totals */}
                <div className="space-y-2 text-sm font-body">
                  <div className="flex justify-between text-brand-primary-700">
                    <span>{t('subtotal')}</span>
                    <span className="font-medium">{formatPrice(subtotal, locale)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span className="font-medium">-{formatPrice(discount, locale)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-brand-primary-700">
                    <span>{t('shipping')}</span>
                    <span className="font-medium">
                      {shipping === 0 ? (
                        <span className="text-green-600">{t('shippingFree')}</span>
                      ) : (
                        formatPrice(shipping, locale)
                      )}
                    </span>
                  </div>
                </div>

                <div className="divider-rose" />

                {/* Total */}
                <div className="flex justify-between items-center">
                  <span className="font-display font-semibold text-brand-primary-800">
                    {t('total')}
                  </span>
                  <span className="font-display font-bold text-xl text-brand-primary-600">
                    {formatPrice(total, locale)}
                  </span>
                </div>

                {/* Checkout Button */}
                <Link
                  href="/cart"
                  onClick={() => dispatch(closeCart())}
                  className="btn-luxury btn-primary w-full justify-center"
                >
                  {t('checkout')}
                  <ArrowRight size={15} />
                </Link>

                <button
                  onClick={() => dispatch(closeCart())}
                  className="w-full text-center text-xs text-brand-secondary-500 hover:text-brand-primary-500 font-body tracking-wide transition-colors duration-200 py-1"
                >
                  {t('continueShopping')} →
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
