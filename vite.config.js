// const path = require('path')
// const { defineConfig } = require('vite')

// const MODULE_NAME = 'jslib'
// module.exports = defineConfig({
//   build: {
//     sourcemap: true,
//     lib: {
//       entry: path.resolve(__dirname, 'libs/main.js'),
//       formats: ['es', 'cjs', 'umd', 'iife'],
//       name: MODULE_NAME,
//       fileName: MODULE_NAME,
//       // fileName: (format) => `${MODULE_NAME}.${format}.js`
//     }
//   },
//   define: {
//     'process.env': process.env
//   }
// })

// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: 'directives/index.js',
      name: 'PetiteVueDirectives',
      fileName: (format) =>
        format === 'iife' ? 'petite-vue-directives.iife.js' : 'petite-vue-directives.es.js',
      formats: ['es', 'iife']
    },
    rollupOptions: {
      external: ['petite-vue'],
      output: {
        globals: {
          'petite-vue': 'PetiteVue'
        }
      }
    }
  }
})