/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/app/**/*.{js,jsx}",
      "./src/components/**/*.{js,jsx}",
    ],
    theme: {
      extend: {
        fontSize: {
          'xxs': '0.625rem', 
        }
      },
    },
    plugins: [],
  }
  