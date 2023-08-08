/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
    screens: {
      mobile: '330px',
      small_devices: '600px',
      medium_devices: '768px',
      large_devices: '992px',
      // => @media (min-width: 640px) { ... }

      laptop: '1124px',
      // => @media (min-width: 1024px) { ... }

      desktop_middle: '1280px',
      // => @media (min-width: 1280px) { ... }
      desktop_full: '1640px',
    },
    minWidth: {
      200: '200px',
      375: '375px',
    },
    maxWidth: {
      200: '200px',
      250: '250px',
      300: '300px',
      350: '350px',
      400: '400px',
      500: '500px',
      1520: '1520px',
    },
    minHeight: {
      250: '250px',
    },
    colors: {
      green: {
        100: '#d3f9cd',
        200: '',
        300: '',
        400: '',
        500: '',
        600: '',
        700: '',
        800: '',
        900: '',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    plugin(function ({ addUtilities }) {
      const newUtilities = {
        '.body1': {
          fontFamily: 'Inter',
          fontSize: '30px',
        },
        '.skew-15deg': {
          transform: 'skewY(-15deg)',
        },
      }

      addUtilities(newUtilities)
    }),
  ],
}

//https://v1.tailwindcss.com/docs/plugins#adding-utilities 사용하여 유틸리티 플러그인 추가하기
