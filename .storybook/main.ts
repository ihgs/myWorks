import { fileURLToPath } from 'node:url'
import type { StorybookConfig } from '@storybook/nextjs-vite'
import path, { dirname } from 'path'
import { mergeConfig } from 'vite'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],

  addons: [
    '@storybook/addon-links',
    '@storybook/addon-onboarding',
    '@storybook/addon-themes',
    '@storybook/addon-coverage',
    '@storybook/addon-docs',
    '@storybook/addon-vitest'
  ],

  framework: {
    name: '@storybook/nextjs-vite',
    options: {},
  },

  viteFinal: async (baseConfig) => {
    return mergeConfig(baseConfig, {
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '../src'),
        },
      },
    })
  },
}
export default config
