var path = require('path');
var webpack = require('webpack');
var isTest = (process.env.NODE_ENV === 'test');

var ModuleLoaders = {
    'babel-loader': {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
            presets: ['es2015']
        }
    },
    'handlebar-loader': {
        test: /\.hbs/,
        loader: 'handlebars-loader'
    }
}

var devModuleLoaders = [
    ModuleLoaders['babel-loader'],
    ModuleLoaders['handlebar-loader']
];

module.exports = {
    environment: process.env.NODE_ENV,
    entry: {
        'vdom': ['./src/index.js']
    },
    output: {
        path: __dirname + '/public',
        filename: '[name].js',
        library: ['VDom']
    },
    module: {
        loaders: devModuleLoaders
    },
    resolve: {
        extensions: ['', '.js'],
        alias: {
            'VDOM': './node_modules/virtual-dom/dist/virtual-dom.js'
        }
    },
    watch: false
};
