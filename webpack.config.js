//-----------------------------------------------------------------------------//
// Import
//-----------------------------------------------------------------------------//

const webpack = require('webpack')

//-----------------------------------------------------------------------------//

module.exports = {
  entry: './src/js/index.js',
  performance: { 
    hints: 'warning' 
  },
  output: {
    filename: 'bundle.js'
  },

  // Resolve directories to look at when importing modules.

  resolve: {
    modules: [
      'node_modules', 
      './src/js'
    ]
  },

  // Configure webpack modules to be able to read pug, babel, css etc,
  // By providing the proper module loader.

  module: {
    rules: [
      {
        // When encountering .css files, use css-loader to interpret the file,
        // and style-loader to place the css into the <style> tag.

        test: /.css?$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" }
        ]
      },
      {
        test: /.pug?$/,
        loader: 'pug-loader',
      },
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['@babel/react']
        }
      }
    ]
  },

  // Moment.js file is is huge. We want to ignore some parts of it
  // that aren't in use.
  // TODO: no sure if this regex even works.

  plugins: [
    new webpack.IgnorePlugin(/moment\/locale\//, /moment$/)
  ]

};

//-----------------------------------------------------------------------------//
