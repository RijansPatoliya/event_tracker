import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  base: '/', // ✅ Render ke liye required
  plugins: [react()],
  server: {
    port: 5173,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@chakra-ui/react": "@chakra-ui/react/dist/index.mjs",
    },
  },
});
