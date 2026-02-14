'use client'

import { useState } from 'react'
import { User, Package, Heart, LogOut, HelpCircle } from 'lucide-react'
import { useTranslations } from 'next-intl'

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState('profile')
  const t = useTranslations('account') // استخدام مفاتيح قسم "account"

  // دالة لتبديل المحتوى بناءً على التبويب
  const renderContent = () => {
    switch(activeTab) {
        case 'orders': return <OrdersTab />
        case 'wishlist': return <WishlistTab />
        case 'support': return <SupportTab />
        default: return <ProfileTab />
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 flex flex-col md:flex-row gap-8 min-h-[60vh]">
      {/* القائمة الجانبية Sidebar */}
      <aside className="w-full md:w-64 bg-white rounded-luxury shadow-card p-4 h-fit sticky top-24">
        <nav className="space-y-2">
            <NavItem 
              icon={<User size={18}/>} 
              label={t('profile')} 
              active={activeTab === 'profile'} 
              onClick={() => setActiveTab('profile')} 
            />
            <NavItem 
              icon={<Package size={18}/>} 
              label={t('orders')} 
              active={activeTab === 'orders'} 
              onClick={() => setActiveTab('orders')} 
            />
            <NavItem 
              icon={<Heart size={18}/>} 
              label={t('wishlist')} 
              active={activeTab === 'wishlist'} 
              onClick={() => setActiveTab('wishlist')} 
            />
            <NavItem 
              icon={<HelpCircle size={18}/>} 
              label={t('clientServices')} 
              active={activeTab === 'support'} 
              onClick={() => setActiveTab('support')} 
            />
            
            <hr className="my-2 border-brand-cream-300" />
            
            <button className="w-full flex items-center gap-3 p-3 text-red-500 hover:bg-red-50 rounded-lg transition-colors rtl:flex-row-reverse rtl:justify-end">
                <LogOut size={18} />
                <span>{t('signOut')}</span>
            </button>
        </nav>
      </aside>

      {/* منطقة المحتوى الرئيسي */}
      <main className="flex-1 bg-white rounded-luxury shadow-card p-8">
        {renderContent()}
      </main>
    </div>
  )
}

// مكون عنصر القائمة
function NavItem({ icon, label, active, onClick }: any) {
    return (
        <button 
            onClick={onClick}
            className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all rtl:space-x-reverse ${
              active 
                ? 'bg-brand-primary-50 text-brand-primary-700 font-medium' 
                : 'text-gray-600 hover:bg-brand-cream-100'
            }`}
        >
            {icon}
            <span>{label}</span>
        </button>
    )
}

// ── المكونات الفرعية (مع الترجمة) ─────────────────────────────

const ProfileTab = () => {
  const t = useTranslations('account')
  return (
    <div>
      <h2 className="text-2xl font-display mb-4 text-brand-primary-800">{t('profile')}</h2>
      <p className="text-gray-600">
        {/* يمكنك إضافة مفتاح ترجمة لهذا النص لاحقاً أو تركه عاماً */}
        Manage your account details here.
      </p>
    </div>
  )
}

const OrdersTab = () => {
  const t = useTranslations('account')
  return (
    <div>
      <h2 className="text-2xl font-display mb-4 text-brand-primary-800">{t('orders')}</h2>
      <div className="text-center py-12 bg-brand-cream-50 rounded-lg border border-dashed border-brand-cream-300">
        <Package className="mx-auto h-12 w-12 text-brand-secondary-400 mb-3" />
        <p className="text-gray-500">{t('noOrders')}</p>
      </div>
    </div>
  )
}

const WishlistTab = () => {
  // نستخدم هنا ترجمات الـ wishlist الموجودة في الملف
  const t = useTranslations('wishlist')
  return (
    <div>
      <h2 className="text-2xl font-display mb-4 text-brand-primary-800">{t('title')}</h2>
      <div className="text-center py-12 bg-brand-cream-50 rounded-lg border border-dashed border-brand-cream-300">
        <Heart className="mx-auto h-12 w-12 text-brand-secondary-400 mb-3" />
        <p className="text-gray-500">{t('empty')}</p>
        <p className="text-sm text-gray-400 mt-1">{t('emptySubtext')}</p>
      </div>
    </div>
  )
}

const SupportTab = () => {
  const t = useTranslations('account')
  return (
    <div>
        <h2 className="text-2xl font-display mb-4 text-brand-primary-800">{t('clientServices')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 border border-brand-cream-500 rounded-lg hover:border-brand-secondary-400 transition-colors">
                <h3 className="font-bold text-brand-primary-700 mb-2">{t('shippingReturns')}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{t('trackOrder')}</p>
            </div>
            <div className="p-5 border border-brand-cream-500 rounded-lg hover:border-brand-secondary-400 transition-colors">
                <h3 className="font-bold text-brand-primary-700 mb-2">{t('productCare')}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{t('careGuide')}</p>
            </div>
        </div>
    </div>
  )
}