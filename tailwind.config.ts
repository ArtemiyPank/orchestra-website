// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        'primary-color': '#D48166',
        'dark-color': '#373A36',
        'light-color': '#E6E2DD',
        'accent-color': '#bf6c4f'
      }
    }
  },
  plugins: []
};
