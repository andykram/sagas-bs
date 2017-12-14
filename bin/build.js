/* eslint import/no-extraneous-dependencies: 0, no-console: 0, consistent-return: 0 */
require('babel-polyfill');
require('babel-register');

const args = require('yargs').argv;

const webpack = require('webpack');
const webpackConfig = require('../webpack/config').default;

function logResult(err, stats, exit) {
  if (err) {
    console.error(err);

    if (exit) {
      return process.exit(1);
    }

    return;
  }

  console.log(stats.toString({
    colors: true,
    chunks: false,
  }));

  const jsonStats = stats.toJson();

  if (jsonStats.errors.length > 0) {
    console.error(jsonStats.errors);

    if (exit) {
      return process.exit(1);
    }

    return;
  }

  if (jsonStats.warnings.length > 0) {
    console.warn(jsonStats.warnings);

    if (exit) {
      return process.exit(1);
    }
  }
}

const compiler = webpack(webpackConfig);

if (args.watch) {
  compiler.watch({}, (err, stats) => {
    logResult(err, stats);
  });
} else {
  compiler.run((err, stats) => {
    logResult(err, stats, true);
    process.exit(0);
  });
}
