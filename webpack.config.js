const path = require("path");

module.exports = {
    entry: './scripts/main.ts',
    mode: 'development',
    experiments: {
        topLevelAwait: true
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'main.bundle.js'
    }
};