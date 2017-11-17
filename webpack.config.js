var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: path.resolve(__dirname, 'src/main.js'),
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
    },
    devServer: {
        port: 8000,
        contentBase: './build',
        historyApiFallback: true,
        inline: true,
        hot: true,
        proxy: [{
            context:['/login**','/user/**','/permission/**','/news/**'],
            target: 'http://localhost:8090',
            changeOrigin: true,
            secure: false
        }]
    },
    module: {
        rules: [
            {
                // edit this for additional asset file types
                test: /\.(png|jpg|gif)$/, 
                use: ['url-loader?limit=819200']
            },
            {
                test: /\.(js|jsx)$/,
                // excluding some local linked packages.
                // for normal use cases only node_modules is needed.
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {   
                test: /\.css$/, 
                use: ['style-loader','css-loader?sourceMap' ]
            },
            {   
                test: /\.less$/, 
                use: ['style-loader','css-loader','less-loader']
            },
            { 
                test: /\.(woff|svg|eot|ttf)\??.*$/,
                use: ['url-loader?limit=50000&name=[path][name].[ext]']
            }
        ]
    },
    resolve: {
        extensions: ['.js','.jsx']
    },
    plugins: [
        new webpack.BannerPlugin('coding in youz'),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: 'index.html'
        })
    ]
}

// if (process.env.NODE_ENV !== 'production') {
//     module.exports.plugins = [
//         new webpack.DefinePlugin({
//             'process.env': {
//                 NODE_ENV: JSON.stringify('production')
//             }
//         }),
//         // new webpack.optimize.UglifyJsPlugin({
//         //     compress: {
//         //         warnings: false
//         //     }
//         // }),
//     ]
// } else {
//     module.exports.devtool = '#source-map'
// }