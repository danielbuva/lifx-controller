import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  plugins: [],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      backgroundColor: {
        theme: "rgb(var(--background-end-rgb))",
      },
      borderColor: {
        theme: "rgb(var(--background-end-rgb))",
      },
      boxShadow: {
        theme: "var(--theme-shadow)",
      },
    },
  },
};
export default config;
