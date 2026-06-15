/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "Pretendard", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        slide: "0 28px 80px rgba(15, 23, 42, 0.22)",
      },
    },
  },
  plugins: [],
};
