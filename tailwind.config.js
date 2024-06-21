// tailwind.config.js
import { nextui } from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: { screens:{
      'lg':'1133px',
      '3xl':'1800px',
      '4xl':'2100px'
    }
  },
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {
          // ...
          colors: {
            background: "#ffffff", // or DEFAULT
            foreground: "#dfdfdf", // or 50 to 900 DEFAULT
            primary: {
              //... 50 to 900
              foreground: "#dfdfdf",
              DEFAULT: "#0c5595",
            },
            secondary: {
              foreground: "#dfdfdf",
              DEFAULT: "#2a6aa4"
            },
            // ... rest of the colors
          },
        },
        dark: {
          // ...
          colors: {},
        },
        // ... custom themes
      },
    }),
  ],
};
