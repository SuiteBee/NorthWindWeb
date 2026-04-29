import path from "path";
import { defineConfig } from "vite"
import { viteStaticCopy } from "vite-plugin-static-copy"
import react from "@vitejs/plugin-react"

// https://vite.dev/config/
export default defineConfig({
  base: "/NorthWindWeb/",
  resolve: {
    alias: {
      "@root": path.resolve(__dirname, "./src"),
    },
  },
  plugins: [
    react(), 
    viteStaticCopy({
        targets: [
            {
                src: "node_modules/@npiesco/absurder-sql/pkg/absurder_sql_bg.wasm",
                dest: "node_modules/.vite/deps"
            }
        ]
    })
  ],
  optimizeDeps: {
    exclude: ["node_modules/@npiesco/absurder-sql/pkg/absurder_sql_bg.wasm", "absurder_sql_bg"]
  },
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
