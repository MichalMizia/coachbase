/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontSize: {
        //       --font-size-1: clamp(2rem, 1.7993rem + 0.8451vw, 2.75rem);
        // --font-size-2: clamp(1.8rem, 1.6261rem + 0.7324vw, 2.45rem);
        // --font-size-3: clamp(1.6rem, 1.4662rem + 0.5634vw, 2.1rem);
        // --font-size-4: clamp(1.4rem, 1.293rem + 0.4507vw, 1.8rem);
        // --font-size-5: clamp(1.2rem, 1.1331rem + 0.2817vw, 1.45rem);
        // --font-size-6: clamp(0.9rem, 0.8732rem + 0.1127vw, 1rem);
        // --font-size-body: clamp(1rem, 0.9599rem + 0.169vw, 1.15rem);
        h1: "clamp(2rem, 1.7993rem + 0.8451vw, 2.75rem)",
        h2: "clamp(1.8rem, 1.6261rem + 0.7324vw, 2.45rem)",
        h3: "clamp(1.6rem, 1.4662rem + 0.5634vw, 2.1rem)",
        h4: "clamp(1.2rem, 1.1331rem + 0.2817vw, 1.45rem)",
        h5: "clamp(1.2rem, 1.1331rem + 0.2817vw, 1.45rem)",
        h6: "clamp(0.9rem, 0.8732rem + 0.1127vw, 1rem)",
        body: "clamp(1rem, 0.9599rem + 0.169vw, 1.15rem)",
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        bg: "#EDF5FF",
        text: "#73879e",
        text_readable: "#5E6E81",
        secondary_custom: "#2acbb6",
        indigo_custom: "#602bf8",
        secondary_dark: "#1C8779",
        secondary_light: "#95E5DB",
      },
      // borderRadius: {
      //   lg: "var(--radius)",
      //   md: "calc(var(--radius) - 2px)",
      //   sm: "calc(var(--radius) - 4px)",
      // },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        "timed-spin": {
          to: {
            transform: "rotate(720deg)",
          },
        },
        "animate-logo": {
          "50%": { transform: "scale(1.3)", opacity: "0.5" },
          "75%": {
            transform: "scale(1.3)",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "timed-spin": "timed-spin 2000ms forwards linear",
        logo: "animate-logo 2000ms cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      screens: {
        xs: "420px",
        md: "670px",
        lg: "960px",
        xl: "1080px",
        xxl: "1260px",
        nav: "800px",
        // => @media (min-width: 992px) { ... }
      },
      boxShadow: {
        cover: "0 0 100px 4000px rgba(0, 0, 0, 0.2)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
