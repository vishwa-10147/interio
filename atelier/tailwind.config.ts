import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ground: "#14140F",
        surface: "#1C1B15",
        surface2: "#232219",
        stone: "#EDE7DA",
        stonemuted: "#A69C87",
        line: "#3A382E",
        brass: "#B08D57",
        brassdeep: "#6B5335",
        brasslight: "#D9B77F",
      },
      fontFamily: {
        display: [
          "'Fraunces'",
          "ui-serif",
          "Georgia",
          "'Times New Roman'",
          "serif",
        ],
        body: [
          "'Inter'",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "sans-serif",
        ],
        mono: ["'IBM Plex Mono'", "ui-monospace", "'SF Mono'", "monospace"],
      },
      letterSpacing: {
        widest2: "0.35em",
      },
    },
  },
  plugins: [],
};
export default config;
