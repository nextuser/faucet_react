import { defineConfig } from "vite";
import tailwindcss from "tailwindcss";
import path from 'path'
import react from "@vitejs/plugin-react-swc";
import {expressPlugin} from "./server/index";

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

});




