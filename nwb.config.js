const path = require('path');
const DotenvPlugin = require('webpack-dotenv-plugin');

var isDev = process.env.NODE_ENV === 'development';
var isTest = process.env.NODE_ENV === 'test';
var isProd = process.env.NODE_ENV === 'production';

module.exports = {
  type: 'react-app',
  babel: {
    stage: 1
  },
  webpack: {
    extra: {
      plugins: [
        new DotenvPlugin({
          sample: './.env',
          path: './.env'
        })
      ]
    },
    aliases: {
      containers: path.resolve('src/containers'),
      components: path.resolve('src/components'),
      utils: path.resolve('src/utils'),
      modules: path.resolve('src/modules'),
      routes: path.resolve('src/routes'),
      constants: path.resolve('src/constants'),
    },
    define: {
      CONFIG: JSON.stringify(process.env),
      NODE_ENV: process.env.NODE_ENV,
      '__DEV__': isDev,
      '__PROD__': isProd,
      '__TEST__': isTest,
      '__BASENAME__': JSON.stringify(process.env.BASENAME || '')
    },
    rules: {
      'sass-css': {
        modules: true,
        localIdentName: (isDev ? '[path][name]__[local]__' : '') + '[hash:base64:5]'
      },
    }
  }
}
