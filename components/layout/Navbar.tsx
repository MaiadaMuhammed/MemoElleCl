'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ShoppingBag,
  Heart,
  Search,
  Menu,
  X,
  Globe,
} from 'lucide-react'
import { useAppDispatch, useAppSelector } from '@/lib/redux/store'
import { selectCartItemCount, toggleCart } from '@/lib/redux/cartSlice'
import { selectWishlistCount } from '@/lib/redux/wishlistSlice'
import { Link } from '@/lib/navigation'
import { cn } from '@/lib/utils'
import type { Locale } from '@/lib/config'

interface NavbarProps {
  locale: Locale
}

const navLinks = [
  { key: 'home',     href: '/' },
  { key: 'products', href: '/products' },
  { key: 'about',    href: '/about' },
  { key: 'contact',  href: '/contact' },
]

export default function Navbar({ locale }: NavbarProps) {
  const t = useTranslations('nav')
  const dispatch = useAppDispatch()
  const cartCount = useAppSelector(selectCartItemCount)
  const wishlistCount = useAppSelector(selectWishlistCount)
  const pathname = usePathname()
  const router = useRouter()

  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const searchRef = useRef<HTMLInputElement>(null)

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Focus search input when opened
  useEffect(() => {
    if (isSearchOpen) searchRef.current?.focus()
  }, [isSearchOpen])

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileOpen(false)
  }, [pathname])

  // Toggle locale
  const switchLocale = () => {
    const nextLocale: Locale = locale === 'en' ? 'ar' : 'en'
    const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/'
    router.push(`/${nextLocale}${pathWithoutLocale}`)
  }

  return (
    <>
      {/* ── Announcement Bar ───────────────────────────────── */}
      {/* نخفي الإعلان أيضًا عند فتح القائمة لجعل المشهد أنظف */}
      <motion.div 
        animate={{ y: isMobileOpen ? '-100%' : '0%' }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="bg-brand-primary-600 text-white text-center py-2 px-4 text-xs tracking-widest uppercase font-body font-medium relative z-[101]"
      >
        <span className="opacity-90">✦ {t('cartEmpty') === 'Your cart is empty' ? 'Free Shipping Over 500 EGP — Use Code THANKYOU10 for 10% Off' : 'شحن مجاني فوق ٥٠٠ ج.م — استخدمي كود THANKYOU10 لخصم ١٠٪'} ✦</span>
      </motion.div>

      {/* ── Main Navbar ────────────────────────────────────── */}
      <motion.nav
        initial={false}
        animate={{
          y: isMobileOpen ? '-100%' : '0%', // الحركة هنا: يرتفع الناف بار ويختفي عند فتح القائمة
          backgroundColor: isScrolled
            ? 'rgba(250, 246, 243, 0.95)'
            : 'rgba(250, 246, 243, 0.80)',
          backdropFilter: isScrolled ? 'blur(20px)' : 'blur(8px)',
          boxShadow: isScrolled
            ? '0 1px 24px rgba(125, 78, 78, 0.08)'
            : '0 1px 0 rgba(125, 78, 78, 0.06)',
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="sticky top-0 z-[100] w-full border-b border-brand-cream-500/40"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[72px]">

            {/* ── Logo ─────────────────────────────────── */}
            <Link
              href="/"
              className="flex-shrink-0 focus:outline-none"
              aria-label="MemoElle Home"
            >
              <div className="relative h-14 w-40 rtl:w-44">
                <Image
                  src="/images/logo.jpg"
                  alt="MemoElle — Fashion Beauty Home"
                  fill
                  className="object-contain object-left rtl:object-right"
                  priority
                  sizes="160px"
                />
              </div>
            </Link>

            {/* ── Desktop Nav Links ─────────────────────── */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map(({ key, href }) => {
                const isActive = pathname === `/${locale}${href === '/' ? '' : href}`
                return (
                  <Link
                    key={key}
                    href={href as '/'}
                    className={cn(
                      'relative text-xs font-body font-semibold tracking-widest uppercase transition-colors duration-200',
                      'after:absolute after:-bottom-0.5 after:left-0 after:right-0 after:h-px',
                      'after:origin-center after:scale-x-0 after:transition-transform after:duration-300 after:ease-luxury',
                      'hover:after:scale-x-100',
                      isActive
                        ? 'text-brand-primary-500 after:bg-brand-secondary-500 after:scale-x-100'
                        : 'text-brand-primary-700 hover:text-brand-primary-500 after:bg-brand-secondary-400'
                    )}
                  >
                    {t(key as 'home')}
                  </Link>
                )
              })}
            </div>

            {/* ── Right Actions ─────────────────────────── */}
            <div className="flex items-center gap-1 sm:gap-2">

              {/* Search */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2.5 rounded-full text-brand-primary-600 hover:text-brand-primary-500 hover:bg-brand-cream-400/60 transition-all duration-200"
                aria-label={t('searchPlaceholder')}
              >
                {isSearchOpen ? <X size={18} /> : <Search size={18} />}
              </button>

              {/* Language Switcher */}
              <button
                onClick={switchLocale}
                className="hidden sm:flex items-center gap-1.5 p-2.5 rounded-full text-brand-primary-600 hover:text-brand-primary-500 hover:bg-brand-cream-400/60 transition-all duration-200"
                aria-label={`Switch to ${locale === 'en' ? 'Arabic' : 'English'}`}
              >
                <Globe size={16} />
                <span className="text-xs font-semibold font-body tracking-wide">
                  {locale === 'en' ? 'ع' : 'EN'}
                </span>
              </button>

              {/* Wishlist */}
              <Link
                href="/wishlist"
                className="relative p-2.5 rounded-full text-brand-primary-600 hover:text-brand-primary-500 hover:bg-brand-cream-400/60 transition-all duration-200"
                aria-label={`${t('wishlist')} (${wishlistCount})`}
              >
                <Heart size={18} />
                <AnimatePresence>
                  {wishlistCount > 0 && (
                    <motion.span
                      key="wishlist-count"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 min-w-[18px] bg-brand-secondary-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center"
                    >
                      {wishlistCount > 9 ? '9+' : wishlistCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>

              {/* Cart */}
              <button
                onClick={() => dispatch(toggleCart())}
                className="relative p-2.5 rounded-full text-brand-primary-600 hover:text-brand-primary-500 hover:bg-brand-cream-400/60 transition-all duration-200"
                aria-label={`${t('cart')} (${cartCount})`}
              >
                <ShoppingBag size={18} />
                <AnimatePresence>
                  {cartCount > 0 && (
                    <motion.span
                      key="cart-count"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 min-w-[18px] bg-brand-primary-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center"
                    >
                      {cartCount > 9 ? '9+' : cartCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              {/* Mobile/Sidebar Menu Toggle */}
              {/* تمت إزالة lg:hidden ليظهر في كل الشاشات */}
              <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="p-2.5 rounded-full text-brand-primary-600 hover:text-brand-primary-500 hover:bg-brand-cream-400/60 transition-all duration-200"
                aria-label="Toggle menu"
                aria-expanded={isMobileOpen}
              >
                {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* ── Search Overlay ────────────────────────────────── */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="overflow-hidden border-t border-brand-cream-500/40"
            >
              <div className="max-w-2xl mx-auto px-4 py-4">
                <div className="relative">
                  <Search
                    size={16}
                    className="absolute top-1/2 -translate-y-1/2 ltr:left-4 rtl:right-4 text-brand-secondary-500 pointer-events-none"
                  />
                  <input
                    ref={searchRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t('searchPlaceholder')}
                    className="w-full h-12 ltr:pl-10 rtl:pr-10 ltr:pr-4 rtl:pl-4 rounded-full border border-brand-cream-500 bg-white/80 text-brand-primary-800 placeholder:text-brand-secondary-500 text-sm font-body focus:outline-none focus:border-brand-secondary-500 focus:ring-2 focus:ring-brand-secondary-300/30 transition-all duration-200"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* ── Sidebar Menu (Desktop & Mobile) ──────────────────── */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              // تمت زيادة z-index وإزالة lg:hidden
              className="fixed inset-0 z-[150] bg-brand-primary-900/30 backdrop-blur-sm"
              onClick={() => setIsMobileOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: locale === 'ar' ? '-100%' : '100%' }}
              animate={{ x: '0%' }}
              exit={{ x: locale === 'ar' ? '-100%' : '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              // تمت زيادة z-index وإزالة lg:hidden وزيادة العرض قليلاً
              className={cn(
                'fixed top-0 bottom-0 z-[200] w-80 bg-brand-cream-100 shadow-luxury-lg flex flex-col',
                locale === 'ar' ? 'left-0' : 'right-0'
              )}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-brand-cream-500/40">
                <div className="relative h-10 w-28">
                  <Image
                    src="/images/logo.jpg"
                    alt="MemoElle"
                    fill
                    className="object-contain object-left"
                  />
                </div>
                <button
                  onClick={() => setIsMobileOpen(false)}
                  className="p-2 rounded-full hover:bg-brand-cream-400 transition-colors"
                  aria-label="Close menu"
                >
                  <X size={20} className="text-brand-primary-600" />
                </button>
              </div>

              {/* Links */}
              <nav className="flex-1 p-6 overflow-y-auto">
                <ul className="space-y-2" role="list">
                  {navLinks.map(({ key, href }, i) => (
                    <motion.li
                      key={key}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06 + 0.1 }}
                    >
                      <Link
                        href={href as '/'}
                        onClick={() => setIsMobileOpen(false)}
                        className="flex items-center gap-4 px-4 py-4 rounded-xl text-brand-primary-800 font-display text-lg hover:bg-brand-cream-200 transition-all duration-200"
                      >
                        {t(key as 'home')}
                      </Link>
                    </motion.li>
                  ))}
                  
                  {/* روابط إضافية للسايد بار */}
                  <li className="pt-4 mt-4 border-t border-brand-cream-500/30">
                     <Link href="/account" onClick={() => setIsMobileOpen(false)} className="flex items-center gap-4 px-4 py-3 text-brand-primary-600 hover:text-brand-primary-800 text-sm font-body uppercase tracking-wider">
                       {t('myAccount')}
                     </Link>
                  </li>
                </ul>
              </nav>

              {/* Bottom Actions */}
              <div className="p-6 border-t border-brand-cream-500/40 space-y-4 bg-brand-cream-200/50">
                <button
                  onClick={switchLocale}
                  className="btn-luxury btn-secondary w-full justify-center gap-2 text-xs bg-white"
                >
                  <Globe size={14} />
                  {locale === 'en' ? 'العربية' : 'English'}
                </button>
                <div className="text-center space-y-1">
                    <p className="text-[10px] text-brand-secondary-600 tracking-widest uppercase font-body">
                    @MemoElleBoutique
                    </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}