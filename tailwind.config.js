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
        lg: "960px",
        xl: "1080px",
        xxl: "1260px",
        // => @media (min-width: 992px) { ... }
      },
      colors: {
        primary: "#EDF5FF",
        text: "#73879e",
        text_readable: "#5E6E81",
        secondary: "#2acbb6",
        secondary_dark: "#1C8779",
        secondary_light: "#95E5DB",
      },
      boxShadow: {
        cover: "0 0 100px 4000px rgba(0, 0, 0, 0.2)",
      },
    },
  },
  plugins: [],
};
