import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['index.ts', 'src/**/*'],
  format: ['esm'],
  platform: 'node',
  target: 'node20',
  outDir: 'dist',
  clean: true,
  bundle: false,
  minify: true
})
