/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "blue-light": "rgba(193, 206, 254, 0.63)",
      },
      spacing: {
        "100px": "100px",
      },
    },
  },
  plugins: [],
}
