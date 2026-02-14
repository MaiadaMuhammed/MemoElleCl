import { Suspense } from 'react'
import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import Hero from '@/components/sections/Hero'
import CategoryShowcase from '@/components/sections/CategoryShowcase'
import ProductGrid from '@/components/sections/ProductGrid'
import Testimonials from '@/components/sections/Testimonials'
import Newsletter from '@/components/sections/Newsletter'
import type { Locale } from '@/lib/config'

// ── Page Metadata ─────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const t = await getTranslations({
    locale: params.locale,
    namespace: 'metadata',
  })

  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('ogTitle'),
      description: t('ogDescription'),
    },
  }
}

// ── Skeleton Loaders ──────────────────────────────────────────────
function ProductGridSkeleton() {
  return (
    <section className="py-20 bg-brand-cream-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14 space-y-4">
          <div className="skeleton h-3 w-32 mx-auto rounded-full" />
          <div className="skeleton h-8 w-64 mx-auto rounded-lg" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="rounded-luxury overflow-hidden shadow-card">
              <div className="skeleton aspect-[3/4]" />
              <div className="bg-white p-4 space-y-2">
                <div className="skeleton h-2.5 w-16 rounded-full" />
                <div className="skeleton h-4 w-full rounded-md" />
                <div className="skeleton h-4 w-3/4 rounded-md" />
                <div className="flex justify-between items-center pt-1">
                  <div className="skeleton h-5 w-20 rounded-md" />
                  <div className="skeleton w-9 h-9 rounded-full" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Page Component ────────────────────────────────────────────────
export default function HomePage({
  params,
}: {
  params: { locale: string }
}) {
  const locale = params.locale as Locale

  return (
    <>
      {/* ── 1. Hero — Above the fold ─────────────────────── */}
      <Hero locale={locale} />

      {/* ── 2. Category Showcase ─────────────────────────── */}
      <CategoryShowcase locale={locale} />

      {/* ── 3. Product Grid (with Suspense for streaming) ── */}
      <Suspense fallback={<ProductGridSkeleton />}>
        <ProductGrid locale={locale} />
      </Suspense>

      {/* ── 4. Brand Promise Banner ──────────────────────── */}
      <BrandPromiseBanner locale={locale} />

      {/* ── 5. Testimonials Marquee ──────────────────────── */}
      <Testimonials locale={locale} />

      {/* ── 6. Newsletter Capture ────────────────────────── */}
      <Newsletter locale={locale} />
    </>
  )
}

// ── Brand Promise Banner ──────────────────────────────────────────
function BrandPromiseBanner({ locale }: { locale: Locale }) {
  const isAr = locale === 'ar'

  const promises = isAr
    ? [
        { icon: '✦', title: 'شحن سريع', desc: 'توصيل سريع وآمن' },
        { icon: '◈', title: 'تغليف فاخر', desc: 'كل طلب يُعبأ بعناية' },
        { icon: '❋', title: 'إرجاع مجاني', desc: '١٤ يوم إرجاع بدون أسئلة' },
        { icon: '✿', title: 'خدمة عملاء', desc: 'متاحون دائماً لمساعدتك' },
      ]
    : [
        { icon: '✦', title: 'Fast Delivery', desc: 'Quick & secure shipping' },
        { icon: '◈', title: 'Luxury Packaging', desc: 'Every order beautifully wrapped' },
        { icon: '❋', title: 'Free Returns', desc: '14-day no-questions returns' },
        { icon: '✿', title: 'Customer Care', desc: 'Always here for you' },
      ]

  return (
    <section className="border-y border-brand-cream-500/40 bg-white/60 backdrop-blur-sm overflow-hidden">
      {/* Marquee-style infinite scroll */}
      <div className="flex items-stretch" aria-label="Brand promises">
        <div className="flex animate-[marquee_25s_linear_infinite] w-max">
          {[...promises, ...promises].map((p, i) => (
            <div
              key={i}
              className="flex items-center gap-3 px-8 py-5 border-r border-brand-cream-500/40 flex-shrink-0 min-w-[200px]"
            >
              <span className="text-brand-secondary-500 text-lg" aria-hidden="true">
                {p.icon}
              </span>
              <div>
                <p className="text-xs font-semibold text-brand-primary-700 font-body">{p.title}</p>
                <p className="text-[10px] text-brand-secondary-500 font-body">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
