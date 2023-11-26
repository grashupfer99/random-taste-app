import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

/* -------------------------------------------------------------------------- */

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    base: "/random-taste-app/",
    plugins: [react(), tsconfigPaths()],
    server: {
      host: "0.0.0.0",
      port: 3000,
    },
  };
});
