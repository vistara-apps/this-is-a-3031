/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(0 0% 99%)',
        text: 'hsl(210 15% 30%)',
        muted: 'hsl(210 15% 60%)',
        accent: 'hsl(160 100% 40%)',
        primary: 'hsl(210 100% 50%)',
        surface: 'hsl(0 0% 95%)',
        dark: {
          background: 'hsl(220 30% 8%)',
          surface: 'hsl(220 25% 12%)',
          text: 'hsl(220 15% 95%)',
          muted: 'hsl(220 15% 70%)',
        }
      },
      borderRadius: {
        'lg': '12px',
        'md': '8px',
        'sm': '4px',
      },
      spacing: {
        'lg': '24px',
        'md': '16px',
        'sm': '8px',
      },
      boxShadow: {
        'card': '0 4px 12px hsla(0, 0%, 0%, 0.08)',
        'dark-card': '0 4px 20px hsla(0, 0%, 0%, 0.3)',
      }
    },
  },
  darkMode: 'class',
  plugins: [],
}