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
        ink: "#182333",
        steel: "#4d6070",
        mint: "#24786d",
        line: "#d7ded8",
        paper: "#f4f6f3"
      },
      boxShadow: {
        soft: "0 18px 40px rgba(24, 35, 51, 0.10)"
      }
    }
  },
  plugins: []
};

export default config;
