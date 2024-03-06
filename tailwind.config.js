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
  content: ['./src/webapp/**/*.{html,ts}'],
  theme: {
    extend: {
      backgroundColor: {
        app: '#09090b',
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
        beauty: linearGradientFactory(electricPurple, paleRobinEggBlue),
        'blue-sky': linearGradientFactory(vividCerulean, ultramarineBlue),
        budd: linearGradientFactory(tangerineYellow, richElectricPink),
        'budd-reverse': linearGradientFactory(richElectricPink, tangerineYellow),
        dawn: linearGradientFactory(purple, amber),
        freeze: linearGradientFactory(paleRobinEggBlue, ultramarineBlue),
        'moon-reverse': linearGradientFactory(amber, ultramarineBlue),
        lime: linearGradientFactory(caribbeanGreen, amber),
        'lime-reverse': linearGradientFactory(amber, caribbeanGreen),
        lunar: linearGradientFactory(redOrange, ultramarineBlue),
        pimple: linearGradientFactory(paleRobinEggBlue, redOrange),
        orange: linearGradientFactory(amber, redOrange),
        toxic: linearGradientFactory(caribbeanGreen, rosePink),
      },
      borderRadius: {
        '2lg': '0.625rem',
        '2xxl': '1.25rem',
        '3xxl': '1.875rem',
        '5xl': '2.5rem',
      },
      colors: {
        amber: amber,
        'electric-purple': electricPurple,
        'school-bus-yellow': schoolBusYellow,
        red: red,
      },
      fontFamily: {
        fredoka: ['"Fredoka", sans-serif'],
        monotalic: ['"Monotalic", sans-serif'],
      },
      lineHeight: {
        normal: 'normal',
      },
      spacing: {
        15: '3.75rem',
      },
      textUnderlineOffset: {
        3: '3px',
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
        '.bg-clip-text': {
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
          'background-clip': 'text',
        },
        '.hide-scrollbar': {
          '-ms-overflow-style': 'none' /* IE and Edge */,
          'scrollbar-width': 'none' /* Firefox */,
          '&::-webkit-scrollbar': {
            display: 'none' /* Chrome, Safari and Opera */,
          },
        },
      });
    }),
  ],
};
