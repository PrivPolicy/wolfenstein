const path = require("path");
// const WebpackObfuscator = require("webpack-obfuscator");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        main: "./src/index.ts",
        "editor/editor": "./src/editor/app.ts"
    },
    output: {
        path: path.resolve(__dirname, './build'),
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.s[ac]ss$/i,
                use: ["style-loader", "css-loader", "sass-loader",],
            },
            {
                test: /\.(frag|vert)$/i,
                use: 'file-loader'
            },
            {
                test: /\.(png|jpe?g)$/i,
                use: 'file-loader'
            },
            {
                test: /\.(wav|mp3)$/i,
                use: 'file-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "./src/index.html",
            chunks: ["main"]
        }),
        new HtmlWebpackPlugin({
            filename: "editor/index.html",
            template: "./src/editor/index.html",
            chunks: ["editor/editor"]
        })
    ],
    resolve: {
        extensions: ['.ts', ".js"]
    },
    watch: true
};