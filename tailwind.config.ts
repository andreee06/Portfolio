import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./sections/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "foreground-muted": "var(--foreground-muted)",
        accent: "var(--accent)",
        "accent-hover": "var(--accent-hover)",
        body: "#b9b9b9",
      },
      fontFamily: {
        bonheur: ["var(--font-bonheur)", "cursive"],
        bebas: ["var(--font-bebas)", "system-ui"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      keyframes: {
        "scroll-line": {
          "0%": { transform: "translateY(-100%)", opacity: "0" },
          "20%": { opacity: "1" },
          "80%": { opacity: "1" },
          "100%": { transform: "translateY(calc(100% + 16px))", opacity: "0" },
        },
      },
      animation: {
        "scroll-line": "scroll-line 1.8s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
