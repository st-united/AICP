/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      paragraph: {
        DEFAULT: 'var(--paragraph-color)',
        light: 'var(--paragraph-light-color)',
      },
      boxShadow: {
        sm: '0px 0px 8px #00000026',
        light: '0px 0px 20px #fe774380',
        md: '0px 0px 10px #00000026',
        'bottom-none': '0px -2px 8px #00000026',
      },
      colors: {
        primary: {
          DEFAULT: 'var(--primary-color)',
          light: 'var(--primary-color-light)',
          bold: 'var(--primary-color-bold)',
          gray: 'var(--primary-gray-color)',
        },
        base: '#fe7743',
        secondary: '#686868',
        error: '#F23030',
        disabled: '#F5F5F7',
      },
      borderColor: {
        primary: '#fe7743',
        secondary: '#686868',
        error: '#F23030',
        'primary-light': '#FCC5AF',
      },
    },
  },
  plugins: [],
};
