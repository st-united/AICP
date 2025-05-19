/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--primary-color)',
          light: 'var(--primary-color-light)',
          bold: 'var(--primary-color-bold)',
          gray: 'var(--primary-gray-color)',
        },
        pharagraph: {
          DEFAULT: 'var(--pharagraph-color)',
          light: 'var(--pharagraph-light-color)',
        },
      },
    },
  },
  plugins: [],
};
