/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    colors: {
      "bgDark": "#22181C",
      "bgLight": "#D9D9D9",
      "primaryRed": "#5A0001",
      "tomato": "#F13030"
    },
    fontFamily: {
      "oswald": ["Oswald Variable", "monospace", "sans-serif"]
    }
  }
}