import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // ============================================================
      // MEMOELLE BRAND PALETTE
      // Extracted from official logo & brand identity files
      // Primary: Deep Mocha | Secondary: Blush Rose | Accent: Cream
      // ============================================================
      colors: {
        brand: {
          // Deep mocha-brown from the "Memo" wordmark & figure silhouette
          primary: {
            50:  '#fdf5f0',
            100: '#fae6dc',
            200: '#f4ccba',
            300: '#ebaa8f',
            400: '#df7f62',
            500: '#7D4E4E',  // Core primary — logo brown
            600: '#6B3F3F',  // Deeper brown
            700: '#5a3333',
            800: '#3D2020',  // Darkest text
            900: '#2a1515',
          },
          // Dusty rose-pink from the "Elle" wordmark & hijab drape
          secondary: {
            50:  '#fdf8f6',
            100: '#faeee9',
            200: '#f5dcd4',
            300: '#EAC4B8',  // Lightest blush
            400: '#D4A5A5',  // Mid blush — packaging accent
            500: '#C9A99A',  // Core secondary
            600: '#b08878',
            700: '#8f6b5d',
            800: '#6d5147',
            900: '#4d3932',
          },
          // Warm cream / background tones
          cream: {
            50:  '#FFFFFF',
            100: '#FDF9F7',  // Page background
            200: '#FAF6F3',  // Card backgrounds
            300: '#F7F0EC',  // Section bg
            400: '#F2E0D8',  // Hover states
            500: '#E8C5B8',  // Accent borders
            600: '#D4B0A0',
          },
          // Rose gold accent
          gold: {
            DEFAULT: '#C9956A',
            light:   '#E8C5A0',
            dark:    '#A07048',
          },
        },
      },

      fontFamily: {
        // Headings — elegant serif with high contrast
        display:  ['var(--font-playfair)', 'Georgia', 'serif'],
        // Body — clean & geometric
        body:     ['var(--font-montserrat)', 'Helvetica Neue', 'sans-serif'],
        // Accent / logo lockup
        accent:   ['var(--font-zen-dots)', 'monospace'],
        // Arabic script
        arabic:   ['var(--font-ibm-arabic)', 'Tahoma', 'sans-serif'],
      },

      backgroundImage: {
        'brand-gradient':     'linear-gradient(135deg, #FAF6F3 0%, #F7F0EC 50%, #F2E0D8 100%)',
        'hero-gradient':      'linear-gradient(180deg, rgba(250,246,243,0) 0%, rgba(125,78,78,0.06) 100%)',
        'card-shimmer':       'linear-gradient(105deg, transparent 40%, rgba(248,230,220,0.6) 50%, transparent 60%)',
        'glass-overlay':      'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.1) 100%)',
        'primary-gradient':   'linear-gradient(135deg, #7D4E4E 0%, #6B3F3F 100%)',
        'secondary-gradient': 'linear-gradient(135deg, #D4A5A5 0%, #C9A99A 100%)',
      },

      boxShadow: {
        'luxury':    '0 4px 32px rgba(125, 78, 78, 0.08), 0 1px 8px rgba(125, 78, 78, 0.04)',
        'luxury-lg': '0 16px 64px rgba(125, 78, 78, 0.12), 0 4px 16px rgba(125, 78, 78, 0.08)',
        'card':      '0 2px 20px rgba(61, 32, 32, 0.06)',
        'card-hover':'0 8px 40px rgba(61, 32, 32, 0.14)',
        'glass':     '0 8px 32px rgba(125, 78, 78, 0.08), inset 0 1px 0 rgba(255,255,255,0.6)',
        'nav':       '0 1px 24px rgba(125, 78, 78, 0.06)',
        'button':    '0 4px 16px rgba(125, 78, 78, 0.30)',
        'glow':      '0 0 40px rgba(201, 169, 154, 0.35)',
      },

      borderRadius: {
        'luxury': '16px',
        'pill':   '9999px',
        'card':   '12px',
      },

      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '88': '22rem',
        '100': '25rem',
        '120': '30rem',
      },

      animation: {
        'float':          'float 6s ease-in-out infinite',
        'shimmer':        'shimmer 2.5s linear infinite',
        'marquee':        'marquee 30s linear infinite',
        'fade-in':        'fadeIn 0.6s ease-out forwards',
        'slide-up':       'slideUp 0.7s cubic-bezier(0.16,1,0.3,1) forwards',
        'scale-in':       'scaleIn 0.5s cubic-bezier(0.16,1,0.3,1) forwards',
        'pulse-soft':     'pulseSoft 3s ease-in-out infinite',
        'spin-slow':      'spin 8s linear infinite',
      },

      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        marquee: {
          '0%':   { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%':   { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%':   { opacity: '0', transform: 'scale(0.92)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0.6' },
        },
      },

      backdropBlur: {
        xs: '2px',
      },

      transitionTimingFunction: {
        'luxury': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'bounce-soft': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },

      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
      },
    },
  },
  plugins: [],
}

export default config
