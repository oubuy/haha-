var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');
var CleanPlugin  =  require('clean-webpack-plugin');
module.exports = {
    entry: {
        vendor: ['babel-polyfill', 'react', 'react-dom'],
    },
    output: {
        path: path.join(__dirname, 'build/static/dll'),
        filename: '[name].[hash:5].dll.js',
        library: '[name]_library'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json'], // 现在你require文件的时候可以直接使用require('file')，不用使用require('file.jsx')
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"'
        }),
        new webpack.DllPlugin({
            context: __dirname,
            path: path.join(__dirname, 'build/static/dll/[name]-manifest.json'),
            name: '[name]_library'
        }),
        new AssetsPlugin({
            filename: 'build/bundle-config.json',
            path:  path.resolve(__dirname)
        }),
        new webpack.optimize.UglifyJsPlugin({
            output: {
                comments: false,
            },
            compress: {
                warnings: false
            }
        }),
        new CleanPlugin(['dll'], {
            root: path.join(__dirname, "build/static"),
            verbose: true,
            dry: false
        }),
    ]
};