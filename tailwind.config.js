/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        coffee: {
          50: '#FAF7F2',
          100: '#F4ECE4',
          200: '#E7D5C5',
          300: '#D5B79F',
          400: '#C09375',
          500: '#A97451',
          600: '#8E5A3B',
          700: '#6E432A',
          800: '#4A2D1C',
          900: '#2E190E',
          950: '#1C0D07',
        },
        caramel: {
          light: '#E6A77C',
          DEFAULT: '#C67C4E',
          dark: '#A85E32',
        },
        cream: {
          light: '#FFFFFF',
          DEFAULT: '#FDFBF7',
          dark: '#F3EDE2',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
      boxShadow: {
        'coffee': '0 10px 30px -5px rgba(46, 25, 14, 0.1)',
        'coffee-lg': '0 20px 40px -10px rgba(46, 25, 14, 0.2)',
        'warm': '0 8px 24px -4px rgba(198, 124, 78, 0.25)',
      }
    },
  },
  plugins: [],
}
