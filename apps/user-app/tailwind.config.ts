import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0B1614',
        surface: '#12211E',
        'surface-raised': '#182B27',
        gold: '#E8A93B',
        emerald: '#1FAE7A',
        coral: '#E4553D',
        'bonus-amber': '#C98A2C',
        ink: '#F3EFE6',
        'ink-muted': '#9BA8A3',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      },
      keyframes: {
        'draw-line': {
          '0%': { strokeDashoffset: '150' },
          '100%': { strokeDashoffset: '0' },
        },
      },
      animation: {
        'draw-line': 'draw-line 1.5s ease-out forwards',
      },
    },
  },
  plugins: [],
} satisfies Config
