const aliasPlugin = [
  [
    require.resolve('babel-plugin-module-resolver'),
    {
      root: ['./src/'],
      alias: {
        api: './src/api',
        assets: './src/assets',
        components: './src/components',
        config: './src/config',
        constants: './src/constants',
        hooks: './src/hooks',
        interface: './src/interface',
        localization: './src/localization',
        navigation: './src/navigation',
        screens: './src/screens',
        theme: './src/theme',
      },
    },
  ],
];

module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  env: {
    development: {
      plugins: [...aliasPlugin, 'react-native-reanimated/plugin'],
    },
    production: {
      plugins: [
        ...aliasPlugin,
        ['babel-plugin-jsx-remove-data-test-id', {attributes: ['testID']}],
        'transform-remove-console',
        'react-native-reanimated/plugin',
      ],
    },
  },
};
