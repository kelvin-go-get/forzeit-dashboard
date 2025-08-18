/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts}"],
  theme: {
    extend: {
      boxShadow: {
        glow: "0 0 10px rgba(255,255,255,0.2), 0 0 20px rgba(255,255,255,0.1)",
      },
    },
  },
  plugins: [],
};
