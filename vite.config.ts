import path from "path";
// import react from "@vitejs/plugin-react";
import react from "@vitejs/plugin-react-swc";

import { defineConfig } from "vite";

export default defineConfig(({ command }) => {
  const isProd = command === "build";

  return {
    // base: isProd ? basenameProd : "",
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    define: {
      // global: {
      //   basename: isProd ? basenameProd : "",
      // },
    },
    assetsInclude: [
      // "**/*.json",
      "**/*.gltf",
      "**/*.glb",
      "**/*.jpeg",
      "**/*.png",
      "**/*.lottie",
      "**/*.mp3",
      "**/*.cube",
      "**/*.hdr",
      "**/*.glsl",
    ],
  };
});
