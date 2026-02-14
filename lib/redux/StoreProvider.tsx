'use client'

import { useRef } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from '@/lib/redux/store'

interface StoreProviderProps {
  children: React.ReactNode
}

// Loading skeleton while redux-persist rehydrates
function PersistLoader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-brand-cream-100">
      <div className="flex flex-col items-center gap-4">
        {/* Animated logo placeholder */}
        <div className="w-16 h-16 rounded-full border-2 border-brand-secondary-400 border-t-brand-primary-500 animate-spin" />
        <p className="text-brand-primary-600 font-body text-sm tracking-widest uppercase opacity-60">
          Loading...
        </p>
      </div>
    </div>
  )
}

export default function StoreProvider({ children }: StoreProviderProps) {
  // Use ref to ensure store is only created once (Next.js HMR safety)
  const storeRef = useRef(store)

  return (
    <Provider store={storeRef.current}>
      <PersistGate loading={<PersistLoader />} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  )
}
