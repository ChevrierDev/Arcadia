/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
   "./public/**/*.js",
   "./src/**/*.ejs"
  ],
  theme: {
    extend: {
      colors:{
        primary:{
          50:"#FFFCEB",
          100:"#FBF6EE"
        },
        secondary:{
          50:"#C1F2B0",
          100:"#65B741"
        },
        icon:"#FFB534"
      },
      fontFamily:{
        "neucha": ["Neucha", "cursive"],
        "muli": ["muli", "sans-serif"]
      }
    },
  },
  plugins: [],
}