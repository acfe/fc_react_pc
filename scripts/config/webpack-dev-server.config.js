// webpack
const webpack = require('webpack');
// plugins
const ExtractTextPlugin = require("extract-text-webpack-plugin");
// path
const path = require('path');
const buildPath = path.resolve(__dirname, '../../output');
// config
const config = require('./config').config;
const envPath = require('./env.config').envPath;
const entry = config.entry;
const port = config.port;
const proxy = config.proxy;
const getIp = require('../lib/get_ip').getIp;

module.exports = {
    context: path.resolve(__dirname, '../../src'),
    entry,
    output: {
        path: buildPath,
        filename: "js/[name].js",
		chunkFilename: "js/[name].js",
        publicPath: envPath.publicPath || "/"
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    //test: /[\\/]node_modules[\\/]/,
                    test: /[\\/]node_modules[\\/](react)|(babel)|(redux)/,
                    name: "vendor",
                    priority: -20,
                    chunks: "all"
                }
            }
        }
    },
    devServer: {
        contentBase: path.resolve(__dirname, '../templates/www'),
        hot: true,
        inline: true,
        port,
        host: getIp() || '127.0.0.1',
        proxy
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: "babel-loader"
            },
            {
                test:/\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg|jpg|gif)$/,
                loader: "file-loader",
                query: {name: "images/[name].[hash].[ext]"}
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract("style-loader", "css-loader")
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract("css-loader!less-loader")
            }
        ]
    },
    resolve: {
        alias: {
            'src': path.resolve(__dirname, '../../src'),
            'fcbox': path.resolve(__dirname, '../../fcbox')
        }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin("css/[name].css")
    ]
};