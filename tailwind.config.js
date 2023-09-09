import * as lodash from 'lodash'
const plugins = require('tailwindcss/plugin')

const pxToRem = (px, base = 16) => `${px / base}rem`
//https://fe-developers.kakaoent.com/2022/221013-tailwind-and-design-system/

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    spacing: {
      ...lodash.range(1, 100).reduce((acc, px) => {
        acc[`${px}`] = pxToRem(px)
        return acc
      }, {}),
    },
    colors: {
      lime: {
        50: '#D3F9CD',
        100: '#C0F6B6',
        200: '#98F089',
        300: '#70EB5C',
        400: '#49E52E',
        500: '#32C819',
        600: '#279A13',
        700: '#1B6D0E',
        800: '#103F08',
        900: '#092204',
      },
      orange: {
        50: '#FEFAF5',
        100: '#FEF8F0',
        200: '#FCE0C0',
        300: '#F9C990',
        400: '#F7B15F',
        500: '#F4992F',
        600: '#E4800C',
        700: '#B36509',
        800: '#834A07',
        900: '#522E04',
      },
      grey: {
        50: '#EBEBEB',
        100: '#DEDEDE',
        200: '#C4C4C4',
        300: '#ABABAB',
        400: '#919191',
        500: '#787878',
        600: '#5E5E5E',
        700: '#454545',
        800: '#2B2B2B',
        900: '#121212',
      },
      focus_green: '#2CAE21',
      bright_blue: '#53A1E9',
      dark_navy: '#0E0736',
      bright_orange: '#F5A547',
      burgundy: '#521414',
      bright_purple: '#7335F7',
      deep_purple: '#1C115D',
      bright_lemon: '#ECDF6A',
      bronze: '#4F350F',
      white: '#ffffff',
    },
    extend: {},
    screens: {
      mobile: '360px', // @media (min-width: 360px)
      foldable: '523px', // @media (min-width: 523px)
      tablet: '768px', // @media (min-width: 768px)
      'under-foldable': { max: '522px' }, // @media (max-width: 522px)
      'under-tablet': { max: '767px' }, // @media (max-width: 767px)
      'under-mobile': { max: '359px' }, // @media (max-width: 359px)
    },
  },

  plugins: [
    require('./tailwind-plugins/scrollbar-hide'),
    require('./tailwind-plugins/font-variants'),
    require('./tailwind-plugins/layout'),
  ],
}
