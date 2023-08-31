// scrollbar-hide.js
const plugin = require('tailwindcss/plugin')

const layout = plugin(function ({ addUtilities }) {
  addUtilities({
    // . + 유틸리티 이름
    '.container': {
      width: '100%',
      height: '100%',
      padding: 16,
    },
    '.vStack': {
      display: 'flex',
      flexDirection: 'row',
    },
    '.hStack': {
      display: 'flex',
      flexDirection: 'column',
    },
  })
})

module.exports = layout
