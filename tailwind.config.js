/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "oklch(var(--background) / <alpha-value>)",
        foreground: "oklch(var(--foreground) / <alpha-value>)",
        // Add other CSS variables you use if needed
      },
      borderColor: {
        border: "oklch(var(--border) / <alpha-value>)",
      },
      ringColor: {
        ring: "oklch(var(--ring) / <alpha-value>)",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("daisyui"),
  ],
  daisyui: {
    themes: false, // disable default themes if using your own tokens
  },
};
