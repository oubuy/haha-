var path = require('path'),
    webpack = require('webpack'),
    fs = require('fs'),
    config = require('./config'),
    srcDir = path.join(process.cwd(), 'client'), // process.cwd()：返回运行当前脚本的工作目录的路径
    imagePath = path.join(srcDir, 'img'),
    cssPath = path.join(srcDir, 'css'),
    jsPath = path.join(srcDir, 'js'),
    viewsPath = path.join(srcDir, 'views'),
    nodeModulesPath = path.join(__dirname, 'node_modules'),
    CopyWebpackPlugin = require('copy-webpack-plugin'),
    publicPath = config.domain + '/',
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    bundleConfig = require("./build/bundle-config.json"),
    autoprefixer = require('autoprefixer');
module.exports = {
    cache: true,
    entry: {
        index: [
            'babel-polyfill',
            path.join(__dirname, "client/views/index.jsx")
        ],
    },
    output: {
        publicPath: '/',
        path: path.join(__dirname, "build/static/"), //文件输出目录
        filename: "core/[name].js", //根据入口文件输出的对应多个文件名
        chunkFilename: "core/[name].js"
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
        alias: { //配置别名，在项目中可缩减引用路径
            'img': path.join(srcDir, 'img'),
            'css': path.join(srcDir, 'css'),
            'js': path.join(srcDir, 'js'),
            'views': path.join(srcDir, 'views')
        }
    },
    module: {
        rules: [{
                test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|gif|mp4|webm|webp)(\?\S*)?$/,
                loader: 'url-loader?limit=8192&name=img/[name].[ext]',
            },
            {
                test: /\.(scss|sass|css)$/,
                use: ["style-loader", {
                        loader: "css-loader",
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
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
                            sourceMap: true,
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
        new webpack.NamedModulesPlugin(),
        new webpack.DllReferencePlugin({ // 加快webpack打包速度
            context: __dirname,
            manifest: require('./build/static/dll/vendor-manifest.json')
        }),
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, './client/js/lib'),
            to: path.resolve(__dirname, './build/static/lib')
        }]),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'client/html/index.html'),
            filename: path.join(__dirname, 'build/html/index.html'),
            bundleName: '/dll/' + bundleConfig.vendor.js,
            inject: true
        })
    ]
};