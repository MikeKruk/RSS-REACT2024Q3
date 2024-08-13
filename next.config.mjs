/// <reference types="vitest" />
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: 'src/tests/setup.ts',
    coverage: {
      all: true,
      provider: 'v8',
      reporter: ['text', 'html'],
      reportsDirectory: 'src/tests/coverage',
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['node_modules', 'src/types/**/*', 'src/constants/**/*'],
    },
  },
};

export default nextConfig;
