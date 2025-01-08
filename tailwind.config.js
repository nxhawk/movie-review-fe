/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "default-movie": "url('./src/assets/images/default_movie.jpg')",
        "user-background": "url('./src/assets/images/user-background.svg')",
      },
    },
  },
  plugins: [],
};
