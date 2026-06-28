/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ng: {
          bg: "var(--ng-bg)",
          bg2: "var(--ng-bg2)",
          bg3: "var(--ng-bg3)",
          fg: "var(--ng-fg)",
          text2: "var(--ng-text2)",
          text3: "var(--ng-text3)",
          border: "var(--ng-border)",
          border2: "var(--ng-border2)",
          terminal: "var(--ng-terminal)",
          muted: "var(--ng-muted)",
          "muted-l": "var(--ng-muted-l)",
          accent: "var(--ng-accent)",
          "accent-fg": "var(--ng-accent-fg)",
          surface: "var(--ng-surface)",
          "surface-hover": "var(--ng-surface-hover)",
          "terminal-out": "var(--ng-terminal-out)",
          "terminal-out2": "var(--ng-terminal-out2)",
        },
      },
      fontFamily: {
        sans: ["DM Sans", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },
      animation: {
        fadeUp: "fadeUp 0.5s ease both",
        fadeIn: "fadeIn 0.5s ease both",
        scrollX: "scrollX 22s linear infinite",
        termBlink: "termBlink 1s step-end infinite",
        glowPulse: "glowPulse 4s ease infinite",
        wave: "wave 1.8s ease infinite",
        cardIn: "cardIn 0.3s ease both",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        scrollX: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        termBlink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        glowPulse: {
          "0%, 100%": { opacity: "0.12" },
          "50%": { opacity: "0.2" },
        },
        wave: {
          "0%, 100%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(20deg)" },
          "75%": { transform: "rotate(-10deg)" },
        },
        cardIn: {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
