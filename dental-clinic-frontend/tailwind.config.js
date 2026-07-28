/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          100: '#3a3a3a',
          200: '#333333',
          300: '#272727',
        }
      }
    },
  },
  plugins: [],
}