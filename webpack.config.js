const path = require('path');
module.exports = {
    module:{
        rules:[
            {
                test:/\.js$/,
                exclude: /node_modules/,
                use: {
                    loader:"babel-loader"
                }
            }
        ]
    },
    entry: './frontend/src/index.js',
    output: {
        path: path.resolve(__dirname,"./frontend/static/frontend/"),
        filename: 'main.js',
    },
}