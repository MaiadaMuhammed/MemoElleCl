import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'

// ── Types ──────────────────────────────────────────────────────────
export interface CartItem {
  id: string
  name: string
  nameAr?: string
  price: number
  originalPrice?: number
  quantity: number
  image: string
  category: 'fashion' | 'beauty' | 'home'
  variant?: {
    size?: string
    color?: string
    shade?: string
  }
  slug: string
  sku?: string
  maxQuantity?: number
}

export interface PromoCode {
  code: string
  discount: number
  type: 'percentage' | 'fixed'
  minOrder?: number
}

export interface CartState {
  items: CartItem[]
  promoCode: PromoCode | null
  isOpen: boolean
  lastUpdated: number | null
}

// ── Constants ─────────────────────────────────────────────────────
const FREE_SHIPPING_THRESHOLD = 500 // EGP
const SHIPPING_COST = 60 // EGP flat rate

// ── Initial State ─────────────────────────────────────────────────
const initialState: CartState = {
  items: [],
  promoCode: null,
  isOpen: false,
  lastUpdated: null,
}

// ── Slice ─────────────────────────────────────────────────────────
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Add item or increment quantity if already exists
    addToCart: (state, action: PayloadAction<Omit<CartItem, 'quantity'> & { quantity?: number }>) => {
      const { quantity = 1, ...item } = action.payload
      const existingIndex = state.items.findIndex(
        (i) => i.id === item.id && 
               i.variant?.size === item.variant?.size &&
               i.variant?.color === item.variant?.color
      )

      if (existingIndex >= 0) {
        const existing = state.items[existingIndex]
        const newQty = existing.quantity + quantity
        const maxQty = existing.maxQuantity ?? 99
        state.items[existingIndex].quantity = Math.min(newQty, maxQty)
      } else {
        state.items.push({ ...item, quantity })
      }

      state.lastUpdated = Date.now()
    },

    // Remove item completely
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload)
      state.lastUpdated = Date.now()
    },

    // Update quantity (0 removes the item)
    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number; variantSize?: string; variantColor?: string }>
    ) => {
      const { id, quantity, variantSize, variantColor } = action.payload

      if (quantity <= 0) {
        state.items = state.items.filter((i) => {
          if (i.id !== id) return true
          if (variantSize && i.variant?.size !== variantSize) return true
          if (variantColor && i.variant?.color !== variantColor) return true
          return false
        })
      } else {
        const index = state.items.findIndex((i) => i.id === id)
        if (index >= 0) {
          const maxQty = state.items[index].maxQuantity ?? 99
          state.items[index].quantity = Math.min(quantity, maxQty)
        }
      }

      state.lastUpdated = Date.now()
    },

    // Apply promo code
    applyPromoCode: (state, action: PayloadAction<PromoCode>) => {
      state.promoCode = action.payload
      state.lastUpdated = Date.now()
    },

    // Remove promo code
    removePromoCode: (state) => {
      state.promoCode = null
      state.lastUpdated = Date.now()
    },

    // Clear entire cart (post-checkout)
    clearCart: (state) => {
      state.items = []
      state.promoCode = null
      state.lastUpdated = Date.now()
    },

    // Toggle cart drawer
    openCart: (state) => {
      state.isOpen = true
    },

    closeCart: (state) => {
      state.isOpen = false
    },

    toggleCart: (state) => {
      state.isOpen = !state.isOpen
    },
  },
})

// ── Actions ───────────────────────────────────────────────────────
export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  applyPromoCode,
  removePromoCode,
  clearCart,
  openCart,
  closeCart,
  toggleCart,
} = cartSlice.actions

// ── Selectors ─────────────────────────────────────────────────────
export const selectCartItems = (state: RootState) => state.cart.items

export const selectCartItemCount = (state: RootState) =>
  state.cart.items.reduce((sum, item) => sum + item.quantity, 0)

export const selectCartSubtotal = (state: RootState) =>
  state.cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0)

export const selectCartDiscount = (state: RootState): number => {
  const { promoCode, items } = state.cart
  if (!promoCode) return 0
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  if (promoCode.minOrder && subtotal < promoCode.minOrder) return 0
  return promoCode.type === 'percentage'
    ? (subtotal * promoCode.discount) / 100
    : Math.min(promoCode.discount, subtotal)
}

export const selectShippingCost = (state: RootState): number => {
  const subtotal = selectCartSubtotal(state)
  return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST
}

export const selectCartTotal = (state: RootState): number => {
  const subtotal = selectCartSubtotal(state)
  const discount = selectCartDiscount(state)
  const shipping = selectShippingCost(state)
  return Math.max(0, subtotal - discount + shipping)
}

export const selectIsCartOpen = (state: RootState) => state.cart.isOpen

export const selectPromoCode = (state: RootState) => state.cart.promoCode

export const selectIsItemInCart = (id: string) => (state: RootState) =>
  state.cart.items.some((item) => item.id === id)

export default cartSlice.reducer
