import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        vmc: {
          red: "#A91B1B",
          darkRed: "#7A0E0E",
          ink: "#171313",
          body: "#5A5050",
          cream: "#F7F3EC",
          warm: "#EDE5D8",
          gold: "#B87D3A"
        }
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui"],
        serif: ["var(--font-serif)", "Georgia", "serif"]
      },
      boxShadow: {
        soft: "0 20px 60px rgba(23, 19, 19, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
