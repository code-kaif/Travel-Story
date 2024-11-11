/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#4ec6f2",
        secondary: "#EF863E",
      },
      backgroundImage: {
        "login-bg-img": "url('./src/assets/goa.jpeg')",
        "signup-bg-img": "url('./src/assets/signup.jpg')",
      },
    },
  },
  plugins: [],
};
