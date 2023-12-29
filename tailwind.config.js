/** @type {import('tailwindcss').Config} */
/* eslint-env es6 */
const plugin = require('tailwindcss/plugin');

module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      backgroundColor: {
        app: '#1a1a1a',
      },
      backgroundImage: {
        budd: 'linear-gradient(111deg, #ffc000 17.98%, #d106ae 84.27%)',
        lime: 'linear-gradient(111deg, #10cca7 17.98%, #ffc600 84.27%)',
        lunar: 'linear-gradient(111deg, #311dcb 17.98%, #fb4831 84.27%)',
        toxic: 'linear-gradient(111deg, #00d7ad 16.58%, #ff00ff 84.27%)',
      },
      fontFamily: {
        fredoka: ['"Fredoka", sans-serif'],
        monotalic: ['"Monotalic", sans-serif'],
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.hide-scrollbar': {
          '-ms-overflow-style': 'none' /* IE and Edge */,
          'scrollbar-width': 'none' /* Firefox */,
          '&::-webkit-scrollbar': {
            display: 'none' /* Chrome, Safari and Opera */,
          },
        },
        '.bg-clip-text': {
          'background-clip': 'text',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
        },
      });
    }),
  ],
};
