/* eslint import/no-extraneous-dependencies: 0 */
import path from 'path';
import webpack from 'webpack';

import env from '../src/config/env';

import serverConfig from './server';
import clientConfig from './client';

const SOURCE_DIR = path.join(process.cwd(), 'src');
const OUTPUT_DIR = path.join(process.cwd(), 'build');
const MODULES_DIR = path.join(process.cwd(), 'node_modules');

const ENV = env.reduce((e, key) => ({
  ...e,
  [key]: JSON.stringify(process.env[key]),
}), {});

const BASE_CONFIG = () => ({
  context: SOURCE_DIR,
  devtool: 'source-map',

  module: {
    loaders: [{
      test: /\.json$/,
      loader: 'json-loader',
    }],
  },

  resolve: {
    extensions: ['.js', '.json', '.jsx', '.scss', '.sass', '.css'],
    modules: [
      SOURCE_DIR,
      MODULES_DIR,
    ],
  },

  output: {
    path: OUTPUT_DIR,
    filename: '[name]-[chunkhash].js',
    sourceMapFilename: '[file].map',
    chunkFilename: '[id]-[chunkhash].js',
  },

  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    new webpack.DefinePlugin({
      'process.env': ENV,
    }),
  ],
});

export default [clientConfig(BASE_CONFIG()), serverConfig(BASE_CONFIG())];
