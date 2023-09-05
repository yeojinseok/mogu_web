// scrollbar-hide.js
const plugin = require('tailwindcss/plugin')

const layout = plugin(function ({ addUtilities }) {
  addUtilities({
    // . + 유틸리티 이름
    '.container': {
      width: '100%',
      height: '100%',
    },
    '.v-stack': {
      display: 'flex',
      flexDirection: 'row',
    },
    '.h-stack': {
      display: 'flex',
      flexDirection: 'column',
    },
    '.footer': {
      position: 'absolute',
      bottom: 0,

      width: '100%',
      maxWidth: '768px',
      margin: '0 auto',
    },
  })
})

module.exports = layout