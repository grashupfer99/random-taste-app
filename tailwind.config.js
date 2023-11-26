/** @type {import('tailwindcss').Config} */
export default {
  daisyui: {
    themes: ["light", "dark"],
  },
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
