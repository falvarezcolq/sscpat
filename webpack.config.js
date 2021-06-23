const path = require('path');
module.exports = {
    module:{
        rules:[
            {
                test:/\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader:"babel-loader"
                    
                }
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
              },
              {
                test: /\.(png|svg|jpg|jpeg|gif|eot|ttf|woff|woff2)$/i,
                type: 'asset/resource',
              },
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx','.css']
    },
    entry: './frontend/src/index.js',
    output: {
        path: path.resolve(__dirname,"./frontend/static/frontend/"),
        filename: 'main.js',
    },
}