const Dotenv = require('dotenv-webpack');  // Add this line at the top
const path = require('path');


module.exports = {
  entry: 'W:/flatdesk/Uncompressed (Project files)/scripts/app.js',
  mode: 'development',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [  // Add this plugins array
    new Dotenv()
  ]
};
