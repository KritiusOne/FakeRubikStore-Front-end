/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    "./node_modules/tailwind-datepicker-react/dist/**/*.js"
  ],
  prefix: "",
  theme: {
    extend:{
      colors: {
        "bgDark": "#22181C",
        "bgLight": "#D9D9D9",
        "primaryRed": "#5A0001",
        "tomato": "#F13030",
        "green": "#0A7510"
      },
      fontFamily: {
        "oswald": ["Oswald Variable", "monospace", "sans-serif"]
      },
      gridTemplateColumns: {
        "auto": "repeat(auto-fit, minmax(300px, 1fr))"
      },
      gridTemplateRows: {
        "auto": "repeat(auto-fit, minmax(300px, 350px))"
      },
    }
  }
}