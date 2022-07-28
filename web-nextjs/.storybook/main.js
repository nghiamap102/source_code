const path = require('path')

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@chakra-ui/storybook-addon',
    'storybook-react-intl',
    'storybook-css-modules-preset'
  ],
  staticDirs: ['../public'],
  core: {
    builder: 'webpack5'
  },
  webpackFinal: async (config) => {
    config.resolve.alias['src'] = path.resolve(__dirname, '../src/')
    return config
  },
  framework: '@storybook/react'
}
