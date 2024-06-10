/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors : {
        'black-dark' : '#00000050',
        'white-light' : '#FFFFFF30',
        'white-medium' : '#FFFFFF40',
        'neon-blue' : '#2FB8FF',
      }
    },
  },
  plugins: [],
}

