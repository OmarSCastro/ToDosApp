const HtmlWebPack = require('html-webpack-plugin');
const { loader } = require('mini-css-extract-plugin');
const MiniCssExtract = require('mini-css-extract-plugin');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: 'development',

    output: {
        clean: true
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
            }
        ]
    },

    optimization: {},

    plugins: [
        new HtmlWebPack({
            title: 'My webpack app',
            filename: 'index.html',
            template: './src/index.html'
        }),
        new MiniCssExtract ({
            filename: 'nuevo-estilo.css'
        }),
        new CopyPlugin({
            patterns: [
                {from: 'src/assets/', to: 'assets/'}
            ]
        }) 
    ]

}
