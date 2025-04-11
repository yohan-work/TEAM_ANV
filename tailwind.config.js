/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#00C1DE",
        secondary: "#F4F5F7",
        accent: "#FF5D5D",
        neutral: "#1A1A1A",
        "neutral-light": "#F9F9F9",
        gray: {
          50: "#F9FAFB",
          100: "#F3F4F6",
          200: "#E5E7EB",
          300: "#D1D5DB",
          400: "#9CA3AF",
          500: "#6B7280",
          600: "#4B5563",
          700: "#374151",
          800: "#1F2937",
          900: "#111827",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  safelist: [
    "bg-neutral-light",
    "text-neutral",
    "bg-primary",
    "bg-secondary",
    "text-white",
    "hover:bg-gray-200",
    "hover:bg-blue-600",
    "bg-gray-50",
    "bg-gray-100",
    "bg-gray-200",
    "text-gray-500",
    "text-gray-900",
  ],
  plugins: [],
};
