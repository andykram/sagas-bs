import path from 'path';
import webpack from 'webpack';
import AssetsPlugin from 'assets-webpack-plugin';
import CleanDirPlugin from 'clean-webpack-plugin';
import CopyDirPlugin from 'copy-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import LiveReloadPlugin from 'webpack-livereload-plugin';

const ASSETS_DIR = path.join(process.cwd(), 'static');
const ASSETS_OUTPUT_DIR = path.join(process.cwd(), 'build', 'static');

const TARGET = 'client';
const ENTRY = path.join(process.cwd(), 'src', `${TARGET}.js`);

const NODE_ENV = process.env.NODE_ENV || 'production';

const BABEL_OPTIONS = {
  babelrc: false,

  presets: [
    ['env', {
      targets: {
        browsers: ['last 2 versions', 'safari >= 7'],
      },
    }],
    'stage-2',
    'react',
    'babili',
  ],
  plugins: [
    'transform-export-extensions',
    'transform-class-properties',

    /* some react helpers */
    'transform-react-constant-elements',
    'transform-react-inline-elements',
  ],
};

const extractSass = new ExtractTextPlugin({
  filename: '[name].[contenthash].css',
});

export default (baseConfig) => {
  const outputPath = path.join(baseConfig.output.path, TARGET);

  const config = { ...baseConfig };

  config.entry = { [TARGET]: [ENTRY] };
  config.module = {
    loaders: [
      ...baseConfig.module.loaders,
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: BABEL_OPTIONS,
      }, {
        test: /\.s[ac]ss$/,
        use: extractSass.extract({
          use: [{
            loader: 'css-loader',
          }, {
            loader: 'postcss-loader',
            options: {
              config: {
                // load from root, not src
                path: './postcss.config.js',
              },
            },
          }, {
            loader: 'sass-loader',
          }],
          fallback: 'style-loader',
        }),
      },
    ],
  };

  config.plugins = [
    ...baseConfig.plugins,
    new webpack.DefinePlugin({
      'process.env': {
        NODE_TARGET: JSON.stringify(process.env.NODE_TARGET || 'production'),
        TARGET: JSON.stringify(process.env.TARGET || 'client'),
        NODE_ENV: JSON.stringify(NODE_ENV),
      },
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      Popper: 'popper.js',
      bs: 'bootstrap',
    }),
    new CleanDirPlugin([outputPath, ASSETS_OUTPUT_DIR], {
      root: process.cwd(),
    }),
    new CopyDirPlugin([{
      from: ASSETS_DIR,
      to: ASSETS_OUTPUT_DIR,
    }]),
    extractSass,
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
      filename: 'vendor.bundle.js',
    }),
    new AssetsPlugin({
      path: outputPath,
    }),
  ].concat(NODE_ENV !== 'production' ? [
    new LiveReloadPlugin({
    }),
  ] : [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      output: {
        comments: false,
      },
      sourceMap: true,
    }),
  ]);

  config.output = {
    ...baseConfig.output,
    path: outputPath,
  };

  return config;
};
