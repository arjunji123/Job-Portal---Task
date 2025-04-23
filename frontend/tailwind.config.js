import { defineConfig } from "tailwindcss";

export default defineConfig({
  content: [
    "./index.html",
    "./src/*/.{js,ts,jsx,tsx}", // Ensure your React components are included here
  ],
  theme: {
    extend: {},
  },
  plugins: [],
});
