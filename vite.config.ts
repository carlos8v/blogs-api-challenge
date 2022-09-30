import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'prisma',
    environmentOptions: {
      adapter: 'mysql',
      envFile: '.env.test'
    }
  }
})
