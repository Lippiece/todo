/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import svgrPlugin from "vite-plugin-svgr"

// https://vitejs.dev/config/
export default defineConfig({
  base: "/todo/",
  server: {
    port: 3000,
    proxy: {
      "/api": "https://todo-app-yrhz.onrender.com/",
    },
  },
  plugins: [
    react(),
    svgrPlugin({
      svgrOptions: {
        icon: true,
      },
    }),
  ],
  build: {
    outDir: "./build",
  },
  test: {
    globals: true,
    environment: "jsdom",
    css: true,
    setupFiles: "./src/test/setup.ts",
  },
})
