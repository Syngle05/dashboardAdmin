/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      boxShadow: {
        cardShadow:
          "0px 2px 1px -1px rgba(255, 255, 255, 0.2), 0px 1px 1px 0px rgba(255, 255, 255, 0.14), 0px 1px 3px 0px rgba(255, 255, 255, 0.12)",
      },
      colors: {
        themecolor: {
          50: "#fafafa",
          100: "#f5f5f5",
          200: "#eeeeee",
          300: "#e0e0e0",
          400: "#bdbdbd",
          500: "#9e9e9e",
          600: "#757575",
          700: "#616161",
          800: "#424242",
          900: "#212121",
          1000: "#121212",
        },
        secondColor: {
          100: "#B3E5FC",
          200: "#81D4FA",
          300: "#4FC3F7",
          400: "#29B6F6",
          500: "#03A9F4",
          600: "#039BE5",
          700: "#0288D1",
          800: "#0277BD",
          900: "#01579B",
        },
      },
    },
  },
  plugins: [],
};
