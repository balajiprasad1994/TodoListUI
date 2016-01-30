var path = require('path');
var webpack = require('webpack');
var ResolverPlugin = require("webpack/lib/ResolverPlugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var config = {
    cache: true,
    debug: true,
    devtool: 'source-map',
    'output-pathinfo': true,
    context: __dirname,
    entry: ['./app/app.js'],
    output: {
        path: __dirname + '/todoapp',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {test: /\.scss$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader?sourceMap!sass-loader?outputStyle=expanded&sourceMap=true&sourceMapContents=true")},
            {test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader")},
            {test: /\.(png|svg|jpe?g|gif)([\?#].*)?$/, loader: "url?limit=1000&name=[path][name].[ext]" },
            {test: /\.(ttf|otf|woff|woff2|eot)([\?#].*)?$/, loader: "file?name=[path][name].[ext]" },
            {test: /\.html$/, loader: "file-loader"}
        ]
    },
    // Let webpack know where the module folders are for bower and node_modules
    resolve: {
        modulesDirectories: ['node_modules', 'bower_components'],
        alias: {
            npm     : __dirname + '/node_modules',
            vendor  : __dirname + '/app/vendor',
            bower   : __dirname + '/app/bower_components'
            //views   : __dirname + '/app/event-flow',
            //styles  : __dirname + '/app/styles',
            //modules : __dirname + '/app/styles/modules'
            //lib     : __dirname + '/app/lib'
        }
    },
    plugins: [
        new ExtractTextPlugin("app.css", {
            allChunks: true
        }),
        // This ensures that in EVERY module, _ will be available as lodash, automagically
        new webpack.ProvidePlugin({
            "_": "lodash"
        }),
        // This is to help webpack know that it has to load the js file in bower.json#main
        new ResolverPlugin(
            new ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"])
        )
    ]
};

module.exports = config;
