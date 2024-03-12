/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './public/index.html',
    "./src/dist/**/*.js",
    "./src/views/*.html",
    "./src/dist/routing/routing.js",

 ],
  theme: {
    extend: {
      colors: {
        "dark-blue-bg": "#000842",
        "dark-blue-text":"#0C21C1",
        "blue-btn":"#0C21C1",
        "label":"#999",
        "grey-custom":"#B5B5B5"
      },
      gridTemplateColumns: {
        loginParent: "55% auto",
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      minHeight:{
        'input':'61.89px'
      }
    },
  },
  plugins: [],
};
