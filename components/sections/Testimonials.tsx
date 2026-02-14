'use client'

import { useRef } from 'react'
import { useTranslations } from 'next-intl'
import { motion, useInView } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Locale } from '@/lib/config'

interface TestimonialsProps {
  locale: Locale
}

const testimonials = [
  {
    id: 1,
    name: 'Sarah M.',
    nameAr: 'سارة م.',
    location: 'Cairo, Egypt',
    locationAr: 'القاهرة، مصر',
    review: 'The packaging alone made me feel like royalty. Every piece I\'ve ordered has been exceptional quality. MemoElle is my go-to for everything.',
    reviewAr: 'التغليف وحده جعلني أشعر كالملكة. كل قطعة طلبتها كانت ذات جودة استثنائية. ميمو إيل هي وجهتي الأولى لكل شيء.',
    rating: 5,
    product: 'Rose Silk Abaya',
    productAr: 'عباءة حرير وردية',
    image: 'S',
  },
  {
    id: 2,
    name: 'Nour A.',
    nameAr: 'نور أ.',
    location: 'Alexandria, Egypt',
    locationAr: 'الإسكندرية، مصر',
    review: 'I\'ve been shopping with MemoElle for a year now. The curation is impeccable — they truly understand what the modern modest woman wants.',
    reviewAr: 'أتسوق من ميمو إيل منذ عام. الاختيارات لا تشوبها شائبة — يفهمون حقاً ما تريده المرأة المحتشمة العصرية.',
    rating: 5,
    product: 'Pearl Blush Hijab',
    productAr: 'حجاب بلاش لؤلؤي',
    image: 'N',
  },
  {
    id: 3,
    name: 'Layla K.',
    nameAr: 'ليلى ك.',
    location: 'Giza, Egypt',
    locationAr: 'الجيزة، مصر',
    review: 'The rose water mist is my holy grail. I gift it to everyone. The scent and packaging are so luxurious for the price.',
    reviewAr: 'بخاخ ماء الورد هو كنزي المفضل. أهديه للجميع. الرائحة والتغليف فاخران جداً للسعر.',
    rating: 5,
    product: 'Rose Water Glow Mist',
    productAr: 'بخاخ ماء الورد',
    image: 'L',
  },
  {
    id: 4,
    name: 'Hana R.',
    nameAr: 'هنا ر.',
    location: 'Dubai, UAE',
    locationAr: 'دبي، الإمارات',
    review: 'Ships fast, arrives beautifully. I ordered the linen cushions and they transformed my living room. More home pieces please!',
    reviewAr: 'شحن سريع، يصل بشكل جميل. طلبت وسائد الكتان وقد غيّرت غرفة معيشتي. أريد المزيد من المنزل!',
    rating: 5,
    product: 'Blush Linen Cushion Set',
    productAr: 'طقم وسائد كتان بلاش',
    image: 'H',
  },
  {
    id: 5,
    name: 'Mariam T.',
    nameAr: 'مريم ت.',
    location: 'Cairo, Egypt',
    locationAr: 'القاهرة، مصر',
    review: 'Customer service is warm and genuine. They really care. The thank-you card in my package made me tear up a little.',
    reviewAr: 'خدمة العملاء دافئة وحقيقية. يهتمون فعلاً. بطاقة الشكر في طردي جعلتني أبكي قليلاً.',
    rating: 5,
    product: 'Rose & Oud Luxury Candle',
    productAr: 'شمعة الورد والعود',
    image: 'M',
  },
  {
    id: 6,
    name: 'Aya B.',
    nameAr: 'آية ب.',
    location: 'Riyadh, KSA',
    locationAr: 'الرياض، السعودية',
    review: 'Finally a brand that combines fashion, beauty, AND home — all with the same elegant, feminine aesthetic. Pure luxury.',
    reviewAr: 'أخيراً علامة تجمع الموضة والجمال والمنزل — كلها بنفس الجمالية الأنيقة النسائية. فخامة حقيقية.',
    rating: 5,
    product: 'Brightening Vitamin C Serum',
    productAr: 'سيروم فيتامين سي المضيء',
    image: 'A',
  },
]

