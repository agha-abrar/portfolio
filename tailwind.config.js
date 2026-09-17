/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        void: '#05060f',
        deep: '#0a0d1c',
        mist: '#f2f6ff',
        star: '#ffffff',
        cyan: '#5eead4',
        rose: '#fb7185',
        amber: '#fbbf24',
        muted: '#b8c0d9',
      },
      fontFamily: {
        display: ['"Syne"', 'sans-serif'],
        body: ['"Figtree"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
