import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "directives/index.js",
      name: "PetiteVueDirectives",
      fileName: (format) =>
        format === "iife"
          ? "petite-vue-directives.iife.js"
          : "petite-vue-directives.es.js",
      formats: ["es", "iife"],
    },
    rollupOptions: {
      external: ["petite-vue"],
      output: {
        globals: {
          "petite-vue": "PetiteVue",
        },
      },
    },
  },
});
