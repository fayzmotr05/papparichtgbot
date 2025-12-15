/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Coffee Shop Brand Colors - Green & White Theme
        primary: {
          50: '#f0f9f3',
          100: '#dcf4e3',
          200: '#bce7cc',
          300: '#8dd4a8',
          400: '#56b97b',
          500: '#2d8f47', // Main coffee green
          600: '#22703a',
          700: '#1e5a31',
          800: '#1a4a29',
          900: '#153d23',
        },
        coffee: {
          50: '#f8f6f0',
          100: '#f0ebe0',
          200: '#e1d5c1',
          300: '#d0bc9a',
          400: '#c0a373',
          500: '#8b4513', // Coffee brown
          600: '#7a3d11',
          700: '#68340f',
          800: '#562b0d',
          900: '#45220a',
        },
        telegram: {
          bg: 'var(--tg-theme-bg-color)',
          text: 'var(--tg-theme-text-color)',
          hint: 'var(--tg-theme-hint-color)',
          link: 'var(--tg-theme-link-color)',
          button: 'var(--tg-theme-button-color)',
          buttonText: 'var(--tg-theme-button-text-color)',
          secondaryBg: 'var(--tg-theme-secondary-bg-color)',
        }
      },
      fontFamily: {
        sans: ['SF Pro Text', 'Helvetica', 'Arial', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'bounce-in': 'bounceIn 0.6s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceIn: {
          '0%': { transform: 'scale(0.3)', opacity: '0' },
          '50%': { transform: 'scale(1.05)' },
          '70%': { transform: 'scale(0.9)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      spacing: {
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
      }
    },
  },
  plugins: [],
}