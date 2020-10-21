const path = require('path');
var { name, version, author, license } = require('./package.json');
const { BannerPlugin } = require('webpack');
const banner = `${name} - ${version} | (c) 2020 - ${author} | License: ${license}`;

module.exports = {
  entry: './src/index.ts',
  mode: 'production',

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'awesome-typescript-loader',
        include: /src/,
      },
    ],
  },

  plugins: [new BannerPlugin({ banner })],

  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    fallback: {
      crypto: require.resolve('crypto-browserify'),
      buffer: require.resolve('buffer/'),
      stream: require.resolve('stream-browserify'),
    },
  },

  output: {
    filename: 'oauth-fetch-json.js',
    path: path.resolve(__dirname, 'bundle'),
    libraryTarget: 'umd',
    library: 'OFJson',
    umdNamedDefine: true,
  },
  devtool: 'source-map',
};
