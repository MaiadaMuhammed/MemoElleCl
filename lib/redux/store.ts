import { configureStore, combineReducers } from '@reduxjs/toolkit'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage' // localStorage
import cartReducer from './cartSlice'
import wishlistReducer from './wishlistSlice'

// ── Persist Configuration ─────────────────────────────────────────
const cartPersistConfig = {
  key: 'memoelle-cart',
  version: 1,
  storage,
  // Only persist items and promoCode (not UI state like isOpen)
  whitelist: ['items', 'promoCode', 'lastUpdated'],
}

const wishlistPersistConfig = {
  key: 'memoelle-wishlist',
  version: 1,
  storage,
  whitelist: ['items'],
}

// ── Root Reducer ──────────────────────────────────────────────────
const rootReducer = combineReducers({
  cart:     persistReducer(cartPersistConfig, cartReducer),
  wishlist: persistReducer(wishlistPersistConfig, wishlistReducer),
})

// ── Store ─────────────────────────────────────────────────────────
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore redux-persist actions for serializability check
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
})

export const persistor = persistStore(store)

// ── Types ─────────────────────────────────────────────────────────
export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch

// ── Typed hooks (re-exported for convenience) ─────────────────────
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
