//-----------------------------------------------------------------------------//
// Import
//-----------------------------------------------------------------------------//

const webpack = require('webpack');

//-----------------------------------------------------------------------------//

module.exports = {
 
  entry: './src/js/index.js',
 
  performance: { 
    hints: false 
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

  plugins: [
    new webpack.AutomaticPrefetchPlugin(),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
  ]

};

//-----------------------------------------------------------------------------//
