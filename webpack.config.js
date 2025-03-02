const path = require('path');
const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FixStyleOnlyEntriesPlugin = require('webpack-fix-style-only-entries');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// Get all blocks
const blocks = [
    'container',
    'row',
    'column',
    'card',
    'button',
    'alert',
    'tabs',
    'accordion',
];

// Create block entry points
const blockEntryPoints = {};

blocks.forEach((blockName) => {
    blockEntryPoints[`blocks/${blockName}/index`] = `./src/blocks/${blockName}/index.js`;
    blockEntryPoints[`blocks/${blockName}/editor`] = `./src/blocks/${blockName}/editor.scss`;
    blockEntryPoints[`blocks/${blockName}/style`] = `./src/blocks/${blockName}/style.scss`;
});

// Main entry points
const entryPoints = {
    'js/editor': './src/js/editor.js',
    'js/frontend': './src/js/frontend.js',
    'css/editor': './src/scss/editor.scss',
    'css/frontend': './src/scss/frontend.scss',
    'css/admin': './src/scss/admin.scss',
    'js/admin': './src/js/admin.js',
    'blocks/common/components': './src/components/index.js',
    'blocks/common/editor': './src/scss/blocks-editor.scss',
    ...blockEntryPoints,
};

// Webpack config
module.exports = {
    ...defaultConfig,
    entry: entryPoints,
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
    },
    module: {
        ...defaultConfig.module,
        rules: [
            ...defaultConfig.module.rules,
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    require('autoprefixer'),
                                ],
                            },
                        },
                    },
                    'sass-loader',
                ],
            },
        ],
    },
    plugins: [
        ...defaultConfig.plugins,
        new CleanWebpackPlugin({
            cleanStaleWebpackAssets: false,
        }),
        new FixStyleOnlyEntriesPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].css',
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: './node_modules/bootstrap/dist/css/bootstrap.min.css',
                    to: 'css/bootstrap.min.css',
                },
                {
                    from: './node_modules/bootstrap/dist/js/bootstrap.bundle.min.js',
                    to: 'js/bootstrap.bundle.min.js',
                },
                {
                    from: './src/images',
                    to: 'images',
                },
                {
                    from: './src/fonts',
                    to: 'fonts',
                },
            ],
        }),
    ],
    optimization: {
        ...defaultConfig.optimization,
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'js/vendors',
                    chunks: 'all',
                },
            },
        },
    },
};