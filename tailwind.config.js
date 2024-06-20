/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  // theme: {
  //   extend: {
  //     backgroundImage: {
  //       'hero': "url('/src/assets/home-hero.png')",
  //       'footer-texture': "url('/img/footer-texture.png')",
  //     }
  //   },
  // },
  plugins: [
    nextui({
      prefix: "nextui", // prefix for themes variables
      addCommonColors: false, // override common colors (e.g. "blue", "green", "pink").
      defaultTheme: "light", // default theme from the themes object
      defaultExtendTheme: "light",
      themes: {
        light: {
          colors: {
            background: "#FFFF", // or DEFAULT
            foreground: "#11181C", // or 50 to 900 DEFAULT
            primary: {
              //... 50 to 900
              foreground: "#212121",
              DEFAULT: "#0c5595",
            },
            secondary: {
              foreground: "#212121",
              DEFAULT: "#ffffff"
            },
            // ... rest of the colors
          },
        },
        dark: {
          colors: {
            background: "#212121", // or DEFAULT
            foreground: "#ECEDEE", // or 50 to 900 DEFAULT
            primary: {
              //... 50 to 900
              foreground: "#FFFFFF",
              DEFAULT: "#000000",
            },
            
          },
        }
      }
      
    })
  ],
}

