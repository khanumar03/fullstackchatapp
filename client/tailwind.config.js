/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      padding: {
        "38px": "7rem",
      },
      inset: {
        "50%": "50%",
        "100px": "100px",
      },
      translate: {
        "50%": "50%",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
