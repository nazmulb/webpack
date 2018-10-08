module.exports = {
    mode: 'production',
    entry: './src/app.js',
    output: {
        path: __dirname + '/bin',
        publicPath: "/bin/",
        filename: 'app.bundle.js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            options: {
                presets: ['env']
            }
        }]
    }
}