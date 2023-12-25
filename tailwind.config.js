/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      backgroundImage: {
        lunar: "linear-gradient(111deg, #311DCB 17.98%, #FB4831 84.27%)",
      },
    },
  },
  plugins: [],
};
