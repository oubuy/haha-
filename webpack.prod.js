var path = require('path'),
    webpack = require('webpack'),
    config = require('./config'),
    srcDir = path.resolve(process.cwd(), 'client'),
    imagePath = path.resolve(srcDir, 'img'),
    cssPath = path.resolve(srcDir, 'css'),
    jsPath = path.resolve(srcDir, 'js'),
    viewsPath = path.resolve(srcDir, 'views'),
    nodeModulesPath = path.resolve(__dirname, 'node_modules'),
    autoprefixer = require('autoprefixer'),
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    publicPath = config.domain + '/',
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    CopyWebpackPlugin = require('copy-webpack-plugin'),
    bundleConfig = require("./build/bundle-config.json"),
    CleanPlugin = require('clean-webpack-plugin');

let webpackConfig = {
    cache: true,
    target: "web",
    entry: {
        index: [path.join(__dirname, "client/views/index.jsx")]
    },
    output: {
        publicPath: '/',
        path: path.join(__dirname, "build/static/"), //文件输出目录
        filename: "core/[name].[hash:5].js", //根据入口文件输出的对应多个文件名
        chunkFilename: "core/[name].[chunkhash:5].js"
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json'], // 现在你require文件的时候可以直接使用require('file')，不用使用require('file.jsx')
        alias: { //配置别名，在项目中可缩减引用路径
            'img': path.join(srcDir, 'img'),
            'css': path.join(srcDir, 'css'),
            'js': path.join(srcDir, 'js'),
            'views': path.join(srcDir, 'views')
        },
    },
    module: {
        rules: [{
                test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|gif|mp4|webm|webp)(\?\S*)?$/,
                loader: 'url-loader?limit=100&name=img/[name].[ext]',
            },
            {
                test: /\.(scss|sass|css)$/,
                use: ["style-loader", {
                        loader: "css-loader",
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                require('cssnano')({
                                    preset: 'default'
                                }),
                                require('autoprefixer')({
                                    browsers: ['> 1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9'],
                                    flexbox: 'no-2009'
                                })
                            ]
                        }
                    }, {
                        loader: "sass-loader",
                        options: {
                            imagePath: imagePath,
                            includePaths: [cssPath]
                        }
                    }
                ],
            },
            {
                test: /\.(js|jsx)$/,
                exclude: [nodeModulesPath],
                include: [srcDir],
                loader: "babel-loader"
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"'
        }),
        new webpack.DllReferencePlugin({ // 加快webpack打包速度
            context: __dirname,
            manifest: require('./build/static/dll/vendor-manifest.json')
        }),
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, './client/js/lib'),
            to: path.resolve(__dirname, './build/static/lib')
        }]),
        // new ExtractTextPlugin('css/[name].[contenthash:5].css'),
        new webpack.optimize.UglifyJsPlugin({
            output: {
                comments: false,
            },
            compress: {
                warnings: false
            }
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'client/html/index.html'),
            filename: path.resolve(__dirname, './build/html/index.html'),
            bundleName: '/dll/' + bundleConfig.vendor.js,
            inject: true
        }),
    ]
};

if (process.env.clean) {
    webpackConfig.plugins.push(new CleanPlugin(['core'], {
        root: path.join(__dirname, "build/static"),
        verbose: true,
        dry: false
    }));
    webpackConfig.plugins.push(new CleanPlugin(['img'], {
        root: path.join(__dirname, "build/static"),
        verbose: true,
        dry: false
    }));
}

module.exports = webpackConfig;