/** @type {import('tailwindcss').Config} */
import { addDynamicIconSelectors } from "@iconify/tailwind";
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        shoea: "#212529",
      },
      backgroundImage: {
        "welcome-img":
          "linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.80) 100%), url('/images/welcome_wallpaper.jpg')",
      },
      boxShadow: {
        custom: "rgba(0, 0, 0, 0.1)0px 4px 12px",
      },
    },
  },
  plugins: [addDynamicIconSelectors(), require("flowbite/plugin")],
};
