/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        nb: {
          paper: "var(--nb-paper)",
          ink: "var(--nb-ink)",
          ink2: "var(--nb-ink2)",
          ink3: "var(--nb-ink3)",
          card: "var(--nb-card)",
          chip: "var(--nb-chip)",
          rule: "var(--nb-rule)",
          tape: "var(--nb-tape)",
          nav: "var(--nb-nav)",
          hl1: "var(--nb-hl1)",
          hl2: "var(--nb-hl2)",
          sticky: "var(--nb-sticky)",
          poster: "var(--nb-poster)",
          shadow: "var(--nb-shadow)",
        },
      },
      fontFamily: {
        sans: ["DM Sans", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
        hand: ["Gloria Hallelujah", "cursive"],
      },
      boxShadow: {
        card: "0 14px 26px -18px var(--nb-shadow)",
        lift: "0 22px 34px -20px var(--nb-shadow)",
        chip: "1px 2px 0 var(--nb-rule)",
      },
      animation: {
        "float-1": "doodleFloat1 5.4s ease-in-out infinite",
        "float-2": "doodleFloat2 6.6s ease-in-out 0.8s infinite",
        "float-3": "doodleFloat3 6.1s ease-in-out 0.4s infinite",
        wobble: "doodleWobble 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) both",
        sparkle: "sparkle 0.75s ease-out forwards",
        ping: "dotPing 2.4s cubic-bezier(0, 0, 0.2, 1) infinite",
        scribble: "scribble 0.28s ease-in-out infinite",
      },
      keyframes: {
        doodleFloat1: {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-9px) rotate(1.8deg)" },
        },
        doodleFloat2: {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-11px) rotate(-2.4deg)" },
        },
        doodleFloat3: {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-8px) rotate(1.4deg)" },
        },
        doodleWobble: {
          "0%": { transform: "scale(1) rotate(0deg)" },
          "20%": { transform: "scale(0.9) rotate(-10deg)" },
          "45%": { transform: "scale(1.2) rotate(12deg)" },
          "70%": { transform: "scale(0.95) rotate(-5deg)" },
          "100%": { transform: "scale(1) rotate(0deg)" },
        },
        sparkle: {
          "0%": { opacity: "0", transform: "translate(0, 0) scale(0.4)" },
          "40%": {
            opacity: "1",
            transform: "translate(var(--tx), var(--ty)) scale(1.3)",
          },
          "100%": {
            opacity: "0",
            transform:
              "translate(calc(var(--tx) * 1.5), calc(var(--ty) - 18px)) scale(0.7)",
          },
        },
        scribble: {
          "0%, 100%": { transform: "translate(0, 0) rotate(-8deg)" },
          "50%": { transform: "translate(2px, -3px) rotate(10deg)" },
        },
        dotPing: {
          "0%": { transform: "scale(1)", opacity: "0.55" },
          "80%, 100%": { transform: "scale(2.6)", opacity: "0" },
        },
      },
    },
  },
  plugins: [],
};
