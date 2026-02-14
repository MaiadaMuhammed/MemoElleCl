import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'

// ── Types ──────────────────────────────────────────────────────────
export interface WishlistItem {
  id: string
  name: string
  nameAr?: string
  price: number
  originalPrice?: number
  image: string
  category: 'fashion' | 'beauty' | 'home'
  slug: string
  addedAt: number
}

export interface WishlistState {
  items: WishlistItem[]
}

// ── Initial State ─────────────────────────────────────────────────
const initialState: WishlistState = {
  items: [],
}

// ── Slice ─────────────────────────────────────────────────────────
const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    // Toggle: add if not present, remove if present
    toggleWishlist: (state, action: PayloadAction<WishlistItem>) => {
      const index = state.items.findIndex((i) => i.id === action.payload.id)
      if (index >= 0) {
        state.items.splice(index, 1)
      } else {
        state.items.push({ ...action.payload, addedAt: Date.now() })
      }
    },

    // Explicit add
    addToWishlist: (state, action: PayloadAction<WishlistItem>) => {
      const exists = state.items.some((i) => i.id === action.payload.id)
      if (!exists) {
        state.items.push({ ...action.payload, addedAt: Date.now() })
      }
    },

    // Explicit remove
    removeFromWishlist: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((i) => i.id !== action.payload)
    },

    // Clear all
    clearWishlist: (state) => {
      state.items = []
    },
  },
})

// ── Actions ───────────────────────────────────────────────────────
export const {
  toggleWishlist,
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
} = wishlistSlice.actions

// ── Selectors ─────────────────────────────────────────────────────
export const selectWishlistItems = (state: RootState) => state.wishlist.items

export const selectWishlistCount = (state: RootState) => state.wishlist.items.length

export const selectIsWishlisted = (id: string) => (state: RootState) =>
  state.wishlist.items.some((i) => i.id === id)

export default wishlistSlice.reducer
