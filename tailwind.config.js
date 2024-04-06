/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        shoea: "#212529",
      },
      backgroundImage: {
        "welcome-img":
          "linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.80) 100%), url('/images/welcome_wallpaper.jpg')",
      },
    },
  },
  plugins: [],
};
