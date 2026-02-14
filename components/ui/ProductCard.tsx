'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { Heart, ShoppingBag, Eye } from 'lucide-react'
import { Link } from '@/lib/navigation'
import { useAppDispatch, useAppSelector } from '@/lib/redux/store'
import { addToCart, openCart } from '@/lib/redux/cartSlice'
import { toggleWishlist, selectIsWishlisted } from '@/lib/redux/wishlistSlice'
import { formatPrice, calculateDiscount, cn } from '@/lib/utils'
import type { Locale } from '@/lib/config'

export interface Product {
  id: string
  name: string
  nameAr?: string
  slug: string
  price: number
  originalPrice?: number
  image: string
  images?: string[]
  category: 'fashion' | 'beauty' | 'home'
  badge?: 'new' | 'sale' | 'bestseller'
  description?: string
  descriptionAr?: string
  sku?: string
  inStock?: boolean
  maxQuantity?: number
}

interface ProductCardProps {
  product: Product
  locale: Locale
  index?: number
}

export default function ProductCard({ product, locale, index = 0 }: ProductCardProps) {
  const t = useTranslations('products')
  const dispatch = useAppDispatch()
  const isWishlisted = useAppSelector(selectIsWishlisted(product.id))
  const [isAdding, setIsAdding] = useState(false)
  const [imgLoaded, setImgLoaded] = useState(false)

  const discountPercent = calculateDiscount(
    product.originalPrice ?? 0,
    product.price
  )

  const displayName =
    locale === 'ar' && product.nameAr ? product.nameAr : product.name

  const isOutOfStock = product.inStock === false

  const handleAddToCart = async () => {
    if (isAdding || isOutOfStock) return
    setIsAdding(true)

    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        nameAr: product.nameAr,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.image,
        category: product.category,
        slug: product.slug,
        maxQuantity: product.maxQuantity,
      })
    )

    // Brief delay for haptic/visual feedback, then open drawer
    await new Promise((r) => setTimeout(r, 300))
    dispatch(openCart())
    setIsAdding(false)
  }

  const handleToggleWishlist = () => {
    dispatch(
      toggleWishlist({
        id: product.id,
        name: product.name,
        nameAr: product.nameAr,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.image,
        category: product.category,
        slug: product.slug,
        addedAt: Date.now(),
      })
    )
  }

  const badgeConfig = {
    new: {
      label: t('new'),
      className: 'bg-brand-secondary-500 text-white',
    },
    sale: {
      label: `-${discountPercent}%`,
      className: 'bg-brand-primary-500 text-white',
    },
    bestseller: {
      label: t('bestseller'),
      className: 'bg-brand-gold text-white',
    },
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        delay: index * 0.08,
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group relative bg-white rounded-luxury shadow-card hover:shadow-card-hover transition-shadow duration-500"
    >
      {/* ── Image Container ──────────────────────────────── */}
      <div className="relative aspect-[3/4] rounded-t-luxury overflow-hidden bg-brand-cream-300 img-zoom-wrapper">
        {/* Skeleton */}
        {!imgLoaded && (
          <div className="absolute inset-0 skeleton" aria-hidden="true" />
        )}

        <Image
          src={product.image}
          alt={displayName}
          fill
          className={cn(
            'object-cover transition-opacity duration-500',
            imgLoaded ? 'opacity-100' : 'opacity-0'
          )}
          onLoad={() => setImgLoaded(true)}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />

        {/* Badge */}
        {product.badge && (
          <div
            className={cn(
              'absolute top-3 ltr:left-3 rtl:right-3 px-2.5 py-1 rounded-pill text-[10px] font-bold font-body tracking-wider',
              badgeConfig[product.badge].className
            )}
          >
            {badgeConfig[product.badge].label}
          </div>
        )}

        {/* Out of Stock Overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-brand-cream-100/70 backdrop-blur-[2px] flex items-center justify-center">
            <span className="font-body text-xs font-semibold text-brand-primary-600 tracking-widest uppercase bg-white/80 px-4 py-2 rounded-pill">
              {t('outOfStock')}
            </span>
          </div>
        )}

        {/* ── Hover Actions ─────────────────────────────── */}
        <div
          className={cn(
            'absolute inset-x-3 bottom-3 flex gap-2 transition-all duration-400',
            'translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100',
            'pointer-events-none group-hover:pointer-events-auto'
          )}
        >
          {/* Quick View */}
          <Link
            href={`/products/${product.slug}` as '/'}
            className="flex-1 btn-luxury btn-ghost !py-2.5 !text-[11px] justify-center gap-1.5"
          >
            <Eye size={13} />
            {t('viewDetails')}
          </Link>

          {/* Wishlist Toggle */}
          <button
            onClick={handleToggleWishlist}
            className={cn(
              'w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 flex-shrink-0',
              isWishlisted
                ? 'bg-brand-primary-500 text-white shadow-button'
                : 'bg-white/90 text-brand-primary-600 hover:bg-brand-primary-500 hover:text-white'
            )}
            aria-label={isWishlisted ? t('removeFromWishlist') : t('addToWishlist')}
          >
            <Heart
              size={15}
              className={isWishlisted ? 'fill-current' : ''}
            />
          </button>
        </div>

        {/* Wishlist button (always visible on mobile) */}
        <button
          onClick={handleToggleWishlist}
          className={cn(
            'absolute top-3 ltr:right-3 rtl:left-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300',
            'group-hover:opacity-0',
            isWishlisted
              ? 'bg-brand-primary-500 text-white shadow-button opacity-100'
              : 'bg-white/80 text-brand-primary-600 opacity-100 sm:opacity-0'
          )}
          aria-label={isWishlisted ? t('removeFromWishlist') : t('addToWishlist')}
        >
          <Heart size={13} className={isWishlisted ? 'fill-current' : ''} />
        </button>
      </div>

      {/* ── Product Info ─────────────────────────────────── */}
      <div className="p-4">
        {/* Category tag */}
        <p className="section-eyebrow text-[10px] mb-1.5">{product.category}</p>

        {/* Name */}
        <h3 className="font-display text-base font-semibold text-brand-primary-800 leading-snug line-clamp-2 mb-3">
          <Link
            href={`/products/${product.slug}` as '/'}
            className="hover:text-brand-primary-500 transition-colors duration-200"
          >
            {displayName}
          </Link>
        </h3>

        {/* Price + CTA */}
        <div className="flex items-center justify-between gap-2">
          {/* Price block */}
          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="font-display text-base font-bold text-brand-primary-600">
              {formatPrice(product.price, locale)}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-xs text-brand-secondary-500 line-through font-body">
                {formatPrice(product.originalPrice, locale)}
              </span>
            )}
          </div>

          {/* Add to Cart */}
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={handleAddToCart}
            disabled={isAdding || isOutOfStock}
            className={cn(
              'w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300',
              isAdding
                ? 'bg-brand-secondary-400 text-white scale-90'
                : isOutOfStock
                  ? 'bg-brand-cream-400 text-brand-secondary-500 cursor-not-allowed'
                  : 'bg-brand-primary-500 text-white hover:bg-brand-primary-600 shadow-button hover:shadow-button-hover'
            )}
            aria-label={`${t('addToCart')}: ${displayName}`}
          >
            {isAdding ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 0.6, repeat: Infinity, ease: 'linear' }}
                className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
              />
            ) : (
              <ShoppingBag size={15} />
            )}
          </motion.button>
        </div>
      </div>
    </motion.article>
  )
}
