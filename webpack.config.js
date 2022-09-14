const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'development',
    output: {
        clean: true//elimina el contenido de la carpeta dist y crea todo nuevo
    },
    module: {
        rules: [
            {
                test: /\.html$/i,//busca todos los html en el proyecto
                loader: 'html-loader',
                options: {
                    sources: false
                }
            },
            {
                test: /\.css$/i,//Con la "i" busca por minusculas y mayusculas
                exclude: /styles.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /styles.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"]
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
            }
        ]
    },
    optimization: {
        minimizer: [
            new CssMinimizerPlugin()
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Mi Aplicacion WebPack',
            //filename: 'holaWebpack.html',//Cambia el html de salida en la carpeta dist
            template: './src/index.html'//archivo base que tomara al momento de construirlo en "dist"
        }),
        new MiniCssExtractPlugin({
            //filename:'[name].[fullhash].css',//conserva el mismo nombre "styles,css" con un hash unico
            filename: '[name].css',
            ignoreOrder: false
        }),
        new CopyPlugin({
            patterns: [
                { from: "src/assets/img", to: "assets/img" }
            ],
        })
    ]
}