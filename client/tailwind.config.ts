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
        hue: "linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%);",
        kelvin: "linear-gradient(to right, #F0A272, #E0E4FF)",
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
