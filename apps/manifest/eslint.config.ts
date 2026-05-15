import { defineConfig } from '@nelsonlaidev/eslint-config'

export default defineConfig({
  overrides: {
    typescript: {
      rules: ['error', '@typescript-eslint/no-non-null-assertion']
    }
  }
})
