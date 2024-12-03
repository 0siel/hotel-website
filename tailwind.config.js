/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Include all React files
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        green: "#43523a",
        gold: "#a79c69",
        brown: "#493a2d",
        white: "#fffcf3",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
