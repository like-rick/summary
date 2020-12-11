const path = require('path');
// console.log(path.resolve(__dirname, 'loaders.js'))
module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, 'index.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js'
    },
    module: {
        rules: [
            {
                test: /\.txt$/,
                loaders: path.resolve(__dirname, 'loaders.js'),
            }
        ]
    }
}