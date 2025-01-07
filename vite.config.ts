import { defineConfig } from "vite";
import tailwindcss from "tailwindcss";
import path from 'path'
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  css:{
    postcss:{
      plugins:[tailwindcss()]
    }
  },
  server: { 
    proxy: {
      '/v1/gas': {
        target: 'http://localhost:3001/v1/gas',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/v1\/gas/, ''),
      }
    }
  }
});
