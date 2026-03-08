import { defineConfig } from '@nelsonlaidev/eslint-config'

export default defineConfig({
  ignores: ['apps/**', 'packages/**', 'node_modules', 'dist', 'build', 'pnpm-lock.yaml']
})
