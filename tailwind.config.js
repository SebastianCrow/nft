const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto Flex', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        scrollbarThumb: 'rgb(193, 193, 193)',
        scrollbarTrack: 'rgb(250, 250, 250)',
        dark: {
          scrollbarThumb: 'rgb(59, 49, 71)',
          scrollbarTrack: 'rgb(0, 0, 0)',
        },
      },
      textColor: {
        DEFAULT: 'rgb(68, 64, 68)',
        secondary: 'rgb(92, 88, 92)',
        action: 'rgb(245, 243, 247)',
        dark: {
          DEFAULT: 'rgb(245, 243, 247)',
          secondary: 'rgb(143, 142, 143)',
        },
      },
      backgroundColor: {
        DEFAULT: 'rgb(255, 255, 255)',
        highlight: 'rgb(241 245 249)',
        loader: 'rgb(226 232 240)',
        action: 'rgb(228, 37, 117)',
        dark: {
          DEFAULT: 'rgb(18, 12, 24)',
          highlight: 'rgb(36, 24, 47)',
          loader: 'rgb(36, 24, 47)',
          action: 'rgb(228, 37, 117)',
        },
      },
      borderColor: {
        DEFAULT: 'rgb(229, 231, 235)',
        dark: {
          DEFAULT: 'rgb(49, 39, 61)',
        },
      },
      outlineColor: {
        DEFAULT: 'rgb(68, 64, 68)',
        dark: {
          DEFAULT: 'rgb(245, 243, 247)',
        },
      },
    },
  },
  plugins: [require('tailwind-scrollbar')],
  variants: {
    scrollbar: ['rounded'],
  },
};
