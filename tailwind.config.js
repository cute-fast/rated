/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        klarnaText: ['"Klarna Text"', 'sans-serif'],
        klarnaTitle: ['"Klarna Title"', 'sans-serif']
      },
      animation: {
        'scroll': 'scroll 30s linear infinite',
      },
      animationPlayState: {
        'paused': 'paused',
      },
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-33.333%)' },
        }
      },
    },
  },
  plugins: [],
}; 
