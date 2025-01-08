import { defineConfig } from "vite";
import tailwindcss from "tailwindcss";
import path from 'path'
import react from "@vitejs/plugin-react-swc";
import {expressPlugin} from "./src/server/index";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),expressPlugin()],
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
        target: 'https://faucet-rpc.vercel.app/v1/gas',
        changeOrigin: true,
        secure: false,
        headers: {                  
          Referer: 'http://localhost:5173'
        },
        rewrite: (path) => path.replace(/^\/v1\/gas/, ''),
      }
    }
  }
});




