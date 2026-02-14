# MemoElle — Luxury E-Commerce Platform

> Fashion • Beauty • Home — Made to add beauty to your everyday life ✦

A production-ready, high-performance luxury e-commerce web application built for the MemoElle brand.

---

## Brand Identity

| Element | Value |
|---|---|
| **Primary Color** | `#7D4E4E` — Deep Mocha Brown |
| **Secondary Color** | `#C9A99A` — Dusty Blush Rose |
| **Accent Color** | `#EAC4B8` — Warm Cream Blush |
| **Background** | `#FAF6F3` — Creamy Off-White |
| **Text Dark** | `#3D2020` — Rich Espresso |
| **Gold Accent** | `#C9956A` — Rose Gold |

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 15 (App Router) |
| **Language** | TypeScript (strict mode) |
| **Styling** | Tailwind CSS v3 + custom design tokens |
| **Animation** | Framer Motion |
| **State** | Redux Toolkit + Redux Persist |
| **i18n** | next-intl (middleware-based) |
| **Fonts** | Playfair Display + Montserrat + IBM Plex Sans Arabic |
| **Icons** | Lucide React |

---

## Project Structure

```
memoelle/
├── app/
│   ├── layout.tsx              # Root layout (minimal)
│   └── [locale]/
│       ├── layout.tsx          # Locale layout (fonts, providers, dir)
│       ├── page.tsx            # Home page
│       ├── loading.tsx         # Global loading skeleton
│       ├── cart/page.tsx       # Cart page
│       ├── products/page.tsx   # Product listing
│       └── wishlist/page.tsx   # Wishlist page
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx          # Sticky nav with logo, search, locale switcher
│   │   ├── Footer.tsx          # Full-featured footer
│   │   └── CartDrawer.tsx      # Slide-in cart drawer
│   ├── sections/
│   │   ├── Hero.tsx            # Full-bleed hero with parallax
│   │   ├── CategoryShowcase.tsx # 3-column category cards
│   │   ├── ProductGrid.tsx     # Filterable product grid
│   │   ├── Testimonials.tsx    # Auto-scrolling review marquee
│   │   └── Newsletter.tsx      # Email capture with animation
│   └── ui/
│       └── ProductCard.tsx     # Product card with cart/wishlist
├── lib/
│   ├── redux/
│   │   ├── store.ts            # Redux store + persist config
│   │   ├── cartSlice.ts        # Cart state + selectors
│   │   ├── wishlistSlice.ts    # Wishlist state + selectors
│   │   └── StoreProvider.tsx   # Client-side Redux provider
│   ├── navigation.ts           # next-intl navigation helpers
│   └── utils.ts                # cn(), formatPrice(), etc.
├── messages/
│   ├── en.json                 # English translations
│   └── ar.json                 # Arabic translations (RTL)
├── styles/
│   └── globals.css             # Tailwind base + design tokens
├── public/images/              # Brand assets (logo, packaging)
├── middleware.ts               # next-intl locale routing
├── i18n.ts                     # next-intl server config
├── tailwind.config.ts          # Brand color palette + tokens
└── next.config.ts              # Next.js + next-intl config
```

---

## Getting Started

### Prerequisites
- Node.js 18.17+
- npm, yarn, or pnpm

### Installation

```bash
# 1. Clone / navigate to project
cd memoelle

# 2. Install dependencies
npm install

# 3. Set environment variables
cp .env.example .env.local
# Edit .env.local with your values

# 4. Start development server
npm run dev
```

Visit `http://localhost:3000` — you'll be redirected to `/en` (or `/ar` based on browser language).

---

## Environment Variables

Create `.env.local`:

```env
# Site URL (for metadata)
NEXT_PUBLIC_SITE_URL=https://memoelle.com

# Analytics (optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Email service for newsletter (optional)
NEWSLETTER_API_KEY=your_key_here

# Sentry (optional)
NEXT_PUBLIC_SENTRY_DSN=https://...
```

---

## Key Features

### Internationalization
- English (`/en`) and Arabic (`/ar`) supported
- Automatic RTL layout when locale is `ar`
- `dir` attribute set on `<html>` — all CSS handles RTL automatically
- Arabic font (IBM Plex Sans Arabic) loaded conditionally

### State Management
- **Cart**: Persistent via `localStorage` (redux-persist). Survives page refresh.
- **Wishlist**: Persistent. Toggle behavior — add/remove in one click.
- **Cart Drawer**: Opens as a slide-in panel from the right (LTR) or left (RTL).

### Performance
- `next/font` for zero-CLS font loading
- `next/image` for automatic WebP/AVIF optimization
- Lazy-loaded sections with `Suspense` boundaries
- Framer Motion used only client-side with `'use client'` directives

---

## Brand Colors as CSS Variables

All brand colors are exposed as CSS custom properties in `styles/globals.css`:

```css
:root {
  --color-primary:         #7D4E4E;
  --color-secondary:       #C9A99A;
  --color-cream:           #FAF6F3;
  --color-gold:            #C9956A;
}
```

And as Tailwind config colors:

```jsx
<div className="bg-brand-primary-500 text-brand-cream-100">
  <p className="text-brand-secondary-400">...</p>
</div>
```

---

## Promo Codes

For demo, use: `THANKYOU10` for 10% off (minimum order 200 EGP)

---

## Deployment

```bash
# Build
npm run build

# Type check
npm run type-check

# Deploy to Vercel (recommended)
npx vercel
```

---

## Instagram

[@MemoElleBoutique](https://instagram.com/MemoElleBoutique)

---

*Made with ♥ in Egypt*
