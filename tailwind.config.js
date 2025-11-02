/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-dark': '#1e293b',
        'brand-dark-secondary': '#334155',
        'brand-light': '#ffffff',
        'brand-light-secondary': '#f1f5f9',
        'brand-accent': '#ec4899',
        'brand-primary': '#14b8a6',
        'brand-secondary': '#a855f7',
      },
    },
  },
  plugins: [],
}
