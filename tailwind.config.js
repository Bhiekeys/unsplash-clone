/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sora: ['sora', 'Arial', 'sans-serif'],
        lora: ['lora', 'Arial', 'serif'],
      },
    },
  },
  plugins: [],
};
