// scrollbar-hide.js
const plugin = require('tailwindcss/plugin')

const fontVariants = plugin(function ({ addUtilities }) {
  addUtilities({
    // . + 유틸리티 이름
    '.title_screen': {
      fontWeight: '600',
      fontSize: '30px',
      lineHeight: '38px',
      letterSpacing: '-0.5%',
      marginBottom: '8px',
    },
    '.title_section': {
      fontWeight: '600',
      fontSize: '26px',
      lineHeight: '32px',
      letterSpacing: '0%',
      marginBottom: '8px',
    },
    '.title_subsection': {
      fontWeight: '600',
      fontSize: '22px',
      lineHeight: '28px',
      letterSpacing: '0%',
      marginBottom: '8px',
    },
    '.title_body': {
      fontWeight: '600',
      fontSize: '18px',
      lineHeight: '24px',
      letterSpacing: '0%',
      marginBottom: '8px',
    },
    '.title_group': {
      fontWeight: '500',
      fontSize: '14px',
      lineHeight: '20px',
      letterSpacing: '0%',
      marginBottom: '8px',
    },
    '.body_large': {
      fontWeight: '400',
      fontSize: '16px',
      lineHeight: '24px',
      letterSpacing: '-0.5%',
      marginBottom: '8px',
    },
    '.body_large_bold': {
      fontWeight: '600',
      fontSize: '16px',
      lineHeight: '24px',
      letterSpacing: '2.5%',
      marginBottom: '8px',
    },
    '.body_default': {
      fontWeight: '400',
      fontSize: '14px',
      lineHeight: '22px',
      letterSpacing: '2%',
      marginBottom: '8px',
    },
    '.body_default_bold': {
      fontWeight: '600',
      fontSize: '14px',
      lineHeight: '22px',
      letterSpacing: '4%',
      marginBottom: '8px',
    },
    '.caption_default': {
      fontWeight: '500',
      fontSize: '12px',
      lineHeight: '14px',
      letterSpacing: '0%',
      marginBottom: '0px',
    },
  })
})

module.exports = fontVariants
