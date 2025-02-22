import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: path.resolve(__dirname, '../../dist/webview'),
    emptyOutDir: true,
    lib: {
      entry: path.resolve(__dirname, 'src/main.ts'),
      name: 'webview',
      fileName: 'main',
      formats: ['es']
    },
    rollupOptions: {
      output: {
        entryFileNames: 'main.js', // Ensure consistent output name
        chunkFileNames: '[name].js',
        assetFileNames: '[name].[ext]'        
      }
    }
  },
  define: {
    'process.env': {}    
  }
})
