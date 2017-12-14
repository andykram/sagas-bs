/* eslint import/no-extraneous-dependencies: 0 */
const postcssImport = require('postcss-smart-import');
const precss = require('precss');
const autoprefixer = require('autoprefixer');
const flexbugs = require('postcss-flexbugs-fixes');
const lost = require('lost');

module.exports = {
  plugins: [
    postcssImport({ }),
    precss({ }),
    flexbugs,
    autoprefixer({
      browsers: [
        'last 2 versions',
        '> 1%',
      ],
    }),
    lost(),
  ],
};
