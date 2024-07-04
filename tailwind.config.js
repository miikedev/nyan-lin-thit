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
    extend: { 
      // screens: {
      //   'sm': '320px',   // Small mobile devices
      //   'md': '480px',   // Medium mobile devices
      //   'lg': '768px',   // Small tablets and large mobile devices
      //   'xl': '1024px',  // Tablets and small desktops
      //   '2xl': '1200px', // Standard desktops and larger tablets
      //   '3xl': '1440px', // Large desktops
      //   '4xl': '1600px'  // Extra large desktops
      // }
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
