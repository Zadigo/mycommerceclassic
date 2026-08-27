import { defineConfig } from 'vitest/config'
import { defineVitestProject } from '@nuxt/test-utils/config'

export default defineConfig({
  test: {
    dir: './test',
    fileParallelism: false,
    exclude: [
      'node_modules',
      '.nuxt', 
      'dist', 
      'test/e2e'
    ],
    coverage: {
      enabled: true,
      provider: 'v8',
      reporter: [ 'text', 'json', 'html' ],
      exclude: [
        'test/__fixtures__'
      ]
    },
    env: {
      NODE_ENV: 'test'
    },
    setupFiles: [
      './test/setup.ts'
    ],
    projects: [
      await defineVitestProject({
        test: {
          name: 'nuxt',
          include: ['test/nuxt/**/*.{test,spec}.ts'],
          environment: 'nuxt',
          testTimeout: 20000,
          tags: [
            {
              name: 'nuxt',
            }
          ]
        }
      }),
      await defineVitestProject({
        test: {
          name: 'integration',
          include: ['test/integration/**/*.{test,spec}.ts'],
          environment: 'node',
          testTimeout: 20000,
          tags: [
            {
              name: 'integration',
            }
          ]
        }
      })
    ]
  },
  resolve: {}
})
