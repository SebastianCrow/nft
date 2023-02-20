const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto Flex', ...defaultTheme.fontFamily.sans],
      },
      textColor: {
        DEFAULT: 'rgb(23, 23, 23)',
        secondary: 'rgb(78, 78, 78)',
      },
      backgroundColor: {
        DEFAULT: 'rgb(255, 255, 255)',
        highlight: 'rgb(241 245 249)',
        loader: 'rgb(226 232 240)',
      },
    },
  },
  plugins: [],
};
