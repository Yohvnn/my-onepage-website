/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html', 
    './src/**/*.{vue,js,ts,jsx,tsx}',
    "./node_modules/flowbite/**/*.js"
  ],
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
        background: 'var(--color-background)',
        foreground: 'var(--color-foreground)',
        border: 'var(--color-border)',
        muted: 'var(--color-muted)',
      },
      fontFamily: {
        sans: ['Inter', 'Poppins', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['ui-serif', 'Georgia', 'serif'],
        display: ['Poppins', 'Inter', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      borderRadius: {
        'sm': '0.25rem',     /* 4px */
        DEFAULT: '0.5rem',   /* 8px */
        'md': '0.75rem',     /* 12px */
        'lg': '1rem',        /* 16px */
        'xl': '1.25rem',     /* 20px */
        '2xl': '1.5rem',     /* 24px */
        '3xl': '2rem',       /* 32px */
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
  ]
}