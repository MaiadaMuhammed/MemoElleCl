'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Instagram, Facebook, Twitter, Sparkles } from 'lucide-react'

export default function AboutPage() {
  const t = useTranslations('about') 

  return (
    <div className="bg-brand-cream-100 min-h-screen pb-20">
      
      {/* ── Hero Section ────────────────────────────── */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/about-hero.jpg" // ضعي صورة معبرة هنا
            alt="MemoElle Story"
            fill
            className="object-cover opacity-80"
            priority
          />
          <div className="absolute inset-0 bg-brand-primary-900/30 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-cream-100 via-transparent to-transparent" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto space-y-6">
          <span className="inline-block py-1 px-3 border border-brand-cream-200/50 rounded-full text-brand-cream-100 text-xs tracking-[0.2em] uppercase backdrop-blur-sm">
            Est. 2026
          </span>
          <h1 className="text-5xl md:text-7xl font-display text-brand-cream-50 leading-tight">
            Our Story
          </h1>
          <p className="text-lg md:text-xl text-brand-cream-100/90 font-body font-light max-w-xl mx-auto">
            Weaving elegance into the fabric of everyday life.
          </p>
        </div>
      </section>

      {/* ── Main Content ────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20">
        
        {/* Intro Card */}
        <div className="bg-white/80 backdrop-blur-md border border-white/60 p-8 md:p-12 rounded-luxury shadow-luxury-lg text-center max-w-4xl mx-auto mb-20">
          <Sparkles className="w-8 h-8 text-brand-secondary-400 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-display text-brand-primary-800 mb-6">
            More Than Just a Boutique
          </h2>
          <p className="text-brand-primary-700/80 leading-loose text-lg font-body">
            MemoElle was born from a desire to celebrate the quiet confidence of the modern woman. 
            We believe that modesty and luxury are not opposites, but soulmates. 
            Every piece in our collection is curated with intention, ensuring that you don't just wear our clothes—you feel them.
          </p>
        </div>

        {/* Founder & Mission Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
          
          {/* Image Side */}
          <div className="relative h-[600px] rounded-luxury overflow-hidden shadow-card group">
            <Image
              src="/images/founder.jpg" // صورة المؤسسة أو صورة مودل
              alt="MemoElle Aesthetics"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Decorative Frame */}
            <div className="absolute inset-4 border border-white/30 rounded-lg pointer-events-none" />
          </div>

          {/* Text Side */}
          <div className="space-y-8 md:ltr:pl-10 md:rtl:pr-10">
            <h3 className="text-4xl font-display text-brand-primary-800">
              The Art of Details
            </h3>
            <div className="space-y-6 text-brand-primary-700/80 font-body leading-relaxed">
              <p>
                Founded in the heart of Cairo, MemoElle draws inspiration from the city's 
                timeless beauty and the vibrant spirit of its women.
              </p>
              <p>
                We specialize in three worlds: <strong className="text-brand-primary-600">Fashion</strong> that flows, 
                <strong className="text-brand-primary-600"> Beauty</strong> that glows, and 
                <strong className="text-brand-primary-600"> Home</strong> accents that inspire.
              </p>
            </div>

            {/* Social Links */}
            <div className="pt-6 border-t border-brand-secondary-200">
              <p className="text-sm font-display text-brand-primary-800 mb-4">Follow Our Journey</p>
              <div className="flex gap-4">
                <SocialLink href="#" icon={<Instagram size={20} />} label="@MemoElleBoutique" />
                <SocialLink href="#" icon={<Facebook size={20} />} label="MemoElle" />
                <SocialLink href="#" icon={<Twitter size={20} />} label="@MemoElle" />
              </div>
            </div>
          </div>
        </div>

        {/* ── Values Section (Optional) ───────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <ValueCard 
            title="Quality First" 
            desc="We carefully select fabrics and ingredients that stand the test of time."
          />
          <ValueCard 
            title="Authenticity" 
            desc="Staying true to our roots while embracing modern aesthetics."
          />
          <ValueCard 
            title="Community" 
            desc="Building a circle of women who uplift and inspire one another."
          />
        </div>

      </div>
    </div>
  )
}

// ── Helper Components ─────────────────────────────────

function SocialLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <a 
      href={href} 
      className="flex items-center gap-2 px-4 py-2 bg-white border border-brand-cream-300 rounded-full text-brand-primary-600 text-sm hover:bg-brand-primary-600 hover:text-white hover:border-brand-primary-600 transition-all duration-300"
    >
      {icon}
      <span className="hidden sm:inline">{label}</span>
    </a>
  )
}

function ValueCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="p-8 bg-white border border-brand-cream-200 rounded-luxury hover:shadow-luxury transition-shadow duration-300 text-center">
      <h4 className="text-xl font-display text-brand-primary-800 mb-3">{title}</h4>
      <p className="text-sm text-brand-primary-600/70 leading-relaxed">{desc}</p>
    </div>
  )
}