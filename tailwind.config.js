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
    fontFamily: {
      poppins: ["Poppins-400", "sans-serif"],
      poppins_bold: ["Poppins-700", "sans-serif"],
      kanit: ["Kanit-400", "sans-serif"],
      openSans: ["OpenSans-400", "sans-serif"],
    },
    // screens: {
    //   'sm': '640px',
    //   // => @media (min-width: 640px) { ... }

    //   'md': '768px',
    //   // => @media (min-width: 768px) { ... }

    //   'lg': '1024px',
    //   // => @media (min-width: 1024px) { ... }

    //   'xl': '1280px',
    //   // => @media (min-width: 1280px) { ... }

    //   '2xl': '1536px',
    //   // => @media (min-width: 1536px) { ... }
    // }
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {
          // ...
          fontFamily: {
            'poppins-700': ["Poppins-700", "sans-serif"],
            'poppins-400': ["Poppins-400", "sans-serif"],
            'kanit-400': ["Kanit-400", "sans"],
          },
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
