/*
 * @Author:  
 * @Date: 2024-01-13 22:42:06
 * @LastEditors:  
 * @LastEditTime: 2024-03-13 18:15:15
 * @FilePath: /coral-frontend/tailwind.config.js
 */
module.exports = {
  content: [
    // './public/**/*.html',
    './src/**/*.{js,jsx,ts,tsx,css,scss}',
  ],
  darkMode: 'class', // 'media' is the default, change to 'class' if you want to use dark mode in with class names
  theme: {
    extend: {
      colors: {
        yellowFF: "#FFBC00",
        green_big: "#5FB429",
        green_start: "#5CFFA7",
        green_end: "#00FF75",
        green00: "#00FF75",
        green2A: "#2A965C",
        green5F: "#5FB429",
        green47: "#476855",
        green2a: "#2a784f",
        green15: "#158d4b",
        green33: "#003318",
        black18: "#181818",
        black01: "#010101",
        black92: "#929292",
        black44: "#444444",
        redFA: "#FA3547",
        redFF: "#FF4044"
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
