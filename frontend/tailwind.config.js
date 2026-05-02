/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        rose: {
          DEFAULT: '#F72585',
          deep: '#C1175A',
          soft: '#FFE0EF',
          mid: '#FDB8D7',
        },
        ink: {
          DEFAULT: '#150A10',
          light: '#4A2035',
          mist: '#9B7089',
        },
        blush: '#FFF5F9',
        surface: '#FFFFFF',
        border: '#F2DDE8',
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Cabinet Grotesk', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        xl: '16px',
        '2xl': '20px',
        '3xl': '24px',
      },
      boxShadow: {
        rose: '0 4px 20px rgba(247,37,133,0.28)',
        'rose-lg': '0 8px 32px rgba(247,37,133,0.36)',
        panel: '0 2px 12px rgba(21,10,16,0.06)',
      },
    },
  },
  plugins: [],
}
