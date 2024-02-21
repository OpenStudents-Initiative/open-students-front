import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react-swc";
import dotenv from "dotenv";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on the current mode
  dotenv.config({ path: `./.env.${mode}` });

  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
