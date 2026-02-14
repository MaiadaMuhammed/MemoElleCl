'use client'

import { useState, useMemo } from 'react'
import { useTranslations } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import { SlidersHorizontal } from 'lucide-react'
import ProductCard, { type Product } from '@/components/ui/ProductCard'
import { cn } from '@/lib/utils'
import type { Locale } from '@/lib/config'

interface ProductGridProps {
  locale: Locale
}

// ── Mock Product Data ─────────────────────────────────────────────
// In production: fetch from your API / CMS
const MOCK_PRODUCTS: Product[] = [
  {
    id: 'p1',
    slug: 'silk-abaya-rose',
    name: 'Rose Silk Abaya',
    nameAr: 'عباءة حرير وردية',
    price: 1250,
    originalPrice: 1600,
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=600&q=80',
    category: 'fashion',
    badge: 'sale',
    inStock: true,
  },
  {
    id: 'p2',
    slug: 'pearl-hijab-blush',
    name: 'Pearl Blush Hijab',
    nameAr: 'حجاب بلاش لؤلؤي',
    price: 320,
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4b4ddb?w=600&q=80',
    category: 'fashion',
    badge: 'bestseller',
    inStock: true,
  },
  {
    id: 'p3',
    slug: 'rosewater-mist',
    name: 'Rose Water Glow Mist',
    nameAr: 'بخاخ ماء الورد',
    price: 185,
    originalPrice: 220,
    image: 'https://images.unsplash.com/photo-1556227703-53710f37afb1?w=600&q=80',
    category: 'beauty',
    badge: 'new',
    inStock: true,
  },
  {
    id: 'p4',
    slug: 'velvet-lip-set',
    name: 'Velvet Lip Set — Nude Collection',
    nameAr: 'طقم أحمر شفاه مخملي',
    price: 275,
    image: 'https://images.unsplash.com/photo-1586495777744-4e6232bf3668?w=600&q=80',
    category: 'beauty',
    badge: 'new',
    inStock: true,
  },
  {
    id: 'p5',
    slug: 'linen-cushion-blush',
    name: 'Blush Linen Cushion Set',
    nameAr: 'طقم وسائد كتان بلاش',
    price: 680,
    originalPrice: 850,
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80',
    category: 'home',
    badge: 'sale',
    inStock: true,
  },
  {
    id: 'p6',
    slug: 'candle-rose-oud',
    name: 'Rose & Oud Luxury Candle',
    nameAr: 'شمعة الورد والعود',
    price: 390,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&q=80',
    category: 'home',
    inStock: true,
  },
  {
    id: 'p7',
    slug: 'embroidered-maxi',
    name: 'Embroidered Maxi Dress',
    nameAr: 'فستان ماكسي مطرز',
    price: 1850,
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80',
    category: 'fashion',
    badge: 'new',
    inStock: true,
  },
  {
    id: 'p8',
    slug: 'serum-vitamin-c',
    name: 'Brightening Vitamin C Serum',
    nameAr: 'سيروم فيتامين سي المضيء',
    price: 420,
    originalPrice: 550,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&q=80',
    category: 'beauty',
    badge: 'bestseller',
    inStock: true,
  },
]

type CategoryFilter = 'all' | 'fashion' | 'beauty' | 'home'
type SortOption = 'newest' | 'price-asc' | 'price-desc' | 'popular'

export default function ProductGrid({ locale }: ProductGridProps) {
  const t = useTranslations('products')
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>('all')
  const [sortBy, setSortBy] = useState<SortOption>('newest')

  const categories: { key: CategoryFilter; label: string }[] = [
    { key: 'all',     label: t('filterAll') },
    { key: 'fashion', label: t('filterFashion') },
    { key: 'beauty',  label: t('filterBeauty') },
    { key: 'home',    label: t('filterHome') },
  ]

  const sortOptions: { key: SortOption; label: string }[] = [
    { key: 'newest',     label: t('sortNewest') },
    { key: 'price-asc',  label: t('sortPriceAsc') },
    { key: 'price-desc', label: t('sortPriceDesc') },
    { key: 'popular',    label: t('sortPopular') },
  ]

  const filteredProducts = useMemo(() => {
    let result = [...MOCK_PRODUCTS]

    // Category filter
    if (activeFilter !== 'all') {
      result = result.filter((p) => p.category === activeFilter)
    }

    // Sort
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        result.sort((a, b) => b.price - a.price)
        break
      case 'popular':
        result.sort((a) => (a.badge === 'bestseller' ? -1 : 1))
        break
      default: // newest — keep original order (badge 'new' first)
        result.sort((a) => (a.badge === 'new' ? -1 : 1))
    }

    return result
  }, [activeFilter, sortBy])

  return (
    <section
      id="products"
      className="py-20 lg:py-28 bg-brand-cream-200"
      aria-label="Product catalog"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section Header ───────────────────────────── */}
        <div className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="section-eyebrow mb-3"
          >
            {t('subtitle')}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="section-title"
          >
            {t('title')}
          </motion.h2>
        </div>

        {/* ── Filters + Sort ────────────────────────────── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">

          {/* Category Filter Pills */}
          <div
            className="flex items-center gap-2 flex-wrap justify-center"
            role="group"
            aria-label="Filter by category"
          >
            {categories.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setActiveFilter(key)}
                className={cn(
                  'px-5 py-2 rounded-pill text-xs font-semibold font-body tracking-widest uppercase transition-all duration-300',
                  activeFilter === key
                    ? 'bg-brand-primary-500 text-white shadow-button'
                    : 'bg-white text-brand-primary-700 border border-brand-cream-500 hover:border-brand-secondary-400 hover:text-brand-primary-500'
                )}
                aria-pressed={activeFilter === key}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={14} className="text-brand-secondary-500 flex-shrink-0" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="text-xs font-body font-medium text-brand-primary-700 bg-transparent border-none outline-none cursor-pointer hover:text-brand-primary-500 transition-colors"
              aria-label={t('sortBy')}
            >
              {sortOptions.map(({ key, label }) => (
                <option key={key} value={key}>
                  {t('sortBy')}: {label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* ── Product Grid ──────────────────────────────── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-brand-secondary-500 font-body text-lg">
                  No products found
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {filteredProducts.map((product, i) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    locale={locale}
                    index={i}
                  />
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-14"
        >
          <a href="/products" className="btn-luxury btn-secondary">
            {locale === 'ar' ? 'عرض كل المنتجات' : 'View All Products'}
            <span className="ltr:ml-1 rtl:mr-1" aria-hidden="true">→</span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
