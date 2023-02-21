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
      textColor: {
        DEFAULT: 'rgb(68, 64, 68)',
        secondary: 'rgb(92, 88, 92)',
        dark: {
          DEFAULT: 'rgb(245, 243, 247)',
          secondary: 'rgb(123, 122, 123)',
        },
      },
      backgroundColor: {
        DEFAULT: 'rgb(255, 255, 255)',
        highlight: 'rgb(241 245 249)',
        loader: 'rgb(226 232 240)',
        dark: {
          DEFAULT: 'rgb(18, 12, 24)',
          highlight: 'rgb(36, 24, 47)',
          loader: 'rgb(36, 24, 47)',
        },
      },
      borderColor: {
        DEFAULT: 'rgb(229, 231, 235)',
        dark: {
          DEFAULT: 'rgb(49, 39, 61)',
        },
      },
    },
  },
  plugins: [],
};
