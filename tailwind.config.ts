import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#09090B",
        "bg-elevated": "#111116",
        accent: "#F97316",
        "accent-light": "#FB923C",
        border: "rgba(255,255,255,0.07)",
        muted: "#71717A",
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      animation: {
        "marquee-left": "marquee-left 30s linear infinite",
        "marquee-right": "marquee-right 30s linear infinite",
        "fade-up": "fade-up 0.5s ease-out",
        "float": "float 8s ease-in-out infinite",
        "float-delayed": "float 10s ease-in-out 3s infinite",
        "pulse-glow": "pulse-glow 4s ease-in-out infinite",
        "spin-slow": "spin 20s linear infinite",
        "border-glow": "border-glow 3s ease-in-out infinite",
      },
      keyframes: {
        "marquee-left": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-right": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px) scale(1)" },
          "50%": { transform: "translateY(-30px) scale(1.05)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
        "border-glow": {
          "0%, 100%": { "border-color": "rgba(249,115,22,0.3)" },
          "50%": { "border-color": "rgba(249,115,22,0.8)" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "accent-gradient": "linear-gradient(135deg, #F97316 0%, #FBBF24 100%)",
        "dark-gradient": "linear-gradient(180deg, #09090B 0%, #111116 100%)",
      },
      boxShadow: {
        "glow-sm": "0 0 20px rgba(249,115,22,0.15)",
        "glow-md": "0 0 40px rgba(249,115,22,0.2)",
        "glow-lg": "0 0 80px rgba(249,115,22,0.25)",
        "card": "0 0 0 1px rgba(255,255,255,0.06), 0 4px 24px rgba(0,0,0,0.4)",
      },
    },
  },
  plugins: [],
};
export default config;
