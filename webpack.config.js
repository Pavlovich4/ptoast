import path from 'path';

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
    entry: './src/Index.ts',
    mode: 'production',
    devtool: 'source-map',
    devServer: {
        static: './',
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    output: {
        filename: 'ptoast.js',
        path: path.resolve(__dirname, 'dist'), // Output directory
        libraryTarget: 'umd', // Export as UMD module
    },
};