export default function Testimonials({ locale }: TestimonialsProps) {
  const t = useTranslations('testimonials')
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const isRtl = locale === 'ar'

  // Double the array for seamless infinite loop
  const doubled = [...testimonials, ...testimonials]

  return (
    <section
      ref={sectionRef}
      className="py-20 lg:py-28 overflow-hidden bg-brand-cream-100"
      aria-label="Customer testimonials"
    >
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-14 text-center">
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

      {/* Marquee Container */}
      <div className="relative">
        {/* Fade masks */}
        <div className="absolute inset-y-0 ltr:left-0 rtl:right-0 w-24 z-10 bg-gradient-to-r from-brand-cream-100 to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 ltr:right-0 rtl:left-0 w-24 z-10 bg-gradient-to-l from-brand-cream-100 to-transparent pointer-events-none" />

        {/* Row 1 — LTR scroll */}
        <div className="flex gap-6 w-max animate-[marquee_45s_linear_infinite] hover:pause-marquee">
          {doubled.map((item, i) => (
            <TestimonialCard
              key={`row1-${item.id}-${i}`}
              item={item}
              locale={locale}
            />
          ))}
        </div>
      </div>

      {/* Rating summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mt-14 text-center"
      >
        <div className="inline-flex items-center gap-3 px-6 py-3 glass-card rounded-pill">
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} size={14} className="fill-brand-gold text-brand-gold" />
            ))}
          </div>
          <span className="font-display font-bold text-brand-primary-700">4.9</span>
          <span className="w-px h-4 bg-brand-cream-500" aria-hidden="true" />
          <span className="text-xs text-brand-secondary-500 font-body">
            {locale === 'ar' ? 'من أكثر من ١٠٠٠ تقييم' : 'from 1,000+ reviews'}
          </span>
        </div>
      </motion.div>
    </section>
  )
}

// ── Single Testimonial Card ───────────────────────────────────────
function TestimonialCard({
  item,
  locale,
}: {
  item: (typeof testimonials)[number]
  locale: Locale
}) {
  const isAr = locale === 'ar'
  const review = isAr && item.reviewAr ? item.reviewAr : item.review
  const name = isAr && item.nameAr ? item.nameAr : item.name
  const location = isAr && item.locationAr ? item.locationAr : item.location
  const product = isAr && item.productAr ? item.productAr : item.product

  return (
    <article className="w-80 sm:w-96 flex-shrink-0 glass-card rounded-luxury p-6 flex flex-col gap-4">
      {/* Quote Icon */}
      <Quote size={20} className="text-brand-secondary-400/60" aria-hidden="true" />

      {/* Stars */}
      <div className="flex gap-0.5" aria-label={`${item.rating} stars`}>
        {Array.from({ length: item.rating }).map((_, i) => (
          <Star key={i} size={12} className="fill-brand-gold text-brand-gold" />
        ))}
      </div>

      {/* Review */}
      <p className="text-brand-primary-700 text-sm font-body leading-relaxed line-clamp-4">
        &ldquo;{review}&rdquo;
      </p>

      {/* Product purchased */}
      <p className="text-[10px] text-brand-secondary-500 font-body tracking-wider uppercase">
        {locale === 'ar' ? 'بخصوص:' : 're:'} {product}
      </p>

      {/* Author */}
      <div className="flex items-center gap-3 pt-2 border-t border-brand-cream-500/50">
        <div className="w-9 h-9 rounded-full bg-brand-secondary-gradient flex items-center justify-center flex-shrink-0">
          <span className="text-white font-display font-semibold text-sm">
            {item.image}
          </span>
        </div>
        <div>
          <p className="text-xs font-semibold text-brand-primary-800 font-body">{name}</p>
          <p className="text-[10px] text-brand-secondary-500 font-body">{location}</p>
        </div>
      </div>
    </article>
  )
}
