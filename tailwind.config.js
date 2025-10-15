/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./common/**/*.{js,ts,jsx,tsx}",
    "./layouts/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "main-bg": "#FBFFFC",
        "main-color": "#01C78D",
        "main-logo": "#4169B8",
        "selected-line": "#6BC6BC",
        "selected-bg": "#F2F8FF",
        "mileage-font": "#9D90B1",
        "mileage-bg": "#F8ECFF",
        "point-positive": "#0000FF",
        "point-negative": "#FF0000",
        "main-font": "#2C2C2C",
        "sub-font": "#C5C5C5",
        "unselected-font": "#595959",
        "cart": "#C4F6EF",
      },
      fontFamily: {
        recipe: ["Recipekorea", "pretendard", "sans-serif"],
      },
    },
  },
  plugins: [],
};

