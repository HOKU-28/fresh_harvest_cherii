/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FDFDFB',
          100: '#F8F8F5',
          200: '#EFECE3',
          300: '#E8E0D6',
        },
        sage: {
          300: '#C5D2BE',
          400: '#A7B89F',
          500: '#8FA187',
        },
        forest: {
          700: '#2E5D32',
          800: '#1F4223',
          900: '#162D19',
        },
        charcoal: {
          800: '#2A2422',
          900: '#1F1F1F',
          950: '#14171A',
        },
        amber: {
          400: '#FBD087',
          500: '#F3BA82',
          600: '#EAA063',
          700: '#E68A48',
        },
        terracotta: {
          500: '#D28368',
          600: '#C26E54',
        },
        twilight: {
          700: '#5A5260',
          800: '#3D404A',
          900: '#242A27',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
