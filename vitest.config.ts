import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import { coverageConfigDefaults, defaultExclude, defineConfig } from 'vitest/config'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./testConfig.ts', './jest-setup.ts'],
    exclude: ['**/tests', ...defaultExclude],
    coverage: {
      exclude: [
        '**/src/components/index.ts**',
        '**/src/dictionary/index.ts**',
        '**/src/hooks/index.ts**',
        '**/src/mocks/index.ts**',
        '**/src/services/index.ts**',
        '**/src/utils/index.ts**',
        '**/tests',
        ...coverageConfigDefaults.exclude,
      ],
    },
  },
})
