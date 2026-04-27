import path from "path";
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

// https://vite.dev/config/
export default defineConfig({
  base: "/NorthWindWeb/",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  plugins: [react()],
  server: {
    cors: {
      //Backend api running locally
      origin: "http://localhost:5000/",
    },
  },
  esbuild: {
    jsxFactory: "React.createElement",
    jsxFragment: "React.Fragment",
  },
  css: {
    modules: {
      localsConvention: "camelCaseOnly",
    }
  }
})
