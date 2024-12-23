import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import dts from 'vite-plugin-dts';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), dts()],
  css: {
    postcss: {
      plugins: [tailwindcss(), autoprefixer()],
    },
  },
  // resolve: {
  //   alias: {
  //     '@': path.resolve(__dirname, './src'),
  //     '@/components': path.resolve(__dirname, './src/components'),
  //     '@/utils': path.resolve(__dirname, './src/utils'),
  //     '@/zustand': path.resolve(__dirname, './src/zustand'),
  //   },
  // },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'index.ts'),
      name: 'next-priceblock-viewer-package',
      fileName: (format) => 'index' + format + 'js',
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'zustand'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          zustand: 'zustand',
        },
      },
    },
    sourcemap: true,
    emptyOutDir: true,
  },
});
