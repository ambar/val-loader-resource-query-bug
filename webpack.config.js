const path = require('path')

/**
 * @type {import('webpack').Configuration}
 */
module.exports = {
  mode: 'development',
  entry: {
    main: './val-entry.js?entry=foo',
  },
  cache: {
    type: 'filesystem',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /val-entry\.js$/,
        use: [{loader: `val-loader`}],
      },
    ],
  },
}
