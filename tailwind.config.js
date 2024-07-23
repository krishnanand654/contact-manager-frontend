/** @type {import('tailwindcss').Config} */
import { nextui } from "@nextui-org/react"

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.8s ease-in-out',
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()]
}

