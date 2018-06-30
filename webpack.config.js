const path = require('path');

module.exports = {
    mode: 'development',
    entry: './static/js/app.js',
    output: {
        path: path.resolve(__dirname, 'static/dist'),
        filename: 'app.js'
    }
};
