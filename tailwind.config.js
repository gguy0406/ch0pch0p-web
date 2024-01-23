/** @type {import('tailwindcss').Config} */
/* eslint-env es6 */
const { reverse } = require('dns');
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
        'budd-reverse': 'linear-gradient(111deg, #d106ae 17.98%, #ffc000 84.27%)',
        'moon-reverse': 'linear-gradient(111deg, #ffc600 17.98%, #4336ee 84.27%)',
        lime: 'linear-gradient(111deg, #10cca7 17.98%, #ffc600 84.27%)',
        'lime-reverse': 'linear-gradient(111deg, #ffc600 17.98%, #10cca7 84.27%)',
        lunar: 'linear-gradient(111deg, #311dcb 17.98%, #fb4831 84.27%)',
        orange: 'linear-gradient(111deg, #ffc000 17.98%, #ff482e 84.27%)',
        spicy: 'linear-gradient(111deg, #ff2c10 17.98%, #00d7ad 84.27%)',
        toxic: 'linear-gradient(111deg, #00d7ad 16.58%, #f0f 84.27%)',
      },
      borderRadius: {
        10: '40px',
      },
      fontFamily: {
        fredoka: ['"Fredoka", sans-serif'],
        monotalic: ['"Monotalic", sans-serif'],
      },
      lineHeight: {
        normal: 'normal',
      },
      margin: {
        15: '60px',
      },
      padding: {
        15: '60px',
      },
      gap: {
        15: '60px',
      },
    },
    screens: {
      tablet: '1024px',
      laptop: '1366px',
      desktop: '1600px',
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
