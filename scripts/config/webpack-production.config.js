// webpack
const webpack = require('webpack');
// plugins
const ManifestPlugin = require('webpack-manifest-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const TransferWebpackPlugin = require('transfer-webpack-plugin');
// config
const config = require('./config').config;
const envPath = require('./env.config').envPath;
// path
const path = require('path');
const buildPath = path.resolve(__dirname, '../../output/' + envPath.outputPath);

module.exports = {
    entry: config.entry,
	//devtool: 'source-map'
    output: {
        path: buildPath,
        publicPath: envPath.publicPath || "/",
        filename: "js/[name].js",
		chunkFilename: "js/[name].js"
	    //sourceMapFilename: "[name].js.map"
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
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new webpack.NoEmitOnErrorsPlugin(),
        new TransferWebpackPlugin([
            {
                from: 'www'
            }
        ], path.resolve(__dirname, '../templates')),
        // manifest
        new ManifestPlugin({
            fileName: 'manifest.json'
        }),
        new ExtractTextPlugin("css/[name].css")
    ],
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
                query: {name: "images/[name].[ext]"}
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
    }
};