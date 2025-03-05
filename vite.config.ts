import { ConfigEnv, defineConfig, UserConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import dts from 'vite-plugin-dts';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

// https://vitejs.dev/config/
export default defineConfig((env: ConfigEnv): UserConfig => {
  console.info('ConfigEnv', env);
  const config: UserConfig = {
    plugins: [react(), dts()],
    css: {
      postcss: {
        plugins: [tailwindcss(), autoprefixer()],
      },
    },
    build: {
      lib: undefined,
      rollupOptions: {},
      sourcemap: true,
      emptyOutDir: true,
    },
  };

  if (process.env.BUILD_TYPE == 'build_lib') {
    config.build = config.build ?? {};
    config.build.lib = {
      entry: path.resolve(__dirname, 'index.ts'),
      name: 'next-priceblock-viewer-package',
      fileName: (format: string) => {
        console.log('\n\nFORMAT:', format);
        return 'next-priceblock-viewer' + (format == 'umd' ? '.umd.cjs' : '.js');
      },
    };

    config.build.rollupOptions = {
      external: ['react', 'react-dom', 'zustand'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          zustand: 'zustand',
        },
      },
    };
  }

  return config;
});
