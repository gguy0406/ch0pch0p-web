/** @type {import('tailwindcss').Config} */
/* eslint-env es6 */
const plugin = require('tailwindcss/plugin');

const purple = '#ae00a8';
const ultramarineBlue = '#2d1fc3';
const darkViolet = '#3c1482';
const fawn = '#9f503d';
const darkKhaki = '#977937';
const richElectricPink = '#d70088';
const red = '#ff0036';
const rosePink = '#ff0085';
const redOrange = '#ff2c10';
const amber = '#ffb000';
const tangerineYellow = '#ffc800';
const schoolBusYellow = '#ffd13d';
const electricPurple = '#f269ff';
const lightApricot = '#f9cdb9';
const vividCerulean = '#00c1e9';
const caribbeanGreen = '#00ceb4';
const paleRobinEggBlue = '#a3e8cf';
const lavenderBlush = '#ffeef2';

function linearGradientFactory(from, to) {
  return `linear-gradient(111deg, ${from} 17.98%, ${to} 84.27%)`;
}

module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      backgroundColor: {
        app: '#000',
        purple: purple,
        'ultramarine-blue': ultramarineBlue,
        'dark-violet': darkViolet,
        fawn: fawn,
        'dark-khaki': darkKhaki,
        'rich-electric-pink': richElectricPink,
        red: red,
        'rose-pink': rosePink,
        'red-orange': redOrange,
        amber: amber,
        'tangerine-yellow': tangerineYellow,
        'school-bus-yellow': schoolBusYellow,
        'electric-purple': electricPurple,
        'light-apricot': lightApricot,
        'vivid-cerulean': vividCerulean,
        'caribbean-green': caribbeanGreen,
        'pale-robin-egg-blue': paleRobinEggBlue,
        'lavender-blush': lavenderBlush,
      },
      backgroundImage: {
        'budd-reverse': linearGradientFactory(richElectricPink, tangerineYellow),
        'moon-reverse': linearGradientFactory(amber, ultramarineBlue),
        lime: linearGradientFactory(caribbeanGreen, amber),
        orange: linearGradientFactory(amber, redOrange),
        toxic: linearGradientFactory(caribbeanGreen, rosePink),
      },
      borderRadius: {
        5: '20px',
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
