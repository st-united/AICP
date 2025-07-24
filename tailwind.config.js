/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'short-underline':
          'linear-gradient(to right, transparent 5%, currentColor 5%, currentColor 95%, transparent 95%)',
      },
      backgroundSize: {
        '90%': '90% 2px',
      },
      backgroundPosition: {
        'bottom-center': 'bottom center',
      },
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
        // base: '#fe7743',
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
    screens: {
      xs: '0px',
      xsS: '300px',
      xsM: '410px',
      xsL: '470px',
      sm: '600px',
      smXS: '642px',
      smS: '681px',
      smM: '746px',
      smML: '768px',
      smL: '780px',
      md: '960px', // > iPad gen 9 vertical (810x1080)
      mdS: '1045px',
      mdM: '1120px',
      mdL: '1230px',
      lg: '1281px',
      lgS: '1350px',
      lgM: '1440px',
      lgL: '1600px',
      xl: '1920px',
      'h-sm': { raw: '(min-height: 600px)' },
      'h-md': { raw: '(min-height: 700px)' },
      'h-lg': { raw: '(min-height: 800px)' },
      'h-xl': { raw: '(min-height: 900px)' },
      'h-2xl': { raw: '(min-height: 1024px)' },
    },
  },
  plugins: [],
};
