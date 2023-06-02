/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      screens: {
        xs: "420px",
        md: "670px",
        lg: "900px",
        xl: "1080px",
        // => @media (min-width: 992px) { ... }
      },
      colors: {
        primary: "#EDF5FF",
        text: "#73879e",
        secondary: "#2dd4bf",
      },
    },
  },
  plugins: [],
};