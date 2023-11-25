import react from "@vitejs/plugin-react";
import { resolve } from "path"; // Import the resolve function
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"), // Adjusted path for 'src'
      "@server": resolve(__dirname, "../server/src"), // Adjusted path for 'server/src'
    },
  },
});
