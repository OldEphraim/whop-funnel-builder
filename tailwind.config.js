/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          'whop-dark': '#0a0a0a',
          'whop-gray': '#1a1a1a',
          'whop-gray-light': '#2a2a2a',
          'whop-blue': '#3b82f6',
          'whop-blue-hover': '#2563eb',
          'whop-text': '#ffffff',
          'whop-text-muted': '#a3a3a3',
          'whop-border': '#333333'
        },
        screens: {
          'xs': '475px',
        },
      },
    },
    plugins: [],
  }
  