/** @type {import('tailwindcss').Config} */
export default {
  // daisyui: {
  //   themes: ["lemonade"],
  // },
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
