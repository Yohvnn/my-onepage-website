/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      boxShadow: {
        'custom-light': '0 4px 6px rgba(0, 0, 0, 0.1)',
        'custom-dark': '0 4px 6px rgba(255, 255, 255, 0.1)',
      },
      colors: {
        customLightBorder: '#00000', // Example custom light border color
        customDarkBorder: '#373737',  // Example custom dark border color
      },
      fontFamily: {
        sans: ['Geist','bricolage-grotesque', 'Montserrat', 'Roboto', 'Arial', 'sans-serif'],
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