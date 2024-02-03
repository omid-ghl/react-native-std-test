const presets = ['module:metro-react-native-babel-preset'];
const plugins = [];

plugins.push(
  [
    'module-resolver',
    {
      alias: {
        src: './src',
        '@Assets': './src/Assets',
        '@Commons': './src/Commons',
        '@Services': './src/Services',
        '@Containers': './src/Containers',
        '@Models': './src/Models',
        '@Navigators': './src/Navigators',
        '@Theme': './src/Theme',
        '@Translations': './src/Translations',
        '@Store': './src/Store',
        '@constants': './src/constants',
        '@Hooks': './src/Hooks',
      },
    },
  ],
  '@babel/plugin-proposal-export-namespace-from',
  'react-native-reanimated/plugin',
);

module.exports = {
  presets,
  plugins,
};
