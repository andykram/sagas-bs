import path from 'path';
import webpack from 'webpack';
import externals from 'webpack-node-externals';
import CleanDirPlugin from 'clean-webpack-plugin';

const TARGET = 'server';
const ENTRY = path.join(process.cwd(), 'src', `${TARGET}.js`);

const BANNER = 'require("source-map-support").install();require("regenerator-runtime/runtime");';

const BABEL_OPTIONS = {
  babelrc: false,

  presets: [
    ['env', {
      targets: {
        node: 'current',
      },
    }],
    'react',
    'babili',
  ],

  plugins: [
    'transform-object-rest-spread',
    // 'transform-export-extensions',
    'transform-class-properties',
    'transform-react-constant-elements',
    'transform-react-inline-elements',
  ],
};

export default (baseConfig) => {
  const outputPath = path.join(baseConfig.output.path, TARGET);
  const config = { ...baseConfig };

  config.target = 'node';
  config.entry = { [TARGET]: [ENTRY] };
  config.externals = [externals()];

  // server uses the .babelrc, so no need to set options here
  config.module = {
    loaders: [
      ...baseConfig.module.loaders,
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: BABEL_OPTIONS,
      },
      {
        test: /\.s[ac]?ss$/,
        loader: 'ignore-loader',
      },
    ],
  };

  config.node = {
    global: false,
    process: false,
    Buffer: false,
    crypto: false,
    module: false,
    clearImmediate: false,
    setImmediate: false,
    clearTimeout: false,
    setTimeout: false,
    os: false,
    _filename: true,
    __dirname: true,
  };

  config.plugins = [
    ...baseConfig.plugins,
    new webpack.BannerPlugin({
      raw: true,
      entryOnly: false,
      banner: BANNER,
    }),

    new CleanDirPlugin([outputPath], {
      root: process.cwd(),
    }),
  ];

  config.output = {
    ...baseConfig.output,
    filename: '[name].js',
    path: outputPath,
    libraryTarget: 'commonjs',
  };

  return config;
};
