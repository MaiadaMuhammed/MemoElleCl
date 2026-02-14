'use client'
import { useState } from 'react'
import { User, Package, Heart, LogOut, HelpCircle } from 'lucide-react'
import { useTranslations } from 'next-intl'

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState('profile')
  const t = useTranslations('common') // افترض وجود ترجمات عامة

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
      {/* Sidebar Menu */}
      <aside className="w-full md:w-64 bg-white rounded-luxury shadow-card p-4 h-fit">
        <nav className="space-y-2">
            <NavItem icon={<User size={18}/>} label="My Profile" active={activeTab === 'profile'} onClick={() => setActiveTab('profile')} />
            <NavItem icon={<Package size={18}/>} label="Orders" active={activeTab === 'orders'} onClick={() => setActiveTab('orders')} />
            <NavItem icon={<Heart size={18}/>} label="Wishlist" active={activeTab === 'wishlist'} onClick={() => setActiveTab('wishlist')} />
            <NavItem icon={<HelpCircle size={18}/>} label="Client Services" active={activeTab === 'support'} onClick={() => setActiveTab('support')} />
            <hr className="my-2 border-brand-cream-300" />
            <button className="w-full flex items-center gap-3 p-3 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                <LogOut size={18} />
                <span>Sign Out</span>
            </button>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 bg-white rounded-luxury shadow-card p-8">
        {renderContent()}
      </main>
    </div>
  )
}

function NavItem({ icon, label, active, onClick }: any) {
    return (
        <button 
            onClick={onClick}
            className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${active ? 'bg-brand-primary-50 text-brand-primary-700 font-medium' : 'text-gray-600 hover:bg-brand-cream-100'}`}
        >
            {icon}
            <span>{label}</span>
        </button>
    )
}

// مكونات التبويبات الفرعية (Placeholder)
const ProfileTab = () => <div><h2 className="text-2xl font-display mb-4">Profile Information</h2><p>Manage your account details here.</p></div>
const OrdersTab = () => <div><h2 className="text-2xl font-display mb-4">Order History</h2><p>No orders yet.</p></div>
const WishlistTab = () => <div><h2 className="text-2xl font-display mb-4">My Wishlist</h2><p>Your saved items will appear here.</p></div>
const SupportTab = () => (
    <div>
        <h2 className="text-2xl font-display mb-4">Client Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border border-brand-cream-500 rounded-lg">
                <h3 className="font-bold text-brand-primary-700">Shipping & Returns</h3>
                <p className="text-sm mt-2 text-gray-600">Track your order or request a return.</p>
            </div>
            <div className="p-4 border border-brand-cream-500 rounded-lg">
                <h3 className="font-bold text-brand-primary-700">Product Care</h3>
                <p className="text-sm mt-2 text-gray-600">Learn how to take care of your MemoElle items.</p>
            </div>
        </div>
    </div>
)