const cracoPluginStyleResourcesLoader = require('craco-plugin-style-resources-loader');
const path = require('path');

module.exports = {
  plugins: [
    {
      plugin: cracoPluginStyleResourcesLoader,
      options: {
        hoistUseStatements: true,
        patterns: [
          path.join(__dirname, './src/styles/utils/*.scss'),
          path.join(__dirname, './src/styles/abstracts/variables/_colors.scss'),
          path.join(__dirname, './src/styles/abstracts/variables/*.scss'),
          path.join(__dirname, './src/styles/abstracts/mixins/*.scss'),
          path.join(__dirname, './src/styles/abstracts/functions/*.scss'),
          path.join(
            __dirname,
            './src/styles/abstracts/variables/layout/*.scss'
          ),
          path.join(__dirname, './src/styles/abstracts/variables/pages/*.scss'),
          path.join(
            __dirname,
            './src/styles/abstracts/variables/components/*.scss'
          ),
          path.join(__dirname, './src/styles/themes/*.scss')
        ],
        styleType: 'scss'
      }
    }
  ],
  babel: {
    plugins: [['@babel/plugin-proposal-class-properties']]
  }
};
