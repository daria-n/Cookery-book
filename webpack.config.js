const path = require('path');

module.exports = {
    mode: 'development',
    entry: './static/js/app.ts',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    output: {
        path: path.resolve(__dirname, 'static/dist'),
        filename: 'app.js'
    }
};
