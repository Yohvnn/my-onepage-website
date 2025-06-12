/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      boxShadow: {
        'custom-light': '0 2px 10px rgba(0, 0, 0, 0.05)',
        'custom-dark': '0 2px 10px rgba(255, 255, 255, 0.05)',
        'glass': '0 4px 20px 0 rgba(0, 0, 0, 0.1)',
      },
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        accent: 'var(--color-accent)',
        background: 'v  ar(--color-background)',
        foreground: 'var(--color-foreground)',
        border: 'var(--color-border)',
        muted: 'var(--color-muted)',
      },
      fontFamily: {
        sans: ['Noto Sans SC', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['Noto Serif SC', 'ui-serif', 'Georgia', 'serif'],
        display: ['ZCOOL QingKe HuangYou', 'Noto Sans SC', 'sans-serif'],
        mono: ['Fira Code', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      borderRadius: {
        'sm': '0.125rem',
        DEFAULT: '0.25rem',
        'md': '0.375rem',
        'lg': '0.5rem',
      },
      animation: {
        'float': 'floating 3s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        floating: {
          '0%, 100%': {
            transform: 'translateY(0)',
          },
          '50%': {
            transform: 'translateY(-5px)',
          },
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
  ],
  content: [
    "./node_modules/flowbite/**/*.js"
  ]
}