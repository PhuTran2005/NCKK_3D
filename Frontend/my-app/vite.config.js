import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ["**/*.gltf", "**/*.glb"],
  server: {
    proxy: {
      "/auth": {
        target: "https://version-web-3d-64-5.onrender.com",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
