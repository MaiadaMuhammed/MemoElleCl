import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import ProductGrid from '@/components/sections/ProductGrid'
import type { Locale } from '@/lib/config'

export async function generateMetadata({
  params,
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'products' })
  return {
    title: t('title'),
    description: t('subtitle'),
  }
}

export default function ProductsPage({
  params,
}: {
  params: { locale: string }
}) {
  return (
    <div className="min-h-screen bg-brand-cream-100 pt-8">
      {/* Page Header */}
      <div className="bg-brand-gradient py-16 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="section-eyebrow mb-3">MemoElle</p>
          <h1 className="section-title">Our Collections</h1>
        </div>
      </div>

      {/* Products */}
      <ProductGrid locale={params.locale as Locale} />
    </div>
  )
}
