// scrollbar-hide.js
const plugin = require('tailwindcss/plugin')

const scrollbarHide = plugin(function ({ addUtilities }) {
  addUtilities({
    // . + 유틸리티 이름
    '.scrollbar-hide': {
      'scrollbar-width': 'none',
      '-ms-overflow-style': 'none',
      '&::-webkit-scrollbar': {
        display: 'none',
      },
    },
  })
})

module.exports = scrollbarHide
