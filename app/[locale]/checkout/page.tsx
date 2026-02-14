'use client'
import { useAppSelector } from '@/lib/redux/store'
import { selectCartItems, selectCartTotal } from '@/lib/redux/cartSlice'
import { useTranslations } from 'next-intl'

export default function CheckoutPage() {
  const cartItems = useAppSelector(selectCartItems)
  const total = useAppSelector(selectCartTotal)
  const t = useTranslations('cart')

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-display text-brand-primary-800 mb-8 text-center">{t('checkout')}</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* نموذج الشحن والدفع */}
        <div className="space-y-8">
          <div className="bg-white p-6 rounded-luxury shadow-card">
            <h2 className="text-xl font-display mb-4">Shipping Information</h2>
            <form className="grid grid-cols-1 gap-6">
              <input type="text" placeholder="Full Name" className="w-full p-3 border border-brand-cream-500 rounded-lg focus:ring-brand-secondary-400" />
              <input type="email" placeholder="Email Address" className="w-full p-3 border border-brand-cream-500 rounded-lg focus:ring-brand-secondary-400" />
              <input type="text" placeholder="Address" className="w-full p-3 border border-brand-cream-500 rounded-lg focus:ring-brand-secondary-400" />
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="City" className="w-full p-3 border border-brand-cream-500 rounded-lg focus:ring-brand-secondary-400" />
                <input type="text" placeholder="Postal Code" className="w-full p-3 border border-brand-cream-500 rounded-lg focus:ring-brand-secondary-400" />
              </div>
            </form>
          </div>

           <div className="bg-white p-6 rounded-luxury shadow-card">
            <h2 className="text-xl font-display mb-4">Payment Method</h2>
            <div className="space-y-3">
                <label className="flex items-center space-x-3 p-3 border border-brand-cream-500 rounded-lg cursor-pointer hover:bg-brand-cream-100 rtl:space-x-reverse">
                    <input type="radio" name="payment" className="form-radio text-brand-primary-600" />
                    <span>Credit Card</span>
                </label>
                <label className="flex items-center space-x-3 p-3 border border-brand-cream-500 rounded-lg cursor-pointer hover:bg-brand-cream-100 rtl:space-x-reverse">
                    <input type="radio" name="payment" className="form-radio text-brand-primary-600" />
                    <span>Cash on Delivery</span>
                </label>
            </div>
           </div>
        </div>

        {/* ملخص الطلب */}
        <div className="bg-brand-cream-100 p-8 rounded-luxury h-fit sticky top-24">
          <h2 className="text-xl font-display mb-6">Order Summary</h2>
          <div className="space-y-4 mb-6">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between items-center text-sm">
                <span>{item.name} <span className="text-brand-secondary-600">x{item.quantity}</span></span>
                <span>{item.price * item.quantity} EGP</span>
              </div>
            ))}
          </div>
          <div className="border-t border-brand-secondary-300 pt-4 flex justify-between font-bold text-lg text-brand-primary-800">
            <span>Total</span>
            <span>{total} EGP</span>
          </div>
          <button className="w-full mt-8 btn-primary btn-luxury">
            Place Order
          </button>
        </div>
      </div>
    </div>
  )
}