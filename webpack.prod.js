
const HtmlWebPack = require('html-webpack-plugin');
const { loader } = require('mini-css-extract-plugin');
const MiniCssExtract = require('mini-css-extract-plugin');
const CopyPlugin = require("copy-webpack-plugin");

const CssMinimizer = require('css-minimizer-webpack-plugin');
const Terser = require('terser-webpack-plugin');

module.exports = {
    mode: 'production',

    output: {
        clean: true,
        filename: 'main.[fullhash].js'
    },

    module: {
        rules: [
            {
                test: /\.html$/,    //Barre todos los archivos del proyecto hasta que encuentre uno html
                loader: 'html-loader',
                options : {
                    sources: false
                }
            },
            {
                test: /\.css$/,    //Barre todos los archivos del proyecto hasta que encuentre uno html
                exclude: /styles.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /styles.css$/,    //Barre todos los archivos del proyecto hasta que encuentre uno html
                use: [MiniCssExtract.loader, 'css-loader']
            },
            {
                test: /\.(png|jpe|jpg|jpeg|gif)$/,
                loader: 'file-loader'
            },

            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader",
                  options: {
                    presets: ['@babel/preset-env']
                  }
                }
            }

        ]
    },

    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizer(),
            new Terser(),
        ]
    },

    plugins: [
        new HtmlWebPack({
            title: 'My webpack app',
            filename: 'index.html',
            template: './src/index.html'
        }),
        new MiniCssExtract ({
            filename: '[name].[fullhash].css'
        }),
        new CopyPlugin({
            patterns: [
                {from: 'src/assets/', to: 'assets/'}
            ]
        }) 
    ]

}
