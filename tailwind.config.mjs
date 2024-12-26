import { yellow } from '@mui/material/colors';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
          transparent: "transparent",
          black: {
            900 : "#000000",
            500: "#4F5665",
            600: "#0B132A",
          },
          orange: {
            100: "#FFECEC",
            500: "#F53855",
          },
          green: {
            500: "#2FAB73",
            main : "#0DB760"
          },
          white: {
            300: "#F8F8F8",
            500: "#fff",
          },
          gray: {
            100: "#EEEFF2",
            400: "#AFB5C0",
            500: "#DDDDDD",
          },
          yellow :{
            main : "#FDD835"
          }
      },
    },
  },
  plugins: [],
};
