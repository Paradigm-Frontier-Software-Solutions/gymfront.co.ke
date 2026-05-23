import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: "#eef5fb",
          100: "#d9e8f5",
          600: "#17466f",
          700: "#12385b",
          800: "#0d2a45",
          900: "#071c31",
          950: "#04111f"
        },
        teal: {
          50: "#edfdfa",
          100: "#d2f7f0",
          400: "#2ec4b6",
          500: "#159d93",
          600: "#0f7f79",
          700: "#0f6662"
        },
        charcoal: {
          50: "#f6f7f8",
          100: "#e9ebee",
          500: "#5b6573",
          700: "#333b46",
          800: "#222933",
          900: "#161b22"
        }
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "ui-sans-serif", "system-ui"],
        display: ["var(--font-lora)", "Georgia", "serif"]
      },
      boxShadow: {
        premium: "0 24px 60px rgba(4, 17, 31, 0.14)"
      }
    }
  },
  plugins: []
};

export default config;
