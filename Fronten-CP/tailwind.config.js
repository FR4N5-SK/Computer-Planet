/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'azul-brillante': "#007BFF",
        'azul-claro': "#A3C1DA",
        'azul-oscuro': "#0056B3",
        'gris-neutro': "#F5F5F5",
        'blanco': "#FFFFFF",
        'naranja-suave': "#FFA500",
        'negro': "#000000"
      },
      fontFamily:{
        'montserrat': ["Montserrat", "serif"]
      }
    },
  },
  plugins: [],
}

