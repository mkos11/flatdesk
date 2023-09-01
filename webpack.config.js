const Dotenv = require('dotenv-webpack'); // Add this line at the top
const path = require('path');

module.exports = {
  entry: './Uncompressed (Project files)/scripts/app.js',
  mode: 'development',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public')  // Updated to 'public'
  },
  plugins: [ // Add this plugins array
    new Dotenv()
  ]
};
