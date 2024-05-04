import { defineConfig, defaultExclude, coverageConfigDefaults } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./testConfig.ts', './jest-setup.ts'],
    coverage: {
      exclude: [
        '**/src/components/index.ts**',
        '**/src/dictionary/index.ts**',
        '**/src/hooks/index.ts**',
        '**/src/mocks/index.ts**',
        '**/src/services/index.ts**',
        '**/src/utils/index.ts**',
        ...coverageConfigDefaults.exclude,
      ],
    },
  },
})
