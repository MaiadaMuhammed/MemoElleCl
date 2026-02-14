'use client'

import Image from 'next/image'
import { Instagram, Facebook, Twitter } from 'lucide-react'
import { useLocale } from 'next-intl'

export default function AboutFooterSection() {
  const locale = useLocale()
  const isAr = locale === 'ar'

  // المحتوى (يمكنك تعديل النصوص هنا مباشرة)
  const content = {
    title: isAr ? 'عن ميمو إيل' : 'About MemoElle',
    bio: isAr 
      ? 'ميمو إيل ليس مجرد متجر، بل هو احتفاء بالأناقة والجمال في تفاصيل الحياة اليومية. تأسست في القاهرة لتقديم قطع مختارة بعناية تمنح المرأة العصرية الثقة والتميز.'
      : 'MemoElle is more than just a boutique; it is a celebration of elegance and the poetry of everyday life. Founded in Cairo, we curate pieces that bring beauty and confidence to the modern woman.',
  }

  return (
    <section className="bg-brand-cream-200 py-16 border-t border-brand-cream-400 relative overflow-hidden">
      {/* زخرفة خلفية بسيطة */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-secondary-400/50 to-transparent" />

      <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center gap-10">
        
        {/* الصورة */}
        <div className="relative group">
          <div className="absolute inset-0 bg-brand-secondary-400 rounded-full blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500" />
          <div className="relative w-40 h-40 md:w-48 md:h-48 flex-shrink-0">
            <Image 
              src="/images/logo.jpg" 
              alt="MemoElle Brand"
              fill
              className="object-cover rounded-full border-[6px] border-white shadow-luxury"
            />
          </div>
        </div>

        {/* النص */}
        <div className="text-center md:text-start rtl:md:text-right space-y-5">
          <h3 className="text-3xl font-display text-brand-primary-800">
            {content.title}
          </h3>
          <p className="text-brand-primary-700/80 leading-relaxed text-lg max-w-2xl font-body">
            {content.bio}
          </p>
          
          {/* أيقونات التواصل */}
          <div className="flex items-center justify-center md:justify-start gap-4 pt-2">
            <SocialIcon icon={<Instagram size={20} />} href="https://instagram.com" />
            <SocialIcon icon={<Facebook size={20} />} href="https://facebook.com" />
            <SocialIcon icon={<Twitter size={20} />} href="https://twitter.com" />
          </div>
        </div>
      </div>
    </section>
  )
}

function SocialIcon({ icon, href }: { icon: React.ReactNode; href: string }) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className="p-3 bg-white text-brand-primary-600 rounded-full hover:bg-brand-primary-600 hover:text-white transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-1"
    >
      {icon}
    </a>
  )
}